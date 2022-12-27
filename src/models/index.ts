import config from "../config";

import { MongoClient } from "mongodb";
// Replace the uri string with your connection string.
const uri = config.MONGO_URL as string;
const client = new MongoClient(uri);
// await client.close();
const connect = async () => {
  const database = await client.db("olist");
  const orders = database.collection("olist_order_items_dataset");
  const products = database.collection("olist_products_dataset");
  const sellers = database.collection("olist_sellers_dataset");

  return { orders, products, sellers };
};

export { connect };
