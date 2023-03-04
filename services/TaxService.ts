import path from "path";
import { col, fn, json, Op, or, QueryTypes, Sequelize } from "sequelize";
import Tax from "../models/Tax";
import dotenv from "dotenv";
import db from "../config/database";
import { pagination } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;
let queryPm: number;

dotenv.config();

//Tax SERVICE CLASS
export default class TaxService {
  //CASES FOR FILTERS AND POPULATES

  async taxCases(
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
          "tax_name",
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
          "tax_name",
          query
        );

      case "date":
        return await this.genQuery(
          pageNo,
          "tax_updated_date",
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
          "tax_active",
          "=",
          "1"
        );
      case "count":
        return Tax.count();

      default:
        return output == "" ? `No Taxes Found` : output;
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
      tax.tax_id "taxId",
      tax.tax_name "taxName",
      tax.tax_rate "taxRate",
      tax.tax_city_code "taxCityCode",
      tax.tax_active "taxActive",
      tax.tax_created_date "taxCreatedDate",
      tax.tax_updated_date "taxUpdatedDate"
    FROM
    tax tax
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
    return output == "" ? `No Taxes Found` : output;
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
      tax.tax_id "taxId",
      tax.tax_name "taxName",
      tax.tax_rate "taxRate",
      tax.tax_city_code "taxCityCode",
      tax.tax_active "taxActive",
      tax.tax_created_date "taxCreatedDate",
      tax.tax_updated_date "taxUpdatedDate"
    FROM
    tax tax

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
    return output == "" ? `No Taxes Found` : output;
  }

  //GET Tax BY ID
  async getTax(id: number) {
    output = "";
    output = await Tax.findByPk(id);
    return output == "" || output == null
      ? `No Tax with id=${id} Found`
      : output;
  }

  //ADD Tax
  async addTax(body: any) {
    output = "";
    output = await Tax.create(body);
    return output == "" ? `Error occured` : output._previousDataValues;
  }

  //UPDATE Tax
  async updateTax(body: any, id: number) {
    output = "";
    output = await Tax.update(body, {
      where: { tax_id: id },
    });
    return output;
  }

  //DELETE Tax
  async deleteTax(id: number) {
    output = "";
    output = await Tax.destroy({
      where: { tax_id: id },
    });
    return output;
  }

  //POPULATE Tax
  async populateTaxs(qpm: any) {
    output = "";
    output = await Tax.findAll({
      where: { taxName: { [Op.like]: `%${qpm}%` } },
      limit: 10,
    });
    return output == "" ? "No Taxs Found" : output;
  }
}
