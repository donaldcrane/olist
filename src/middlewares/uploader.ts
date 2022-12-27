import {
  invalidUploadServer,
  MiddleWare,
  middlewareErrorLabel,
  unknownServerError,
} from "../utils";
import multer from "multer";
import { v2 } from "cloudinary";
import config from "../config";

v2.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET,
});

export const uploader: MiddleWare = (req, res, next) => {
  try {
    let multerUploader: multer.Multer | null = null;
    multerUploader = multer({
      storage: multer.memoryStorage(),
    });

    if (multerUploader) return multerUploader.single("file")(req, res, next);
    else return res.status(400).send({ message: invalidUploadServer });
  } catch (e) {
    console.error(middlewareErrorLabel, e);
    console.log(e);
    return res.status(500).send({ message: unknownServerError });
  }
};
