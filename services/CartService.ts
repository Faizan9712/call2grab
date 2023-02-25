import path from "path";
import { col, fn, json, Op, QueryTypes, Sequelize } from "sequelize";
import Product from "../models/Product";
import Category from "../models/Category";
import Image from "../models/ProductImage";
import dotenv from "dotenv";
import ProductImage from "../models/ProductImage";
import { pagination } from "../helpers/functions";
import Cart from "../models/Cart";
import User from "../models/User";
import db from "../config/database";

//INSTANCE VARIABLES
let output: any;
let queryPm: number;

dotenv.config();

//GET CART OF USER SERVICE CLASS
export default class CartService {
  //GET ALL PRODUCTS IN CART
  async getAllProducts(pageNo: number, orderBy: string, sortBy: string) {
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
      LIMIT 10
      OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? "No Products Found" : output;
  }
}
