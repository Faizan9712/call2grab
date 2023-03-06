import path from "path";
import { col, fn, json, Op, or, QueryTypes, Sequelize } from "sequelize";
import Refund from "../models/Refund";
import dotenv from "dotenv";
import db from "../config/database";
import { pagination } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;
let queryPm: number;

dotenv.config();

//Refund SERVICE CLASS
export default class RefundService {
  //CASES FOR FILTERS AND POPULATES

  async refundCases(
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
          "refund_name",
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
          "refund_name",
          query
        );

      case "date":
        return await this.genQuery(
          pageNo,
          "refund_updated_date",
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
          "refund_active",
          "=",
          "1"
        );
      case "count":
        return Refund.count();

      default:
        return output == "" ? `No Refunds Found` : output;
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
      refund.refund_id "refundId", 
      refund.refund_user_id "refundUserId", 
      refund.refund_order_id "refundOrderId", 
      refund.refund_amount "refundAmount", 
      refund.refund_reason "refundReason", 
      refund.refund_status "refundStatus", 
      refund.refund_method "refundMethod", 
      refund.refund_created_date "refundCreatedDate", 
      refund.refund_updated_date "refundUpdatedDate"
  FROM
      refund refund
  WHERE
    ${condVariable} ${operator} ${condValue}
    GROUP BY refund_id
    ORDER BY ${orderBy}
    ${sortBy}
    LIMIT ${limit}
    OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No Refunds Found` : output;
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
      refund.refund_id "refundId", 
      refund.refund_user_id "refundUserId", 
      refund.refund_order_id "refundOrderId", 
      refund.refund_amount "refundAmount", 
      refund.refund_reason "refundReason", 
      refund.refund_status "refundStatus", 
      refund.refund_method "refundMethod", 
      refund.refund_created_date "refundCreatedDate", 
      refund.refund_updated_date "refundUpdatedDate"
  FROM
      refund refund

  WHERE
  ${condVariable} LIKE "%${condValue}%"
    GROUP BY refund_id
    ORDER BY ${orderBy}
    ${sortBy}
    LIMIT ${limit}
    OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No Refunds Found` : output;
  }

  //GET Refund BY ID
  async getRefund(id: number) {
    output = "";
    output = await Refund.findByPk(id);
    return output == "" || output == null
      ? `No Refund with id=${id} Found`
      : output;
  }

  //ADD Refund
  async addRefund(body: any) {
    output = "";
    output = await Refund.create(body);
    return output == "" ? `Error occured` : output._previousDataValues;
  }

  //UPDATE Refund
  async updateRefund(body: any, id: number) {
    output = "";
    output = await Refund.update(body, {
      where: { refund_id: id },
    });
    return output;
  }

  //DELETE Refund
  async deleteRefund(id: number) {
    output = "";
    output = await Refund.destroy({
      where: { refund_id: id },
    });
    return output;
  }

  //POPULATE Refund
  async populateRefunds(qpm: any) {
    output = "";
    output = await Refund.findAll({
      where: { refundName: { [Op.like]: `%${qpm}%` } },
      limit: 10,
    });
    return output == "" ? "No Refunds Found" : output;
  }
}
