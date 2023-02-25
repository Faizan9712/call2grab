import path from "path";
import { col, fn, json, Op, QueryTypes, Sequelize } from "sequelize";
import ParentCategory from "../models/ParentCategory";
import dotenv from "dotenv";
import db from "../config/database";
import { pagination } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;
let queryPm: number;

dotenv.config();

//ParentCategory SERVICE CLASS
export default class ParentCategoryService {
  //GET ALL ParentCategoryS
  async genQuery(pageNo: number, orderBy: string, sortBy: string) {
    output = "";
    output = await ParentCategory.findAll({
      raw: true,
      order: [[orderBy, sortBy]],
      limit: 10,
      offset: await pagination(pageNo),
    });
    return output == "" ? "No Parent Categories Found" : output;
  }

  async parentCategoryCases(
    pageNo: number,
    orderBy: string,
    sortBy: string,
    query: any,
    filter: any
  ) {
    switch (query || filter) {
      case "all":
        return await this.genQuery(pageNo, orderBy, sortBy);
      // case "featured":
      //   return await this.genQuery(
      //     pageNo,
      //     orderBy,
      //     sortBy,
      //     "product_featured_id",
      //     "=",
      //     "1"
      //   );

      // case query:
      //   return await this.likeQuery(
      //     pageNo,
      //     orderBy,
      //     sortBy,
      //     "product_name",
      //     query
        // );

      // case "bestselling":
      //   break;
      // case "date":
      //   return await this.genQuery(
      //     pageNo,
      //     "product_updated_date",
      //     "DESC",
      //     "1",
      //     "=",
      //     "1"
        // );
      // case "active":
      //   return await this.genQuery(
      //     pageNo,
      //     orderBy,
      //     sortBy,
      //     "product_active",
      //     "=",
      //     "1"
      //   );
      // case "inactive":
      //   return await this.genQuery(
      //     pageNo,
      //     orderBy,
      //     sortBy,
      //     "product_active",
      //     "!=",
      //     "1"
      //   );

        case "count":
          return await ParentCategory.count()

      // case "instock":
      //   return await this.genQuery(
      //     pageNo,
      //     orderBy,
      //     sortBy,
      //     "product_in_stock ",
      //     "!=",
      //     "0"
      //   );

      default:
        return output == "" ? `No Products Found` : output;
    }
  }


  //GET ParentCategory BY ID
  async getParentCategory(id: number) {
    output = "";
    output = await ParentCategory.findByPk(id);
    return output == "" || output == null
      ? `No ParentCategory with id=${id} Found`
      : output;
  }

  //ADD ParentCategory
  async addParentCategory(body: any) {
    output = "";
    output = await ParentCategory.create(body);
    return output == "" ? `Error occured` : output._previousDataValues;
  }

  //UPDATE ParentCategory
  async updateParentCategory(body: any, id: number) {
    output = "";
    output = await ParentCategory.update(body, {
      where: { parentCategoryId: id },
    });
    return output;
  }

  //DELETE ParentCategory
  async deleteParentCategory(id: number) {
    output = "";
    output = await ParentCategory.destroy({
      where: { parentCategoryId: id },
    });
    return output;
  }

  //POPULATE ParentCategory
  async populateParentCategories(qpm: any) {
    output = "";
    output = await ParentCategory.findAll({
      where: { parentCategoryName: { [Op.like]: `%${qpm}%` } },
      limit: 10,
    });
    return output == "" ? "No Parent Categories Found" : output;
  }

  //COUNT
  async countParentCategory(qpm: any) {
    return await ParentCategory.count();
  }
}
