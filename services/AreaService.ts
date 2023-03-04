import path from "path";
import { col, fn, json, Op, or, QueryTypes, Sequelize } from "sequelize";
import Area from "../models/Area";
import dotenv from "dotenv";
import db from "../config/database";
import { pagination } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;
let queryPm: number;

dotenv.config();

//AREA SERVICE CLASS
export default class AreaService {
  //CASES FOR FILTERS AND POPULATES

  async areaCases(
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
          "area_name",
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
          "area_name",
          query
        );

      case "date":
        return await this.genQuery(
          pageNo,
          "area_updated_date",
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
          "area_active",
          "=",
          "1"
        );
      case "count":
        return Area.count();

      default:
        return output == "" ? `No Areas Found` : output;
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
    area.area_id "areaId",
    area.area_name "areaName",
    area.area_description "areaDescription",
    area.area_parent_id "areaParentId",
    area.area_pincode "areaPincode",
    area.area_active "areaActive",
    area.area_created_date "areaCreatedDate",
    area.area_updated_date "areaUpdatedDate"
  FROM
  area area
  WHERE
    ${condVariable} ${operator} ${condValue}
    GROUP BY area_id
    ORDER BY ${orderBy}
    ${sortBy}
    LIMIT ${limit}
    OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No Areas Found` : output;
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
      area.area_id "areaId",
      area.area_name "areaName",
      area.area_description "areaDescription",
      area.area_parent_id "areaParentId",
      area.area_pincode "areaPincode",
      area.area_active "areaActive",
      area.area_created_date "areaCreatedDate",
      area.area_updated_date "areaUpdatedDate"
    FROM
    area area

  WHERE
  ${condVariable} LIKE "%${condValue}%"
    GROUP BY area_id
    ORDER BY ${orderBy}
    ${sortBy}
    LIMIT ${limit}
    OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No Areas Found` : output;
  }

  //GET area BY ID
  async getArea(id: number) {
    output = "";
    output = await Area.findByPk(id);
    return output == "" || output == null
      ? `No area with id=${id} Found`
      : output;
  }

  //ADD area
  async addArea(body: any) {
    output = "";
    output = await Area.create(body);
    return output == "" ? `Error occured` : output._previousDataValues;
  }

  //UPDATE area
  async updateArea(body: any, id: number) {
    output = "";
    output = await Area.update(body, {
      where: { area_id: id },
    });
    return output;
  }

  //DELETE area
  async deleteArea(id: number) {
    output = "";
    output = await Area.destroy({
      where: { area_id: id },
    });
    return output;
  }

  //POPULATE area
  async populateAreas(qpm: any) {
    output = "";
    output = await Area.findAll({
      where: { areaName: { [Op.like]: `%${qpm}%` } },
      limit: 10,
    });
    return output == "" ? "No Areas Found" : output;
  }
}
