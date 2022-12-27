import { repo } from "../core";
import {  ISeller, IOrder, IProduct } from "../utils";
import config from "../config";

import { MongoClient } from "mongodb";
const uri = config.MONGO_URL as string;
const client = new MongoClient(uri);

const database = client.db("olist");

const orders = database.collection("olist_order_items_dataset");
const products = database.collection("olist_products_dataset");
const sellers = database.collection<ISeller>("olist_olist_sellers_dataset");

export const updateSeller = (user: ISeller, data: ISeller) =>
  repo(async () => await sellers.updateOne(user, data));

export const findUser = (username: string, password: string) =>
  repo(() =>
    sellers.findOne({
      seller_id: username,
      seller_zip_code_prefix: password,
    })
  );

export const findOrders = (
  user: ISeller,
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

export const addSellers = (data: ISeller[]) => repo(() => sellers.insertMany(data));

export const addProducts = (data: IProduct[]) => repo(() => products.insertMany(data));

export const addOrders = (data: IOrder[]) => repo(() => orders.insertMany(data));
