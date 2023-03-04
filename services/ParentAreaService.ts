import path from "path";
import { col, fn, json, Op, or, QueryTypes, Sequelize } from "sequelize";
import ParentArea from "../models/ParentArea";
import dotenv from "dotenv";
import db from "../config/database";
import { pagination } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;
let queryPm: number;

dotenv.config();

//parentArea SERVICE CLASS
export default class ParentAreaService {
  //CASES FOR FILTERS AND POPULATES

  async parentAreaCases(
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
          "parentarea_name",
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
          "parentarea_name",
          query
        );

      case "date":
        return await this.genQuery(
          pageNo,
          "parentarea_updated_date",
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
          "parentarea_active",
          "=",
          "1"
        );
      case "count":
        return ParentArea.count();

      default:
        return output == "" ? `No parentAreas Found` : output;
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
    parentArea.parentarea_id "parentAreaId",
    parentArea.parentarea_name "parentAreaName",
    parentArea.parentarea_description "parentAreaDescription",
    parentArea.parentArea_active "parentAreaActive",
    parentArea.parentArea_created_date "parentAreaCreatedDate",
    parentArea.parentArea_updated_date "parentAreaUpdatedDate"
  FROM
  parent_area parentArea
  WHERE
    ${condVariable} ${operator} ${condValue}
    GROUP BY parentarea_id
    ORDER BY ${orderBy}
    ${sortBy}
    LIMIT ${limit}
    OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No parentAreas Found` : output;
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
      parentArea.parentarea_id "parentAreaId",
      parentArea.parentarea_name "parentAreaName",
      parentArea.parentarea_description "parentAreaDescription",
      parentArea.parentArea_active "parentAreaActive",
      parentArea.parentArea_created_date "parentAreaCreatedDate",
      parentArea.parentArea_updated_date "parentAreaUpdatedDate"
    FROM
    parent_area parentArea

  WHERE
  ${condVariable} LIKE "%${condValue}%"
    GROUP BY parentArea_id
    ORDER BY ${orderBy}
    ${sortBy}
    LIMIT ${limit}
    OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No Parent Areas Found` : output;
  }

  //GET parentArea BY ID
  async getParentArea(id: number) {
    output = "";
    output = await ParentArea.findByPk(id);
    return output == "" || output == null
      ? `No parentArea with id=${id} Found`
      : output;
  }

  //ADD parentArea
  async addParentArea(body: any) {
    output = "";
    output = await ParentArea.create(body);
    return output == "" ? `Error occured` : output._previousDataValues;
  }

  //UPDATE parentArea
  async updateParentArea(body: any, id: number) {
    output = "";
    output = await ParentArea.update(body, {
      where: { parentArea_id: id },
    });
    return output;
  }

  //DELETE parentArea
  async deleteParentArea(id: number) {
    output = "";
    output = await ParentArea.destroy({
      where: { parentArea_id: id },
    });
    return output;
  }

  //POPULATE parentArea
  async populateParentAreas(qpm: any) {
    output = "";
    output = await ParentArea.findAll({
      where: { parentAreaName: { [Op.like]: `%${qpm}%` } },
      limit: 10,
    });
    return output == "" ? "No Parent Areas Found" : output;
  }
}
