import path from "path";
import { col, fn, json, Op, QueryTypes, Sequelize } from "sequelize";
import Coupon from "../models/Coupon";
import dotenv from "dotenv";
import db from "../config/database";
import { pagination } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;
let queryPm: number;

dotenv.config();

//Coupon SERVICE CLASS
export default class CouponService {
  //GET ALL CouponS
  async getAllCoupons(pageNo: number, orderBy: string, sortBy: string) {
    output = "";
    output = await Coupon.findAll({
      raw: true,
      order: [[orderBy, sortBy]],
      limit: 10,
      offset: await pagination(pageNo),
    });
    return output == "" ? "No Coupons Found" : output;
  }

  //GET Coupon BY ID
  async getCoupon(id: number) {
    output = "";
    output = await Coupon.findByPk(id);
    return output == "" || output == null
      ? `No Coupon with id=${id} Found`
      : output;
  }

  //ADD Coupon
  async addCoupon(body: any) {
    output = "";
    output = await Coupon.create(body);
    return output == "" ? `Error occured` : output._previousDataValues;
  }

  //UPDATE Coupon
  async updateCoupon(body: any, id: number) {
    output = "";
    output = await Coupon.update(body, {
      where: { couponId: id },
    });
    return output;
  }

  //DELETE Coupon
  async deleteCoupon(id: number) {
    output = "";
    output = await Coupon.destroy({
      where: { couponId: id },
    });
    return output;
  }

  //POPULATE Coupon
  async populateCoupon(qpm: any) {
    output = "";
    output = await Coupon.findAll({
      where: { couponName: { [Op.like]: `%${qpm}%` } },
      limit: 10,
    });
    return output == "" ? "No Coupons Found" : output;
  }
}
