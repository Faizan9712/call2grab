import path from "path";
import { col, fn, json, Op, QueryTypes, Sequelize } from "sequelize";
import Category from "../models/Category";
import dotenv from "dotenv";
import db from "../config/database";

//INSTANCE VARIABLES
let output: any;
let queryPm: number;

dotenv.config();

//Category SERVICE CLASS
export default class CategoryService {
  //GET ALL CategoryS
  async getAllCategorys() {
    output = "";
    output = await Category.findAll();
    return output == "" ? "No Categorys Found" : output;
  }

  //GET Category BY ID
  async getCategory(id: number) {
    output = "";
    output = await Category.findByPk(id);
    return output == "" ? `No Category with ${id} Found` : output;
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
}
