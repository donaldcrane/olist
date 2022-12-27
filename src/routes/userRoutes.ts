import { Router as expRouter } from "express";
import {
  saveCustomer,
  saveSeller,
  loginUser,
  recoverAccount,
  resendToken,
  resetPassword,
  verifyAccount,
  createLocation,
  createFile,
} from "../controllers";
import { isAuthenticated, uploader } from "../middlewares";

const router = expRouter();

router.post("/login", loginUser);
router.post("/resend", resendToken);
router.post("/customer/register", saveCustomer);
router.post("/seller/register", saveSeller);

router.patch("/verify", verifyAccount);

router.patch("/recoverAccount", recoverAccount);
router.patch("/resetPassword", resetPassword);
router.patch("/location", [isAuthenticated], createLocation);
router.patch("/upload", uploader, [isAuthenticated], createFile);

export default router;
