import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getOrders,
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder,
//   populateOrders
} from "../controllers/OrderController";

dotenv.config();
const router: Express = express();

//GET ALL orders
router.get("/orders", isAuth, getOrders);

//GET order BY ID
router.get("/order/:id", isAuth, getOrder);

// ADD order
router.post("/order", isAuth, Validator("addOrderSchema"), addOrder);

// UPDATE order
router.put("/order/:id", isAuth, Validator("updateOrderSchema"), updateOrder);

//DELETE order
router.delete("/order/:id", isAuth, deleteOrder);

//POPULATE orders
// router.get("/populate-orders", isAuth, populateOrders);

export default router;
