import { QueryTypes } from "sequelize";
import Brand from "../models/Brand";
import dotenv from "dotenv";
import db from "../config/database";
import { pagination } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;

dotenv.config();

//BRAND SERVICE CLASS
export default class BrandService {
  //CASES FOR FILTERS AND POPULATES

  async brandCases(
    pageNo: number,
    orderBy: string,
    sortBy: string,
    query: any,
    filter: any,
    limit: any
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
      case "name":
        return await this.genQuery(
          pageNo,
          "brand_name",
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
          "brand_name",
          query
        );

      case "date":
        return await this.genQuery(
          pageNo,
          "brand_updated_date",
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
          "brand_active",
          "=",
          "1"
        );
      case "count":
        return Brand.count();

      default:
        return output == "" ? `No Brands Found` : output;
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
      brand.brand_id "brandId",
      brand.brand_name "brandName",
      brand.brand_description "brandDescription",
      brand.brand_active "brandActive",
      brand.brand_created_date "brandCreatedDate",
      brand.brand_updated_date "brandUpdatedDate" 
      FROM
      brand brand
 
  WHERE
    ${condVariable} ${operator} ${condValue}
    GROUP BY Brand_id
    ORDER BY ${orderBy}
    ${sortBy}
    LIMIT ${limit}
    OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No Brands Found` : output;
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
      brand.brand_id "brandId",
      brand.brand_name "brandName",
      brand.brand_description "brandDescription",
      brand.brand_active "brandActive",
      brand.brand_created_date "brandCreatedDate",
      brand.brand_updated_date "brandUpdatedDate" 
      FROM
      brand brand

  WHERE
  ${condVariable} LIKE "%${condValue}%"
    GROUP BY Brand_id
    ORDER BY ${orderBy}
    ${sortBy}
    LIMIT ${limit}
    OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No Brands Found` : output;
  }

  //GET BRAND BY ID
  async getBrand(id: number) {
    output = "";
    output = await Brand.findByPk(id);
    return output == "" || output == null
      ? `No Brand with id=${id} Found`
      : output;
  }

  //ADD BRAND
  async addBrand(body: any) {
    output = "";
    output = await Brand.create(body);
    return output == "" ? `Error occured` : output._previousDataValues;
  }

  //UPDATE BRAND
  async updateBrand(body: any, id: number) {
    output = "";
    output = await Brand.update(body, {
      where: { brand_id: id },
    });
    return output;
  }

  //DELETE BRAND
  async deleteBrand(id: number) {
    output = "";
    output = await Brand.destroy({
      where: { brand_id: id },
    });
    return output;
  }

  //PATH OF PHOTO IN DB
  async dbSetPath(fullfilename: any, id: number) {
    output = "";
    output = await Brand.update(
      { BrandImage: fullfilename },
      {
        where: { brandId: id },
      }
    ).then((output: any) => {
      return output;
    });
  }
}
