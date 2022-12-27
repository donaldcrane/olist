import {
  invalidUploadServer,
  MiddleWare,
  middlewareErrorLabel,
  unknownServerError,
  validationError,
} from "../utils";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { InitFileUploadSchema } from "../schemas";
import slugify from "slugify";
import { DateTime } from "luxon";

const generateRandomDigits = (num = 6) => {
  return Math.random().toFixed(num).slice(2);
};

const generateKey = (fileName: string) => {
  return `${DateTime.now().toMillis()}-${generateRandomDigits()}-${slugify(
    fileName,
    "_"
  )}`;
};

export const uploader: MiddleWare = (req, res, next) => {
  const { error, value } = InitFileUploadSchema.validate({
    type: req.params.type || "document",
  });

  if (error || !value)
    return res.status(400).send({ message: error?.message ?? validationError });

  try {
    let multerUploader: multer.Multer | null = null;

    multerUploader = multer({
      storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
          public_id: (req, file) => {
            return generateKey(file.originalname);
          },
        },
      }),
    });

    if (multerUploader) return multerUploader.single("file")(req, res, next);
    else return res.status(400).send({ message: invalidUploadServer });
  } catch (e) {
    console.error(middlewareErrorLabel, e);
    return res.status(500).send({ message: unknownServerError });
  }
};
