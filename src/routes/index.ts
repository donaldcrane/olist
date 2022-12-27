import { Router as expRouter } from "express";
import userRoutes from "./userRoutes";
const router = expRouter();

router.use("/users", userRoutes);
export default router;
