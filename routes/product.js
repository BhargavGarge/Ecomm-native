//routes for prodcut

import express from "express";
import { getProductsByCategoryId } from "../controllers/product";

const router = express.Router();
router.get("/:categoryId", getProductsByCategoryId);
