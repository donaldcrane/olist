import { Router as couRouter } from "express";
import { isAuthenticated, isCustomer } from "../../middlewares";

const router = couRouter();
import CustomerRoute from "./customer";

router.use("/", [isAuthenticated, isCustomer], CustomerRoute);

export default router;
