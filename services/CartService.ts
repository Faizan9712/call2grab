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
  //GET ALL ProductS
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
    // output = await Cart.findAll({
    //   include: [
    //     {
    //       model: Product,
    //       attributes: [],
    //       required: true,
    //     },
    //     {
    //       model: User,
    //       attributes: [],
    //       required: true,
    //     },
    //   ],
    //   attributes: [
    //     // "productId",
    //     "productId",
    //     "userId",
    //     [Sequelize.col("user_first_name"), "userFirstName"],
    //     // "productName",
    //     // "productStatus",
    //     // "productMinPrice",
    //     // "productMaxPrice",
    //     "productQuantity",
    //     // "productRatingCount",
    //     // "productAverageRating",
    //     // "productTotalSales",
    //     // "productCategoryId",
    //     [Sequelize.col("product_name"), "productName"],
    //     // "productImageId",
    //     // "productStockQuantity",
    //     // "productInStock",
    //     // "productOnsale",
    //     // "productActive",
    //     // "productBrandId",
    //     // "productCouponId",
    //     // "productTaxId",
    //     // "productShippingId",
    //     "cartCreatedDate",
    //     "cartUpdatedDate",
    //   ],

    //   raw: true,
    //   order: [[orderBy, sortBy]],

    //   limit: 10,
    //   offset: await pagination(pageNo),
    // });
    return output == "" ? "No Products Found" : output;
  }
}
