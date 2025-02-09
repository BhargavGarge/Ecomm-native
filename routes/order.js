import express from "express";
import {
  createOrder,
  createTransaction,
  getOrderByUserId,
} from "../controllers/order.js";

const router = express.Router();
router.post("/transaction", createTransaction);
router.post("/:userId", getOrderByUserId);
router.post("/", createOrder);
export default router;
