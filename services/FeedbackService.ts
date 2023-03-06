import path from "path";
import { col, fn, json, Op, or, QueryTypes, Sequelize } from "sequelize";
import Feedback from "../models/Feedback";
import dotenv from "dotenv";
import db from "../config/database";
import { pagination } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;
let queryPm: number;

dotenv.config();

//Feedback SERVICE CLASS
export default class FeedbackService {
  //CASES FOR FILTERS AND POPULATES

  async feedbackCases(
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
          "feedback_name",
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
          "feedback_name",
          query
        );

      case "date":
        return await this.genQuery(
          pageNo,
          "feedback_updated_date",
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
          "feedback_active",
          "=",
          "1"
        );
      case "count":
        return Feedback.count();

      default:
        return output == "" ? `No Feedbacks Found` : output;
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
      feedback.feedback_id "feedbackId", 
      feedback.feedback_user_id "feedbackUserId", 
      feedback.feedback_order_id "feedbackOrderId", 
      feedback.feedback_product_id "feedbackProductId", 
      feedback.feedback_title "feedbackTitle", 
      feedback.feedback_rating "feedbackRating", 
      feedback.feedback_description "feedbackDescription", 
      feedback.feedback_recommend "feedbackRecommend", 
      feedback.feedback_verified_purchase "feedbackVerifiedPurchase", 
      feedback.feedback_created_date "feedbackCreatedDate", 
      feedback.feedback_updated_date "feedbackUpdatedDate"
  FROM
      feedback feedback
  WHERE
    ${condVariable} ${operator} ${condValue}
    GROUP BY feedback_id
    ORDER BY ${orderBy}
    ${sortBy}
    LIMIT ${limit}
    OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No Feedbacks Found` : output;
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
      feedback.feedback_id "feedbackId", 
      feedback.feedback_user_id "feedbackUserId", 
      feedback.feedback_order_id "feedbackOrderId", 
      feedback.feedback_product_id "feedbackProductId", 
      feedback.feedback_title "feedbackTitle", 
      feedback.feedback_rating "feedbackRating", 
      feedback.feedback_description "feedbackDescription", 
      feedback.feedback_recommend "feedbackRecommend", 
      feedback.feedback_verified_purchase "feedbackVerifiedPurchase", 
      feedback.feedback_created_date "feedbackCreatedDate", 
      feedback.feedback_updated_date "feedbackUpdatedDate"
  FROM
      feedback feedback
  WHERE
  ${condVariable} LIKE "%${condValue}%"
    GROUP BY feedback_id
    ORDER BY ${orderBy}
    ${sortBy}
    LIMIT ${limit}
    OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No Feedbacks Found` : output;
  }

  //GET Feedback BY ID
  async getFeedback(id: number) {
    output = "";
    output = await Feedback.findByPk(id);
    return output == "" || output == null
      ? `No Feedback with id=${id} Found`
      : output;
  }

  //ADD Feedback
  async addFeedback(body: any) {
    output = "";
    output = await Feedback.create(body);
    return output == "" ? `Error occured` : output._previousDataValues;
  }

  //UPDATE Feedback
  async updateFeedback(body: any, id: number) {
    output = "";
    output = await Feedback.update(body, {
      where: { Feedback_id: id },
    });
    return output;
  }

  //DELETE Feedback
  async deleteFeedback(id: number) {
    output = "";
    output = await Feedback.destroy({
      where: { Feedback_id: id },
    });
    return output;
  }

  //POPULATE Feedback
  async populateFeedbacks(qpm: any) {
    output = "";
    output = await Feedback.findAll({
      where: { FeedbackName: { [Op.like]: `%${qpm}%` } },
      limit: 10,
    });
    return output == "" ? "No Feedbacks Found" : output;
  }
}
