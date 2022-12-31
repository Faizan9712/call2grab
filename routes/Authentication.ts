import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { login } from "../controllers/AuthenticationController";
import Validator from "../middlewares/Validator";

dotenv.config();
const router: Express = express();

//LOGIN
router.post("/login", Validator("loginSchema"), login);

export default router;
