import {
  invalidUploadServer,
  MiddleWare,
  middlewareErrorLabel,
  unknownServerError,
  validationError,
  generateKey,
} from "../utils";
import multer from "multer";
import multerS3 from "multer-s3";
import { InitFileUploadSchema } from "../schemas";
import { S3Client } from "@aws-sdk/client-s3";
import config from "../config";

export const s3 = new S3Client({
  region: config.AWS_REGION,
});
export const uploader: MiddleWare = (req, res, next) => {
  const { error, value } = InitFileUploadSchema.validate({
    type: req.params.type || "image",
  });

  if (error || !value)
    return res.status(400).send({ message: error?.message ?? validationError });

  const { type } = value;
  try {
    let multerUploader: multer.Multer | null = null;

    multerUploader = multer({
      storage: multerS3({
        s3,
        bucket: config.AWS_S3_BUCKET ?? "",
        key(req, file, callback: (error: unknown, key?: string) => void) {
          callback(null, `uploads/${type}/${generateKey(file.originalname)}`);
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
