import { Router as expRouter } from "express";
import {
  getOrderItems,
  deleteOrderItems,
  updateAccount,
  createCollection,
} from "../controllers";
import { isAuthenticated, uploader } from "../middlewares";

const router = expRouter();

router.get("/login", isAuthenticated, getOrderItems);

router.patch("/verify", isAuthenticated, updateAccount);

router.delete("/recoverAccount", isAuthenticated, deleteOrderItems);
router.delete("/recoverAccount", uploader, createCollection);

export default router;
