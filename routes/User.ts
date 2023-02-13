import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  changeUserPasssword,
  deactivateUser,
} from "../controllers/UserController";

dotenv.config();
const router: Express = express();

//GET ALL USER
router.get("/users", isAuth, getUsers);

//GET USER BY ID
router.get("/user/:id", isAuth, getUser);

// ADD USER
router.post("/user", isAuth, Validator("addUserSchema"), addUser);

// ADD USER
router.put(
  "/change-userpassword/:id",
  isAuth,
  Validator("changeUserPasswordSchema"),
  changeUserPasssword
);

// ADD USER
router.put(
  "/change-userstatus/:id",
  isAuth,
  Validator("deactivateUserSchema"),
  deactivateUser
);

//UPDATE USER
router.put("/user/:id", isAuth, Validator("updateUserSchema"), updateUser);

//DELETE User
router.delete("/User/:id", isAuth, deleteUser);

export default router;
