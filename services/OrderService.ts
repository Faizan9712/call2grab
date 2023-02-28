import { col, fn, json, Op, QueryTypes, Sequelize } from "sequelize";
import Order from "../models/Order";
import dotenv from "dotenv";
import db from "../config/database";
import { pagination } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;
let queryPm: number;

dotenv.config();

//Order SERVICE CLASS
export default class OrderService {
  //CASES FOR FILTERS AND POPULATES
  async orderCases(
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
      case "featured":
        return await this.genQuery(
          pageNo,
          orderBy,
          sortBy,
          limit,
          "Order_featured_id",
          "=",
          "1"
        );

      case query:
        return await this.likeQuery(
          pageNo,
          orderBy,
          sortBy,
          limit,
          "Order_name",
          query
        );

      case "bestselling":
        break;
      case "date":
        return await this.genQuery(
          pageNo,
          "Order_updated_date",
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
          "Order_active",
          "=",
          "1"
        );
      case "inactive":
        return await this.genQuery(
          pageNo,
          orderBy,
          sortBy,
          limit,
          "=",
          "Order_active",
          "!1"
        );

      case "instock":
        return await this.genQuery(
          pageNo,
          orderBy,
          sortBy,
          limit,
          "Order_in_stock ",
          "!=",
          "0"
        );

      default:
        return output == "" ? `No Orders Found` : output;
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
      ord.order_id "orderId",
      ord.order_user_id "orderUserId",
      CONCAT(users.user_first_name, users.user_last_name) "userName",
      ord.order_coupon_id "orderCouponId",
      ord.order_status "orderStatus",
      ord.order_subtotal "orderSubtotal",
      ord.order_discount "orderDiscount",
      ord.order_total "orderTotal",
      ord.order_shipping_address "orderShippingAddress",
      ord.order_shipping_city "orderShippingCity",
      ord.order_billing_address "orderBillingAddress",
      ord.order_billing_city "orderBillingCity",
      ord.order_payment_method "orderPaymentMethod",
      ord.order_transaction_id "orderTransactionId",
      ord.order_tracking_number "orderTrackingNumber",
      ord.order_shipping_method "orderShippingMethod",
      ord.order_shipping_cost "orderShippingCost",
      ord.order_tax "orderTax",
      ord.order_created_date "orderCreatedDate",
      ord.order_updated_date "orderUpdatedDate"
    FROM
    orders ord
      LEFT JOIN users users ON users.user_id = ord.order_user_id 
    WHERE
      ${condVariable} ${operator} ${condValue}
      GROUP BY order_id
      ORDER BY ${orderBy}
      ${sortBy}
      LIMIT ${limit}
      OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No Orders Found` : output;
  }

  //GENERAL QUERY
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
      ord.order_id "orderId",
      ord.order_name "orderName",
      ord.order_status "orderStatus",
      ord.order_min_price "orderMinPrice",
      ord.order_max_price "orderMaxPrice",
      ord.order_quantity "orderQuantity",
      ord.order_rating_count "orderRatingCount",
      ord.order_average_rating "orderAverageRating",
      ord.order_total_sales "orderTotalSales",
      ord.order_category_id "orderCategoryId",
      category.category_name "orderCategoryName",
      ord.order_image_id "orderImageId",
      GROUP_CONCAT( image.order_image_name ) "orderImageName",
      ord.order_stock_quantity "orderStockQuantity",
      ord.order_in_stock "orderInStock",
      ord.order_onsale "orderOnsale",
      ord.order_active "orderActive",
      ord.order_brand_id "orderBrandId",
      ord.order_coupon_id "orderCouponId",
      ord.order_tax_id "orderTaxId",
      ord.order_shipping_id "orderShippingId",
      ord.order_featured_id "orderFeaturedId",
      ord.order_created_date "orderCreatedDate",
      ord.order_updated_date "orderUpdatedDate" 
    FROM
    temporder order
      LEFT JOIN image image ON image.order_image_id = ord.order_image_id
      LEFT JOIN category category ON category.category_id = ord.order_category_id 
    WHERE
    ${condVariable} LIKE "%${condValue}%"
      GROUP BY order_id
      ORDER BY ${orderBy}
      ${sortBy}
      LIMIT ${limit}
      OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No Orders Found` : output;
  }

  //GET ORDER BY ID
  async getOrder(id: number) {
    output = "";
    output = await db.query(
      `SELECT
      ord.order_id "orderId",
      ord.order_user_id "orderUserId",
      CONCAT(users.user_first_name, users.user_last_name) "userName",
      ord.order_coupon_id "orderCouponId",
      ord.order_status "orderStatus",
      ord.order_subtotal "orderSubtotal",
      ord.order_discount "orderDiscount",
      ord.order_total "orderTotal",
      ord.order_shipping_address "orderShippingAddress",
      ord.order_shipping_city "orderShippingCity",
      ord.order_billing_address "orderBillingAddress",
      ord.order_billing_city "orderBillingCity",
      ord.order_payment_method "orderPaymentMethod",
      ord.order_transaction_id "orderTransactionId",
      ord.order_tracking_number "orderTrackingNumber",
      ord.order_shipping_method "orderShippingMethod",
      ord.order_shipping_cost "orderShippingCost",
      ord.order_tax "orderTax",
      ord.order_created_date "orderCreatedDate",
      ord.order_updated_date "orderUpdatedDate"
    FROM
    orders ord
      LEFT JOIN users users ON users.user_id = ord.order_user_id 
    WHERE
      order_id = ${id}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" || output == null || output[0].orderId == null
      ? `No Order with id=${id} Found`
      : output;
  }

  //ADD Order
  async addOrder(body: any) {
    output = "";
    output = await Order.create(body);
    return output == "" ? `Error occured` : output;
  }

  //UPDATE Order
  async updateOrder(body: any, id: number) {
    output = "";
    output = await Order.update(body, {
      where: { Order_id: id },
    });
    return output;
  }

  //DELETE Order
  async deleteOrder(id: number) {
    output = "";
    output = await Order.destroy({
      where: { Order_id: id },
    });
    return output;
  }
}
