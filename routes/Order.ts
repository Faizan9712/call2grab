import express, { Express } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getOrders,
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/OrderController";

dotenv.config();
const router: Express = express();

//GET ALL ORDERS
router.get("/orders", isAuth, getOrders);

//GET ORDER BY ID
router.get("/order/:id", isAuth, getOrder);

// ADD ORDER
router.post("/order", isAuth, Validator("addOrderSchema"), addOrder);

// UPDATE ORDER
router.put("/order/:id", isAuth, Validator("updateOrderSchema"), updateOrder);

//DELETE ORDER
router.delete("/order/:id", isAuth, deleteOrder);

export default router;
