import express, { Express } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getPayments,
  getPayment,
  addPayment,
  updatePayment,
  deletePayment,
} from "../controllers/PaymentController";

dotenv.config();
const router: Express = express();

//GET ALL PAYMENTS
router.get("/payments", isAuth, getPayments);

//GET PAYMENT BY ID
router.get("/payment/:id", isAuth, getPayment);

// ADD PAYMENT
router.post("/payment", isAuth, Validator("addPaymentSchema"), addPayment);

// UPDATE PAYMENT
router.put(
  "/payment/:id",
  isAuth,
  Validator("updatePaymentSchema"),
  updatePayment
);

//DELETE PAYMENT
router.delete("/payment/:id", isAuth, deletePayment);

export default router;
