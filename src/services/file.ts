import { Service, response, saveDataFilter, IFile } from "../utils";
import { service } from "../core";
import { addOrders, addSellers, addProducts } from "../repos";
import fs from "fs";

export const saveFile: Service<unknown, unknown, saveDataFilter> = ({
  file,
  filters,
}) =>
  service(async () => {
    const { type } = filters as saveDataFilter;

    const data = fs as IFile;
    file
      .toString()
      .split("\n")
      .map((e) => e.trim())
      .map((e) => e.split(",").map((e) => e.trim()));

    await (type === "orders"
      ? addOrders(data)
      : type === "sellers"
      ? addSellers(data)
      : addProducts(data));

    return response.success();
  });
