import { Router as expRouter } from "express";
import {
  updateProfileImage,
  updateProfile,
  getAllCustomers,
} from "../../controllers";
import { uploader } from "../../middlewares";

const router = expRouter();

router.get("/", getAllCustomers);

router.patch("/profile", updateProfile);

router.patch("/photo", uploader, updateProfileImage);

export default router;
