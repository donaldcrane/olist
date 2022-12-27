import { Service, response, saveDataFilter } from "../utils";
import { service } from "../core";
import { addOrders, addSellers, addProducts } from "../repos";
// import fs from "fs";

export const saveFile: Service<unknown, unknown, saveDataFilter> = ({
  file,
  filters,
}) =>
  service(async () => {
    const { type } = filters as saveDataFilter;

    const data = file.buffer
      .toString()
      .split("\n")
      .map((e) => e.trim())
      .map((e) => e.split(",").map((e) => e.trim()));
    
    const filteredArray = data.shift();
    if (!filteredArray) return response.serverError()
    
   const productData = filteredArray.map((product) => {
      return {
        product_id: product[0],
        product_category_name: product[1],
        product_name_lenght: product[2],
        product_description_lenght: product[3],
        product_photos_qty: product[4],
        product_weight_g: product[5],
        product_length_cm: product[6],
        product_height_cm: product[7],
        product_width_cm: product[8]
      }
   })
    
    const orderData = filteredArray.map((order) => {
      return {
        order_id: order[0],
        order_item_id: order[1],
        product_id: order[2],
        seller_id: order[3],
        shipping_limit_date: order[4],
        price: order[5],
        freight_value: order[6],
      }
    })
    
    const sellerData = filteredArray.map((seller) => {
      return {
        seller_id: seller[0],
        seller_zip_code_prefix: seller[1],
        seller_city: seller[2],
        seller_state: seller[3],
      }
    })



    
    const { error} = await (type === "orders"
      ? addOrders(orderData)
      : type === "sellers"
      ? addSellers(sellerData)
        : addProducts(productData));
        
    if(error)return response.failed(error);
    return response.success();
  });
