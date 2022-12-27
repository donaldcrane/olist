import { Router as expRouter } from "express";
import {
  getOrderItems,
  deleteOrderItems,
  updateAccount,
  createCollection,
} from "../controllers";
import { isAuthenticated, uploader } from "../middlewares";

const router = expRouter();

router.get("/order_items", isAuthenticated, getOrderItems);

router.patch("/account", isAuthenticated, updateAccount);

router.delete("/orders/:id", isAuthenticated, deleteOrderItems);
router.post("/collection", uploader, createCollection);

export default router;
