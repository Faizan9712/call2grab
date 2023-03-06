import path from "path";
import { col, fn, json, Op, or, QueryTypes, Sequelize } from "sequelize";
import Payment from "../models/Payment";
import dotenv from "dotenv";
import db from "../config/database";
import { pagination } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;
let queryPm: number;

dotenv.config();

//Payment SERVICE CLASS
export default class PaymentService {
  //CASES FOR FILTERS AND POPULATES

  async paymentCases(
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
          "Payment_name",
          sortBy,
          limit,
          "1",
          "=",
          "1"
        );

    //   case query:
    //     return await this.likeQuery(
    //       pageNo,
    //       orderBy,
    //       sortBy,
    //       limit,
    //       "payment_name",
    //       query
    //     );

      case "date":
        return await this.genQuery(
          pageNo,
          "payment_updated_date",
          "DESC",
          limit,
          "1",
          "=",
          "1"
        );
    //   case "active":
    //     return await this.genQuery(
    //       pageNo,
    //       orderBy,
    //       sortBy,
    //       limit,
    //       "Payment_active",
    //       "=",
    //       "1"
    //     );
      case "count":
        return Payment.count();

      default:
        return output == "" ? `No Payments Found` : output;
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
      payment.payment_id "paymentId", 
      payment.payment_order_id "paymentOrderId", 
      payment.payment_product_id "paymentProductId", 
      payment.payment_user_id "paymentUserId", 
      payment.payment_amount "paymentAmount", 
      payment.payment_status "paymentStatus", 
      payment.payment_method "paymentMethod", 
      payment.payment_transaction_id "paymentTransactionId", 
      payment.payment_card_holder_name "paymentCardHolderName", 
      payment.payment_card_last4_digits "paymentCardLast4Digits", 
      payment.payment_card_cvv "paymentCardCvv", 
      payment.payment_created_date "paymentCreatedDate", 
      payment.payment_updated_date "paymentUpdatedDate"
  FROM
      payment payment
  WHERE
    ${condVariable} ${operator} ${condValue}
    GROUP BY payment_id
    ORDER BY ${orderBy}
    ${sortBy}
    LIMIT ${limit}
    OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No Payments Found` : output;
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
	payment.payment_id, 
	payment.payment_order_id, 
	payment.payment_product_id, 
	payment.payment_user_id, 
	payment.payment_amount, 
	payment.payment_status, 
	payment.payment_method, 
	payment.payment_transaction_id, 
	payment.payment_card_holder_name, 
	payment.payment_card_last4_digits, 
	payment.payment_card_cvv, 
	payment.payment_created_date, 
	payment.payment_updated_date
FROM
	payment payment

  WHERE
  ${condVariable} LIKE "%${condValue}%"
    GROUP BY payment_id
    ORDER BY ${orderBy}
    ${sortBy}
    LIMIT ${limit}
    OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No Payments Found` : output;
  }

  //GET Payment BY ID
  async getPayment(id: number) {
    output = "";
    output = await Payment.findByPk(id);
    return output == "" || output == null
      ? `No Payment with id=${id} Found`
      : output;
  }

  //ADD Payment
  async addPayment(body: any) {
    output = "";
    output = await Payment.create(body);
    return output == "" ? `Error occured` : output._previousDataValues;
  }

  //UPDATE Payment
  async updatePayment(body: any, id: number) {
    output = "";
    output = await Payment.update(body, {
      where: { payment_id: id },
    });
    return output;
  }

  //DELETE Payment
  async deletePayment(id: number) {
    output = "";
    output = await Payment.destroy({
      where: { payment_id: id },
    });
    return output;
  }

  //POPULATE Payment
  async populatePayments(qpm: any) {
    output = "";
    output = await Payment.findAll({
      where: { PaymentName: { [Op.like]: `%${qpm}%` } },
      limit: 10,
    });
    return output == "" ? "No Payments Found" : output;
  }
}
