import { Router as expRouter } from "express";
import userRoutes from "./userRoutes";
const router = expRouter();

router.use("/", userRoutes);
export default router;
