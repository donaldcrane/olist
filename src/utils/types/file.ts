export enum FileTypes {
  VIDEO = "video",
  IMAGE = "image",
  DOCUMENT = "document",
  AUDIO = "audio",
}
// export enum saveDataFilter {
//   SELLER = "sellers",
//   PRODUCT = "products",
//   ORDER = "orders",
// }

export interface saveDataFilter {
  type: string;
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
