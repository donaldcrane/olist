import {
  Service,
  response,
  notExistError,
  AccountData,
  filterItems,
} from "../utils";
import { service } from "../core";
import { deleteOrder, findOrders, updateSeller } from "../repos";

export const updateSellerAccount: Service<AccountData> = ({
  user,
  validatedData,
}) =>
  service(async () => {
    if (!user) return response.forbidden();
    const result = await updateSeller(user, validatedData);

    if (!result) return response.serverError();
    return response.success(result);
  });

export const getItems: Service = ({ user, filters }) =>
  service(async () => {
    if (!user) return response.forbidden();
    const { sort, page, limit } = filters as filterItems;
    const results = await findOrders(user, sort, page, limit);

    if (!results) return response.failed(notExistError("Orders"));

    return response.success(results);
  });

export const removeItem: Service = ({ id }) =>
  service(async () => {
    await deleteOrder(id);

    return response.success();
  });
