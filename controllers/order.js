import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/order.js";
import Transaction from "../models/transaction.js";

const createTransaction = async (req, res) => {
  const { amount, userId } = req.body;
  const razorpay = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_SECRET,
  });

  const options = {
    amount: amount,
    currency: "INR",
    receipt: `
    receipt#${Date.now()}
    `,
  };
  try {
    if (!amount || !userId) {
      return res.status(400).json({ message: "Amount and ID required." });
    }
    const razorpayOrders = await razorpay.orders.create(options);
    res.status(200).json({
      success: true,
      key: process.env.RAZOR_PAY_KEY_ID,
      message: "Order Created SuccessFully",
      amount: razorpayOrders.amount,
      currency: razorpayOrders.currency,
      order_id: razorpayOrders.id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating transaction",
      error: error.message,
    });
  }
};
const createOrder = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId,
    cartItems,
    deliveryDate,
    address,
  } = req.body;

  const key_secret = process.env.RAZOR_PAY_SECRET;
  const generate_signature = crypto
    .createHmac("sha256", key_secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generate_signature === razorpay_signature) {
    try {
      const transaction = await Transaction.create({
        user: userId,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        status: "Success",
        amount: cartItems.reduce(
          (total, item) => total + item?.quantity * item.price,
          0
        ),
      });
      const order = await Order.create({
        user: userId,
        deliveryDate,
        address,
        items: cartItems?.map((item) => ({
          product: item?._id,
          quantity: item?.quantity,
        })),
        status: "Order Placed",
      });
      transaction.order = order._id;
      await transaction.save();
      res.json({
        message: "Payment Verified And Order Created Successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error processing payment", error: error.message });
    }
  }
};

const getOrderByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ user: userId })
      .populate("items.product", "name price image_uri ar_uri")
      .populate("user", "name email")
      .sort({
        createdAt: -1,
      });
    if (!orders) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.status(200).json({
      orders,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching order by Id", error: error.message });
  }
};

export { createTransaction, createOrder, getOrderByUserId };
