import slugify from "slugify";
import { DateTime } from "luxon";

export const generateKey = (fileName: string) => {
  return `${DateTime.now().toMillis()}-${generateRandomDigits()}-${slugify(
    fileName,
    "_"
  )}`;
};

export const generateRandomDigits = (num = 6) => {
  return Math.random().toFixed(num).slice(2);
};
