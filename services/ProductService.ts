import { col, fn, json, Op, QueryTypes, Sequelize } from "sequelize";
import Product from "../models/Product";
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
  //CASES FOR FILTERS AND POPULATES
  async productCases(
    pageNo: number,
    orderBy: string,
    sortBy: string,
    query: any,
    filter: any,
    limit: number
  ) {
    switch (query || filter) {
      case "all":
        return await this.genQuery(
          pageNo,
          orderBy,
          sortBy,
          limit,
          "1",
          "=",
          "1"
        );
      case "featured":
        return await this.genQuery(
          pageNo,
          orderBy,
          sortBy,
          limit,
          "product_featured_id",
          "=",
          "1"
        );

      case query:
        return await this.likeQuery(
          pageNo,
          orderBy,
          sortBy,
          limit,
          "product_name",
          query
        );

      case "bestselling":
        break;
      case "date":
        return await this.genQuery(
          pageNo,
          "product_updated_date",
          "DESC",
          limit,
          "1",
          "=",
          "1"
        );
      case "active":
        return await this.genQuery(
          pageNo,
          orderBy,
          sortBy,
          limit,
          "product_active",
          "=",
          "1"
        );
      case "inactive":
        return await this.genQuery(
          pageNo,
          orderBy,
          sortBy,
          limit,
          "product_active",
          "!=",
          "1"
        );

      case "count":
        return await Product.count();

      case "instock":
        return await this.genQuery(
          pageNo,
          orderBy,
          sortBy,
          limit,
          "product_in_stock ",
          "!=",
          "0"
        );

      default:
        return output == "" ? `No Products Found` : output;
    }
  }

  //GENERAL QUERY
  async genQuery(
    pageNo: number,
    orderBy: string,
    sortBy: string,
    limit: number,
    condVariable: any,
    operator: any,
    condValue: any
  ) {
    output = await db.query(
      `SELECT 
      product.product_id "productId",
      product.product_name "productName",
      product.product_status "productStatus",
      product.product_min_price "productMinPrice",
      product.product_max_price "productMaxPrice",
      product.product_quantity "productQuantity",
      product.product_rating_count "productRatingCount",
      product.product_average_rating "productAverageRating",
      product.product_total_sales "productTotalSales",
      product.product_category_id "productCategoryId",
      category.category_name "productCategoryName",
      product.product_image_id "productImageId",
      GROUP_CONCAT( image.product_image_name ) "productImageName",
      product.product_stock_quantity "productStockQuantity",
      product.product_in_stock "productInStock",
      product.product_onsale "productOnsale",
      product.product_active "productActive",
      product.product_brand_id "productBrandId",
      brand.brand_name "productBrandName",
      product.product_coupon_id "productCouponId",
      coupon.coupon_title "productCouponName",
      product.product_tax_id "productTaxId",
      product.product_shipping_id "productShippingId",
      product.product_featured_id "productFeaturedId",
      product.product_created_date "productCreatedDate",
      product.product_updated_date "productUpdatedDate" 
    FROM
    tempproduct product
      LEFT JOIN image image ON image.product_image_id = product.product_image_id
      LEFT JOIN category category ON category.category_id = product.product_category_id 
      LEFT JOIN brand brand ON brand.brand_id = product.product_brand_id 
      LEFT JOIN coupon coupon ON coupon.coupon_id = product.product_coupon_id
    WHERE
      ${condVariable} ${operator} ${condValue}
      GROUP BY product_id
      ORDER BY ${orderBy}
      ${sortBy}
      LIMIT ${limit}
      OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );

    // output["count"] = await Product.count();
    return output == "" ? `No Products Found` : output;
  }

  //LIKE QUERY
  async likeQuery(
    pageNo: number,
    orderBy: string,
    sortBy: string,
    limit:number,
    condVariable: any,
    condValue: any
  ) {
    output = await db.query(
      `SELECT
      product.product_id "productId",
      product.product_name "productName",
      product.product_status "productStatus",
      product.product_min_price "productMinPrice",
      product.product_max_price "productMaxPrice",
      product.product_quantity "productQuantity",
      product.product_rating_count "productRatingCount",
      product.product_average_rating "productAverageRating",
      product.product_total_sales "productTotalSales",
      product.product_category_id "productCategoryId",
      category.category_name "productCategoryName",
      product.product_image_id "productImageId",
      GROUP_CONCAT( image.product_image_name ) "productImageName",
      product.product_stock_quantity "productStockQuantity",
      product.product_in_stock "productInStock",
      product.product_onsale "productOnsale",
      product.product_active "productActive",
      product.product_brand_id "productBrandId",
      brand.brand_name "productBrandName",
      product.product_coupon_id "productCouponId",
      coupon.coupon_title "productCouponName",
      product.product_tax_id "productTaxId",
      product.product_shipping_id "productShippingId",
      product.product_featured_id "productFeaturedId",
      product.product_created_date "productCreatedDate",
      product.product_updated_date "productUpdatedDate" 
    FROM
    tempproduct product
    LEFT JOIN image image ON image.product_image_id = product.product_image_id
    LEFT JOIN category category ON category.category_id = product.product_category_id 
    LEFT JOIN brand brand ON brand.brand_id = product.product_brand_id 
    LEFT JOIN coupon coupon ON coupon.coupon_id = product.product_coupon_id
    WHERE
    ${condVariable} LIKE "%${condValue}%"
      GROUP BY product_id
      ORDER BY ${orderBy}
      ${sortBy}
      LIMIT ${limit}
      OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No Products Found` : output;
  }

  //GET PRODUCT BY ID
  async getProduct(id: number) {
    output = "";
    output = await db.query(
      `SELECT
      product.product_id "productId",
      product.product_name "productName",
      product.product_status "productStatus",
      product.product_min_price "productMinPrice",
      product.product_max_price "productMaxPrice",
      product.product_quantity "productQuantity",
      product.product_rating_count "productRatingCount",
      product.product_average_rating "productAverageRating",
      product.product_total_sales "productTotalSales",
      product.product_category_id "productCategoryId",
      category.category_name "productCategoryName",
      product.product_image_id "productImageId",
      GROUP_CONCAT( image.product_image_name ) "productImageName",
      product.product_stock_quantity "productStockQuantity",
      product.product_in_stock "productInStock",
      product.product_onsale "productOnsale",
      product.product_active "productActive",
      product.product_brand_id "productBrandId",
      brand.brand_name "productBrandName",
      product.product_coupon_id "productCouponId",
      coupon.coupon_title "productCouponName",
      product.product_tax_id "productTaxId",
      product.product_shipping_id "productShippingId",
      product.product_featured_id "productFeaturedId",
      product.product_created_date "productCreatedDate",
      product.product_updated_date "productUpdatedDate"  
    FROM
      tempproduct product
      LEFT JOIN image image ON image.product_image_id = product.product_image_id
      LEFT JOIN category category ON category.category_id = product.product_category_id 
      LEFT JOIN brand brand ON brand.brand_id = product.product_brand_id 
      LEFT JOIN coupon coupon ON coupon.coupon_id = product.product_coupon_id
    WHERE
      product_id = ${id}`,

      {
        type: QueryTypes.SELECT,
      }
    );

    return output == "" || output == null || output[0].productId == null
      ? `No Product with id=${id} Found`
      : output;
  }

  //PRODUCT COUNT
  async countProduct(body: any) {
    output = "";
    output = await Product.create(body);
    return output == "" ? `Error occured` : output;
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
