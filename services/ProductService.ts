import path from "path";
import { col, fn, json, Op, QueryTypes, Sequelize } from "sequelize";
import Product from "../models/Product";
import Category from "../models/Category";
import Image from "../models/Image";
import dotenv from "dotenv";

//INSTANCE VARIABLES
let output: any;
let queryPm: number;

dotenv.config();

//Product SERVICE CLASS
export default class ProductService {
  //GET ALL ProductS
  async getAllProducts() {
    output = "";
    // output = await Product.findAll();
    output = await Product.findAll({
      include: [
        {
          model: Category,
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
        // "productCategoryId",
        [Sequelize.col("category_name"), "categoryName"],
        "productImageId",
        "productStockQuantity",
        "productInStock",
        "productOnsale",
        "productActive",
        "productBrandId",
        "productCouponId",
        "productTaxId",
        "productShippingId",
        "productCreatedDate",
        "productUpdatedDate",
      ],

      raw: true,
      limit: 10,
    });
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
        // "productCategoryId",
        [Sequelize.col("category_name"), "categoryName"],
        "productImageId",
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
    console.log("======", output);
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
    output = await Image.findOne({
      where: { image_id: id },
    }).then((output: any) => {
      console.log("========", output);
      output.set({ imageOne: fullfilename });
      console.log(output.userPhoto);
      output.save();
    });
    return output;
  }
}
