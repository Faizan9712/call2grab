import path from "path";
import { col, fn, json, Op, or, QueryTypes, Sequelize } from "sequelize";
import Category from "../models/Category";
import dotenv from "dotenv";
import db from "../config/database";
import { pagination } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;
let queryPm: number;

dotenv.config();

//Category SERVICE CLASS
export default class CategoryService {
  //GET ALL CategoryS
  // async getAllCategorys() {
  //   output = "";
  //   output = await db.query(
  //     `SELECT
  //     category.category_id "categoryId",
  //     category.category_name "categoryName",
  //     category.category_status "categoryStatus",
  //     category.category_min_price "categoryMinPrice",
  //     category.category_max_price "categoryMaxPrice",
  //     category.category_quantity "categoryQuantity",
  //     category.category_rating_count "categoryRatingCount",
  //     category.category_average_rating "categoryAverageRating",
  //     category.category_total_sales "categoryTotalSales",
  //     category.category_category_id "categoryCategoryId",
  //     category.category_name "categoryCategoryName",
  //     category.category_image_id "categoryImageId",
  //     GROUP_CONCAT(image.category_image_name) "categoryImageName",
  //     category.category_stock_quantity "categoryStockQuantity",
  //     category.category_in_stock "categoryInStock",
  //     category.category_onsale "categoryOnsale",
  //     category.category_active "categoryActive",
  //     category.category_brand_id "categoryBrandId",
  //     category.category_coupon_id "categoryCouponId",
  //     category.category_tax_id "categoryTaxId",
  //     category.category_shipping_id "categoryShippingId",
  //     category.category_featured_id "categoryFeaturedId",
  //     category.category_created_date "categoryCreatedDate",
  //     category.category_updated_date "categoryUpdatedDate"

  //   FROM
  //     tempcategory category
  //     LEFT JOIN  image image ON image.category_image_id = category.category_image_id
  //     LEFT JOIN  category category ON category.category_id = category.category_category_id
  //   WHERE 1=1
  //     GROUP BY category_id
  //     ORDER BY ${orderBy}
  //     ${sortBy}
  //     LIMIT 10
  //     OFFSET ${await pagination(pageNo)}`,

  //     {
  //       type: QueryTypes.SELECT,
  //     }
  //   );
  //   // output = await Category.findAll({ limit: 10 });
  //   // return output == "" ? "No Categories Found" : output;
  // }

  //GET Category BY ID
  async getCategory(id: number) {
    output = "";
    output = await Category.findByPk(id);
    // console.log(output);
    return output == "" || output == null
      ? `No Category with id=${id} Found`
      : output;
  }

  //ADD Category
  async addCategory(body: any) {
    output = "";
    output = await Category.create(body);
    return output == "" ? `Error occured` : output._previousDataValues;
  }

  //UPDATE Category
  async updateCategory(body: any, id: number) {
    output = "";
    output = await Category.update(body, {
      where: { Category_id: id },
    });
    return output;
  }

  //DELETE Category
  async deleteCategory(id: number) {
    output = "";
    output = await Category.destroy({
      where: { Category_id: id },
    });
    return output;
  }

  //POPULATE CATEGORY
  async populateCategories(qpm: any) {
    output = "";
    output = await Category.findAll({
      where: { categoryName: { [Op.like]: `%${qpm}%` } },
      limit: 10,
    });
    return output == "" ? "No Categories Found" : output;
  }

  //PATH OF PHOTO IN DB
  async dbSetPath(fullfilename: any, id: number) {
    output = "";
    output = await Category.update(
      { categoryImage: fullfilename },
      {
        where: { categoryId: id },
      }
    ).then((output: any) => {
      // console.log("=========",output)
      return output;
    });
  }

  //CASES FOR FILTERS AND POPULATES
  async categoryCases(
    pageNo: number,
    orderBy: string,
    sortBy: string,
    query: any,
    filter: any
  ) {
    switch (query || filter) {
      case "all":
        return await this.genQuery(pageNo, orderBy, sortBy, "1", "=", "1");
      case "featured":
        return await this.genQuery(
          pageNo,
          orderBy,
          sortBy,
          "category_featured_id",
          "=",
          "1"
        );

      case query:
        return await this.likeQuery(
          pageNo,
          orderBy,
          sortBy,
          "category_name",
          query
        );

      case "bestselling":
        break;
      case "date":
        return await this.genQuery(
          pageNo,
          "category_updated_date",
          "DESC",
          "1",
          "=",
          "1"
        );
      case "active":
        return await this.genQuery(
          pageNo,
          orderBy,
          sortBy,
          "category_active",
          "=",
          "1"
        );

      default:
        return output == "" ? `No Categories Found` : output;
    }
  }

  //GENERAL QUERY
  async genQuery(
    pageNo: number,
    orderBy: string,
    sortBy: string,
    condVariable: any,
    operator: any,
    condValue: any
  ) {
    output = await db.query(
      `SELECT
      category.category_id "categoryId",
      category.category_name "categoryName",
      category.category_parent_id "categoryParentId",
      parent.parent_category_name "parentCategoryName",
      category.category_image "categoryImage",
      category.category_active "categoryActive"
    FROM
    category category
      LEFT JOIN parentcategory parent ON parent.parent_category_id = category.category_parent_id
    WHERE
      ${condVariable} ${operator} ${condValue}
      GROUP BY category_id
      ORDER BY ${orderBy}
      ${sortBy}
      LIMIT 10
      OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No Categories Found` : output;
  }

  //LIKE QUERY
  async likeQuery(
    pageNo: number,
    orderBy: string,
    sortBy: string,
    condVariable: any,
    condValue: any
  ) {
    output = await db.query(
      `SELECT
      category.category_id "categoryId",
      category.category_name "categoryName",
      category.category_parent_id "categoryParentId",
      parent.parent_category_name "parentCategoryName",
      category.category_image "categoryImage",
      category.category_active "categoryActive"
    FROM
    category category
      LEFT JOIN parentcategory parent ON parent.parent_category_id = category.category_parent_id
 
    WHERE
    ${condVariable} LIKE "%${condValue}%"
      GROUP BY category_id
      ORDER BY ${orderBy}
      ${sortBy}
      LIMIT 10
      OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No Categories Found` : output;
  }
}
