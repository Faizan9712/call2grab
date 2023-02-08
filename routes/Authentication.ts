import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { login,changePassword } from "../controllers/AuthenticationController";
import Validator from "../middlewares/Validator";
import isAuth from "../middlewares/CheckJWT";

dotenv.config();
const router: Express = express();

//LOGIN
router.post("/login", Validator("loginSchema"), login);

//HANGE PASSWORD
router.post("/change-pw",isAuth, Validator("changePasswordSchema"), changePassword);

export default router;
