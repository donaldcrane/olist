export enum FileTypes {
  VIDEO = "video",
  IMAGE = "image",
  DOCUMENT = "document",
  AUDIO = "audio",
}

export interface saveDataFilter {
  type: string;
}

export interface FileFilterData {
  type: FileTypes;
}
