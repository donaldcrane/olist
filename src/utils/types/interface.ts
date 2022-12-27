/* eslint-disable @typescript-eslint/no-empty-interface */
declare global {
  namespace Express {
    interface User extends ISeller {}
    interface Request extends CustomRequest {}
  }
}

export interface CustomRequest {
  user: unknown | null;
  file: object;
  params: object;
  query: object;
  path: object;
}

export interface ISeller {
  seller_id: string;
  seller_zip_code_prefix: string;
  seller_city: string;
  seller_state: string;
}

export interface IOrder {
  order_id: string;
  order_item_id: string;
  product_id: string;
  seller_id: string;
  shipping_limit_date: string;
  price: string;
  freight_value: string;
}

export interface IProduct {
  product_id: string;
  product_category_name: string;
  product_name_lenght: string;
  product_description_lenght: string;
  product_photos_qty: string;
  product_weight_g: string;
  product_length_cm: string;
  product_height_cm: string;
  product_width_cm: string;
}

export interface filterItems {
  sort: number;
  page: number;
  limit: number;
}

export interface IData {
  data?: string;
}
