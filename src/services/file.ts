import { Service, response, FileFilterData } from "../utils";
import { service } from "../core";
import { saveUploadedFile } from "../middlewares";

export const saveFile: Service = ({ file, filters }) =>
  service(async () => {
    const { type } = filters as FileFilterData;
    const { data: documentFile, error: fileError } = await saveUploadedFile(
      file,
      type
    );
    if (fileError || !documentFile?.url) return response.serverError(fileError);

    return response.success(documentFile);
  });
