import path from "path";
import { col, fn, json, Op, QueryTypes, Sequelize } from "sequelize";
import Product from "../models/Product";
import Category from "../models/Category";
import Image from "../models/ProductImage";
import dotenv from "dotenv";
import db from "../config/database";
import ProductImage from "../models/ProductImage";
import { pagination } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;
let queryPm: number;

dotenv.config();

//Product SERVICE CLASS
export default class ProductService {
  //GET ALL ProductS
  async getAllProducts(pageNo: number, orderBy: string, sortBy: string) {
    output = "";
    output = await db.query("SELECT * FROM product product INNER JOIN image image on product.product_image_id = image.product_image_id", {
      type: QueryTypes.SELECT,
    });
    // output = await Product.findAll({
    //   include: [
    //     {
    //       model: Category,
    //       attributes: [],
    //       required: true,
    //     },
    //   ],
    //   attributes: [
    //     // "productId",
    //     "productId",
    //     "productName",
    //     "productStatus",
    //     "productMinPrice",
    //     "productMaxPrice",
    //     "productQuantity",
    //     "productRatingCount",
    //     "productAverageRating",
    //     "productTotalSales",
    //     "productCategoryId",
    //     // [Sequelize.col("category_name"), "categoryName"],
    //     "productImageId",
    //     "productStockQuantity",
    //     "productInStock",
    //     "productOnsale",
    //     "productActive",
    //     "productBrandId",
    //     "productCouponId",
    //     "productTaxId",
    //     "productShippingId",
    //     "productFeaturedId",
    //     "productCreatedDate",
    //     "productUpdatedDate",
    //   ],

    //   raw: true,
    //   order: [[orderBy, sortBy]],

    //   limit: 10,
    //   offset: await pagination(pageNo),
    // });
    return output == "" ? "No Products Found" : output;
  }

  //GET PRODUCT BY ID
  async getProduct(id: number) {
    output = "";
    output = await Product.findOne({
      include: [
        {
          model: Category,
          attributes: [],

          required: true,
        },
        {
          model: Image,
          where: { product_image_id: "product_image_id" },
          attributes: [],
          required: true,
        },
      ],
      attributes: [
        "productId",
        "productId",
        "productName",
        "productStatus",
        "productMinPrice",
        "productMaxPrice",
        "productQuantity",
        "productRatingCount",
        "productAverageRating",
        "productTotalSales",
        "productCategoryId",
        [Sequelize.col("category_name"), "categoryName"],
        "productImageId",
        [Sequelize.col("product_image_name"), "productImageName"],
        "productStockQuantity",
        "productInStock",
        "productOnsale",
        "productActive",
        "productBrandId",
        "productCouponId",
        "productTaxId",
        "productShippingId",
        "productEntryId",
        "productModifiedId",
        "productFeaturedId",
        "productCreatedDate",
        "productUpdatedDate",
      ],

      raw: true,
      limit: 10,
      where: { product_id: id },
    });
    return output == "" ? `No Product with ${id} Found` : output;
  }

  //ADD PRODUCT
  async addProduct(body: any) {
    output = "";
    output = await Product.create(body);
    return output == "" ? `Error occured` : output;
  }

  //UPDATE PRODUCT
  async updateProduct(body: any, id: number) {
    output = "";
    output = await Product.update(body, {
      where: { product_id: id },
    });
    return output;
  }

  //DELETE PRODUCT
  async deleteProduct(id: number) {
    output = "";
    output = await Product.destroy({
      where: { product_id: id },
    });
    return output;
  }

  //PATH OF PHOTO IN DB
  async dbSetPath(fullfilename: any, id: number) {
    output = "";
    output = await ProductImage.create({
      productImageId: id,
      productImageName: fullfilename,
    }).then((output: any) => {
      return output;
    });
  }
}
