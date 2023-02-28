import path from "path";
import { col, fn, json, Op, QueryTypes, Sequelize } from "sequelize";
import User from "../models/User";
import dotenv from "dotenv";

import { pagination } from "../helpers/functions";
import db from "../config/database";

//INSTANCE VARIABLES
let output: any;
let queryPm: number;

dotenv.config();

//User SERVICE CLASS
export default class UserService {
  //GET ALL UserS
  async getAllUsers(
    pageNo: number,
    orderBy: string,
    sortBy: string,
    query: any,
    filter: any,
    limit: number
  ) {
    output = "";

    output = await db.query(
      `SELECT
    user_id AS userId,
    user_first_name  userFirstName,
    user_middle_name AS userMiddleName,
    user_last_name AS userLastName,
    user_email AS userEmail,
    user_alternative_email AS userAlternativeEmail,
    user_password AS userPassword,
    user_photo AS userPhoto,
    user_present_address AS userPresentAddress,
    user_permanent_address AS userPermanentAddress,
    user_pincode AS userPincode,
    user_string AS userState,
    user_city AS userCity,
    user_phone_number AS userPhoneNumber,
    user_mobile_number AS userMobileNumber,
    user_gender AS userGender,
    user_dob AS userDob,
    user_active AS userActive,
    user_last_login AS userLastLogin,
    user_created_date AS userCreatedDate,
    user_updated_date AS userUpdatedDate
    FROM
	users AS User 
  ORDER BY ${orderBy}
  ${sortBy}
  LIMIT ${limit}
  OFFSET ${await pagination(pageNo)}`,
      {
        type: QueryTypes.SELECT,
      }
    );
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

  async userCases(
    pageNo: number,
    orderBy: string,
    sortBy: string,
    query: any,
    filter: any,
    limit: number
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

      case query:
        return await this.likeQuery(
          pageNo,
          orderBy,
          sortBy,
          limit,
          "user_first_name",
          query
        );

      case "date":
        return await this.genQuery(
          pageNo,
          "user_updated_date",
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
          "user_active",
          "=",
          "1"
        );
      case "inactive":
        return await this.genQuery(
          pageNo,
          orderBy,
          sortBy,
          limit,
          "user_active",
          "!=",
          "1"
        );

      case "count":
        return await User.count();

      default:
        return output == "" ? `No Users Found` : output;
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
      user_id AS userId,
      user_first_name  userFirstName,
      user_middle_name AS userMiddleName,
      user_last_name AS userLastName,
      user_email AS userEmail,
      user_alternative_email AS userAlternativeEmail,
      user_password AS userPassword,
      user_photo AS userPhoto,
      user_present_address AS userPresentAddress,
      user_permanent_address AS userPermanentAddress,
      user_pincode AS userPincode,
      user_string AS userState,
      user_city AS userCity,
      user_phone_number AS userPhoneNumber,
      user_mobile_number AS userMobileNumber,
      user_gender AS userGender,
      user_dob AS userDob,
      user_active AS userActive,
      user_last_login AS userLastLogin,
      user_created_date AS userCreatedDate,
      user_updated_date AS userUpdatedDate
      FROM
    users AS User 
  WHERE
    ${condVariable} ${operator} ${condValue}
    ORDER BY ${orderBy}
    ${sortBy}
    LIMIT ${limit}
    OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No Users Found` : output;
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
      user_id AS userId,
      user_first_name  userFirstName,
      user_middle_name AS userMiddleName,
      user_last_name AS userLastName,
      user_email AS userEmail,
      user_alternative_email AS userAlternativeEmail,
      user_password AS userPassword,
      user_photo AS userPhoto,
      user_present_address AS userPresentAddress,
      user_permanent_address AS userPermanentAddress,
      user_pincode AS userPincode,
      user_string AS userState,
      user_city AS userCity,
      user_phone_number AS userPhoneNumber,
      user_mobile_number AS userMobileNumber,
      user_gender AS userGender,
      user_dob AS userDob,
      user_active AS userActive,
      user_last_login AS userLastLogin,
      user_created_date AS userCreatedDate,
      user_updated_date AS userUpdatedDate
      FROM
    users AS User 
    WHERE
    ${condVariable} LIKE "%${condValue}%"
    ORDER BY ${orderBy}
    ${sortBy}
    LIMIT ${limit}
    OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No Users Found` : output;
  }
}
