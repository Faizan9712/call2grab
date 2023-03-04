import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import {
  login,
  changePassword,
  updateProfile,
  getAdmin,
} from "../controllers/AuthenticationController";
import Validator from "../middlewares/Validator";
import isAuth from "../middlewares/CheckJWT";

dotenv.config();
const router: Express = express();

//LOGIN
router.post("/login", Validator("loginSchema"), login);

//CHANGE PASSWORD
router.post(
  "/change-pw",
  isAuth,
  Validator("changePasswordSchema"),
  changePassword
);

//GET CATEGORY BY ID
router.get("/admin", isAuth, getAdmin);

//UPDATE PROFILE
router.put(
  "/update-profile",
  isAuth,
  Validator("updateProfileSchema"),
  updateProfile
);

export default router;
