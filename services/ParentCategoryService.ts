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
  async getAllParentCategorys(pageNo: number, orderBy: string, sortBy: string) {
    output = "";
    output = await ParentCategory.findAll({
      raw: true,
      order: [[orderBy, sortBy]],

      limit: 10,
      offset: await pagination(pageNo),
    });
    return output == "" ? "No Parent Categories Found" : output;
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
}
