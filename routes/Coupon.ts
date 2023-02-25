import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getCoupons,
  getCoupon,
  addCoupon,
  updateCoupon,
  deleteCoupon,
  //   populateCoupons
} from "../controllers/CouponController";

dotenv.config();
const router: Express = express();

//GET ALL Coupons
router.get("/coupons", isAuth, getCoupons);

//GET Coupon BY ID
router.get("/coupon/:id", isAuth, getCoupon);

// ADD Coupon
router.post("/coupon", isAuth, Validator("addCouponSchema"), addCoupon);

// UPDATE Coupon
router.put(
  "/coupon/:id",
  isAuth,
  Validator("updateCouponSchema"),
  updateCoupon
);

//DELETE Coupon
router.delete("/coupon/:id", isAuth, deleteCoupon);

//POPULATE Coupons
// router.get("/populate-coupons", isAuth, populateCoupons);

export default router;
