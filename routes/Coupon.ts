import express, { Express } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getCoupons,
  getCoupon,
  addCoupon,
  updateCoupon,
  deleteCoupon,
} from "../controllers/CouponController";

dotenv.config();
const router: Express = express();

//GET ALL COUPONS
router.get("/coupons", isAuth, getCoupons);

//GET COUPON BY ID
router.get("/coupon/:id", isAuth, getCoupon);

// ADD COUPON
router.post("/coupon", isAuth, Validator("addCouponSchema"), addCoupon);

// UPDATE COUPON
router.put(
  "/coupon/:id",
  isAuth,
  Validator("updateCouponSchema"),
  updateCoupon
);

//DELETE COUPON
router.delete("/coupon/:id", isAuth, deleteCoupon);

export default router;
