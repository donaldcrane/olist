export enum FileTypes {
  VIDEO = "video",
  IMAGE = "image",
  DOCUMENT = "document",
  AUDIO = "audio",
}

export interface InitCreateFileData {
  key: string;
  type: FileTypes;
  url: string;
  mimetype: string;
}
export interface InitFileUploadData {
  key: string;
  type: FileTypes;
  url: string;
  mimetype: string;
}
export interface FileFilterData {
  type: FileTypes;
}
