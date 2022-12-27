import { Router as expRouter } from "express";
import userRoutes from "./userRoutes";
import customerRoutes from "./customer";
import sellerRoutes from "./seller";
import googleRoutes from "./googleRoutes";
const router = expRouter();

router.use("/users", userRoutes);
router.use("/customers", customerRoutes);
router.use("/sellers", sellerRoutes);
router.use("/google", googleRoutes);
export default router;
