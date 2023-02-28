import { QueryTypes } from "sequelize";
import dotenv from "dotenv";
import { pagination } from "../helpers/functions";
import db from "../config/database";

//INSTANCE VARIABLES
let output: any;
let queryPm: number;

dotenv.config();

export default class BrandService {
  //GET ALL BRANDS
  async getAllBrands(
    pageNo: number,
    orderBy: string,
    sortBy: string,
    limit: number
  ) {
    output = "";
    output = await db.query(
      `SELECT
      brand.brand_id "brandId",
      brand.brand_name "brandName",
      brand.brand_description "brandDescription",
      brand.brand_created_date "brandCreatedDate",
      brand.brand_updated_date "brandUpdatedDate" 
    FROM
    brand brand
    WHERE
      1=1
      ORDER BY ${orderBy}
      ${sortBy}
      LIMIT ${limit}
      OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? "No Brands Found" : output;
  }
}
