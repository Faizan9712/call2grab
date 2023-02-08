import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { login, changePassword,updateProfile } from "../controllers/AuthenticationController";
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

//UPDATE PROFILE
router.put(
  "/update-profile",
  isAuth,
  Validator("updateProfileSchema"),
  updateProfile
);

export default router;
