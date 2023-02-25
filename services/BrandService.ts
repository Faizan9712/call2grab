import { QueryTypes } from "sequelize";
import dotenv from "dotenv";
import { pagination } from "../helpers/functions";
import db from "../config/database";

//INSTANCE VARIABLES
let output: any;
let queryPm: number;

dotenv.config();

//GET brand OF USER SERVICE CLASS
export default class BrandService {
  //GET ALL ProductS
  async getAllBrands(pageNo: number, orderBy: string, sortBy: string) {
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
      LIMIT 10
      OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? "No Brands Found" : output;
  }
}
