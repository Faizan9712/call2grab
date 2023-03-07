import { QueryTypes } from "sequelize";
import Category from "../models/Category";
import dotenv from "dotenv";
import db from "../config/database";
import { pagination } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;

dotenv.config();

//CATEGORY SERVICE CLASS
export default class CategoryService {
  //CASES FOR FILTERS AND POPULATES

  async categoryCases(
    pageNo: number,
    orderBy: string,
    sortBy: string,
    query: any,
    filter: any,
    limit: any
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
          "category_featured_id",
          "=",
          "1"
        );
      case "name":
        return await this.genQuery(
          pageNo,
          "category_name",
          sortBy,
          limit,
          "1",
          "=",
          "1"
        );

      case query:
        return await this.likeQuery(
          pageNo,
          orderBy,
          sortBy,
          limit,
          "category_name",
          query
        );

      case "date":
        return await this.genQuery(
          pageNo,
          "category_updated_date",
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
          "category_active",
          "=",
          "1"
        );
      case "count":
        return Category.count();

      default:
        return output == "" ? `No Categories Found` : output;
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
    LIMIT ${limit}
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
    limit: number,
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
    LIMIT ${limit}
    OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No Categories Found` : output;
  }

  //GET CATEGORY BY ID
  async getCategory(id: number) {
    output = "";
    output = await Category.findByPk(id);
    return output == "" || output == null
      ? `No Category with id=${id} Found`
      : output;
  }

  //ADD CATEGORY
  async addCategory(body: any) {
    output = "";
    output = await Category.create(body);
    return output == "" ? `Error occured` : output._previousDataValues;
  }

  //UPDATE CATEGORY
  async updateCategory(body: any, id: number) {
    output = "";
    output = await Category.update(body, {
      where: { Category_id: id },
    });
    return output;
  }

  //DELETE CATEGORY
  async deleteCategory(id: number) {
    output = "";
    output = await Category.destroy({
      where: { Category_id: id },
    });
    return output;
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
      return output;
    });
  }
}
