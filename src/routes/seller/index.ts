import { Router as couRouter } from "express";

import { isAuthenticated, isSeller } from "../../middlewares";

const router = couRouter();
import SellerRoute from "./seller";

router.use("/", [isAuthenticated, isSeller], SellerRoute);

export default router;
