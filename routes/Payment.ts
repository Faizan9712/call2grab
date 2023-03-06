import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getPayments,
  getPayment,
  addPayment,
  updatePayment,
  deletePayment,
  //   populatePayments
} from "../controllers/PaymentController";

dotenv.config();
const router: Express = express();

//GET ALL Payments
router.get("/payments", isAuth, getPayments);

//GET Payment BY ID
router.get("/payment/:id", isAuth, getPayment);

// ADD Payment
router.post("/payment", isAuth, Validator("addPaymentSchema"), addPayment);

// UPDATE Payment
router.put(
  "/payment/:id",
  isAuth,
  Validator("updatePaymentSchema"),
  updatePayment
);

//DELETE Payment
router.delete("/payment/:id", isAuth, deletePayment);

export default router;
