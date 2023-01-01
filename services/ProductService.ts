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

  //GET Product BY ID
  async getProduct(id: any) {
    output = "";
    output = await Product.findByPk(id);
    return output == "" ? `No Product with ${id} Found` : output;
  }
}
