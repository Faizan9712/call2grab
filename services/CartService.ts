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

//INSTANCE VARIABLES
let output: any;
let queryPm: number;

dotenv.config();

//GET CART OF USER SERVICE CLASS
export default class CartService {
  //GET ALL ProductS
  async getAllProducts(pageNo: number, orderBy: string, sortBy: string) {
    output = "";
    output = await Cart.findAll({
      include: [
        {
          model: Product,
          attributes: [],
          required: true,
        },
        {
          model: User,
          attributes: [],
          required: true,
        },
      ],
      attributes: [
        // "productId",
        "productId",
        "userId",
        [Sequelize.col("user_first_name"), "userFirstName"],
        // "productName",
        // "productStatus",
        // "productMinPrice",
        // "productMaxPrice",
        "productQuantity",
        // "productRatingCount",
        // "productAverageRating",
        // "productTotalSales",
        // "productCategoryId",
        [Sequelize.col("product_name"), "productName"],
        // "productImageId",
        // "productStockQuantity",
        // "productInStock",
        // "productOnsale",
        // "productActive",
        // "productBrandId",
        // "productCouponId",
        // "productTaxId",
        // "productShippingId",
        "cartCreatedDate",
        "cartUpdatedDate",
      ],

      raw: true,
      order: [[orderBy, sortBy]],

      limit: 10,
      offset: await pagination(pageNo),
    });
    return output == "" ? "No Products Found" : output;
  }
}
