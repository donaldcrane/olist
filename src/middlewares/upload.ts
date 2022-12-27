import { FileTypes, unknownDatabaseError } from "../utils";
import { addFile } from "../repos";
import { task } from "../core";

export const saveUploadedFile = (
  file: Express.Multer.File & Express.MulterS3.File,
  type: FileTypes
) =>
  task(async () => {
    const url = `${process.env.AWS_FILE_URL}/${file.key}`;
    const { data, error } = await addFile({
      key: file.key,
      type,
      url,
      mimetype: file.mimetype,
    });

    if (error || !data) return { error: error ?? unknownDatabaseError };
    return { data };
  });
