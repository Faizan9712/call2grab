import { QueryTypes } from "sequelize";
import dotenv from "dotenv";
import { pagination } from "../helpers/functions";
import db from "../config/database";

//INSTANCE VARIABLES
let output: any;

dotenv.config();

//GET CART OF USER SERVICE CLASS
export default class CartService {
  //GET ALL PRODUCTS IN CART
  async getAllProducts(
    pageNo: number,
    orderBy: string,
    sortBy: string,
    limit: number
  ) {
    output = "";
    output = await db.query(
      `SELECT
      cart.cart_id "cartId",
      cart.cart_user_id "cartUserId",
      cart.cart_product_id "cartProductId",
      cart.cart_product_quantity "cartProductQuantity",
      cart.cart_product_total_price "cartProductTotalPrice",
      cart.cart_detail "cartDetail",
      cart.cart_created_date "cartCreatedDate",
      cart.cart_updated_date "cartUpdatedDate" 
    FROM
    cart cart
      LEFT JOIN users users ON users.user_id = cart.cart_user_id
      LEFT JOIN tempproduct tempproduct ON tempproduct.product_id = cart.cart_product_id 
    WHERE
      1=1
      ORDER BY ${orderBy}
      ${sortBy}
      LIMIT ${limit}
      OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? "No Products Found" : output;
  }
}
