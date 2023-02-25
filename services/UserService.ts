import path from "path";
import { col, fn, json, Op, QueryTypes, Sequelize } from "sequelize";
import User from "../models/User";
import dotenv from "dotenv";

import { pagination } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;
let queryPm: number;

dotenv.config();

//User SERVICE CLASS
export default class UserService {
  //GET ALL UserS
  async getAllUsers(pageNo: number, orderBy: string, sortBy: string) {
    output = "";
    output = await User.findAll({
      where: {
        // user_active: 1,
      },
      order: [[orderBy, sortBy]],

      limit: 10,
      offset: await pagination(pageNo),
    });
    return output == "" || output == null ? "No Users Found" : output;
  }

  //GET User BY ID
  async getUser(id: number) {
    output = "";
    output = await User.findByPk(id);
    return output == "" || output == null
      ? `No User with id=${id} Found`
      : output;
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
    // console.log("Error : ", body);
    output = await User.update(body, {
      where: { user_id: id },
    });
    return output;
  }

  //DELETE User
  async deleteUser(id: number) {
    output = "";
    output = await User.destroy({
      where: { user_id: id },
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

  //PATH OF PHOTO IN DB
  async dbSetPath(fullfilename: any, id: number) {
    output = "";
    output = await User.update(
      { userPhoto: fullfilename },
      {
        where: { userId: id },
      }
    ).then((output: any) => {
      return output;
    });
  }
}
