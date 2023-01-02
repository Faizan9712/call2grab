import path from "path";
import { col, fn, json, Op, QueryTypes, Sequelize } from "sequelize";
import Product from "../models/Product";
import dotenv from "dotenv";
import db from "../config/database";

//INSTANCE VARIABLES
let output: any;
let queryPm: number;

dotenv.config();

//Product SERVICE CLASS
export default class ProductService {
  //GET ALL ProductS
  async getAllProducts() {
    output = "";
    output = await Product.findAll();
    return output == "" ? "No Products Found" : output;
  }

  //GET PRODUCT BY ID
  async getProduct(id: number) {
    output = "";
    output = await Product.findByPk(id);
    return output == "" ? `No Product with ${id} Found` : output;
  }

  //ADD PRODUCT
  async addProduct(body: any) {
    output = "";
    output = await Product.create(body);
    return output == "" ? `Error occured` : output._previousDataValues;
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
}
