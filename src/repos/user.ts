import { repo } from "../core";
import { AccountData, userData } from "../utils";
import config from "../config";

import { MongoClient } from "mongodb";
// Replace the uri string with your connection string.
const uri = config.MONGO_URL as string;
const client = new MongoClient(uri);

const database = client.db("olist");

const orders = database.collection("olist_order_items_dataset");
const products = database.collection("olist_products_dataset");
const sellers = database.collection("olist_sellers_dataset");

export const updateSeller = (user: userData, data: AccountData) =>
  repo(async () => await sellers.updateOne(user, data));

export const findUser = (username: string, password: string) =>
  repo(() =>
    sellers.findOne({
      seller_id: username,
      seller_zip_code_prefix: password,
    })
  );

export const findOrders = (
  user: userData,
  sort: number,
  page: number,
  limit: number
) =>
  repo(async () =>
    orders
      .find({ user })
      .sort({ place: 1 })
      .skip(page * limit)
      .limit(limit)
  );

export const deleteOrder = (id: number) =>
  repo(() =>
    orders.deleteOne({
      id,
    })
  );

export const addSellers = (data: any) => repo(() => sellers.insertMany(data));

export const addProducts = (data: any) => repo(() => products.insertMany(data));

export const addOrders = (data: any) => repo(() => orders.insertMany(data));
