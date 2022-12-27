import { saveFile } from "../services";
import { controller } from "../core";
import { Controller } from "../utils";

export const createCollection: Controller = (req, res) =>
  controller({
    req,
    res,
    service: saveFile

  });

