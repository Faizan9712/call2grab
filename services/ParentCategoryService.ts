import { QueryTypes } from "sequelize";
import ParentCategory from "../models/ParentCategory";
import dotenv from "dotenv";
import db from "../config/database";
import { pagination } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;

dotenv.config();

//PARENT CATEGORY SERVICE CLASS
export default class ParentCategoryService {
  //GET ALL PARENT CATEGORIES
  async parentCategoryCases(
    pageNo: number,
    orderBy: string,
    sortBy: string,
    query: any,
    filter: any,
    limit: number
  ) {
    switch (query || filter) {
      case "all":
        return await this.genQuery(pageNo, orderBy, sortBy, limit);

      case "date":
        return await this.genQuery(
          pageNo,
          "parent_category_updated_date",
          "DESC",
          limit
        );

      case "name":
        return await this.genQuery(
          pageNo,
          "parent_category_name",
          sortBy,
          limit
        );

      case "count":
        return await ParentCategory.count();

      default:
        return output == "" ? `No Products Found` : output;
    }
  }

  //GEN QUERY
  async genQuery(
    pageNo: number,
    orderBy: string,
    sortBy: string,
    limit: number
  ) {
    output = "";

    output = await db.query(
      `SELECT
	  parent_category_id AS parentCategoryId,
	  parent_category_name AS parentCategoryName,
	  parent_category_description AS parentCategoryDescription,
    parent_category_created_date AS parentCategoryCreatedDate,
    parent_category_updated_date AS parentCategoryUpdatedDate

  FROM
	  parentcategory AS ParentCategory 
      GROUP BY parent_category_id
      ORDER BY ${orderBy}
      ${sortBy}
      LIMIT ${limit}
      OFFSET ${await pagination(pageNo)}`,
      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? "No Parent Categories Found" : output;
  }

  //GET PARENT CATEGORY BY ID
  async getParentCategory(id: number) {
    output = "";
    output = await ParentCategory.findByPk(id);
    return output == "" || output == null
      ? `No ParentCategory with id=${id} Found`
      : output;
  }

  //ADD PARENT CATEGORY
  async addParentCategory(body: any) {
    output = "";
    output = await ParentCategory.create(body);
    return output == "" ? `Error occured` : output._previousDataValues;
  }

  //UPDATE PARENT CATEGORY
  async updateParentCategory(body: any, id: number) {
    output = "";
    output = await ParentCategory.update(body, {
      where: { parentCategoryId: id },
    });
    return output;
  }

  //DELETE PARENT CATEGORY
  async deleteParentCategory(id: number) {
    output = "";
    output = await ParentCategory.destroy({
      where: { parentCategoryId: id },
    });
    return output;
  }
}
