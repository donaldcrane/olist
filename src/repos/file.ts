import { db } from "../models";
import { repo } from "../core";
import { InitCreateFileData } from "../utils";

export const addFile = (data: InitCreateFileData) =>
  repo(() => db.fileUploads.create({ data }));
