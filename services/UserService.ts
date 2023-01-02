import path from "path";
import { col, fn, json, Op, QueryTypes, Sequelize } from "sequelize";
import User from "../models/User";
import dotenv from "dotenv";
import db from "../config/database";

//INSTANCE VARIABLES
let output: any;
let queryPm: number;

dotenv.config();

//User SERVICE CLASS
export default class UserService {
  //GET ALL UserS
  async getAllUsers() {
    output = "";
    output = await User.findAll();
    return output == "" ? "No Users Found" : output;
  }

  //GET User BY ID
  async getUser(id: number) {
    output = "";
    output = await User.findByPk(id);
    return output == "" ? `No User with ${id} Found` : output;
  }

  //ADD User
  async addUser(body: any) {
    output = "";
    output = await User.create(body);
    return output == "" ? `Error occured` : output._previousDataValues;
  }

  //UPDATE User
  async updateUser(body: any, id: number) {
    output = "";
    output = await User.update(body, {
      where: { User_id: id },
    });
    return output;
  }

  //DELETE User
  async deleteUser(id: number) {
    output = "";
    output = await User.destroy({
      where: { User_id: id },
    });
    return output;
  }

  //CHECKING EMAIL
  async checkEmail(email: string) {
    output = "";
    output = await User.findOne({
      where: {
        user_email: email,
      },
    });
    return output == null ? 0 : 1;
  }

  //CHECKING ALTERNATE EMAIL
  async checkAltEmail(email: string) {
    output = "";
    output = await User.findOne({
      where: {
        user_alternative_email: email,
      },
    });
    return output == null ? 0 : 1;
  }
}
