import { Router as expRouter } from "express";
import {
  createDocument,
  getAllSellers,
  updateSellersProfile,
  updateSellersProfileImage,
} from "../../controllers";
import { uploader } from "../../middlewares";

const router = expRouter();

router.get("/", getAllSellers);
router.post("/document", createDocument);

router.patch("/profile", updateSellersProfile);

router.patch("/photo", uploader, updateSellersProfileImage);
export default router;
