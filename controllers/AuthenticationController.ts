import { Request, Response } from "express";
import AuthenticationService from "../services/AuthenticationService";
import { sanitizeInput } from "../helpers/functions";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { DATE } from "sequelize";
import { PassThrough } from "stream";
import { any } from "joi";
import async from "../middlewares/Validator";

dotenv.config();

//INSTANCE VARIABLES
let output: any;
let jwtPrivateKey: any = process.env.jwtPrivateKey;

//CREATING OBJECT
const authenticationService = new AuthenticationService();

//LOGIN FUNCTION
export async function login(req: Request, res: Response) {
  try {
    const body = await sanitizeInput(req.body);
    await authenticationService
      .login(body.email, body.password)
      .then(async (output: any) => {
        if (output.flag == true) {
          //PAYLOAD FOR JWT TOKEN
          const jwtPayload: any = {
            id: output.result.adminId,
            email: output.result.adminEmail,
          };
          const token = jwt.sign(jwtPayload, jwtPrivateKey);
          res.status(200).json({ message: "Login Success", token: token });
        } else {
          //VERIFYING USER
          const flag = await authenticationService.checkEmailPassword(
            body.email,
            body.password
          );
          if (flag === true) {
            res.status(400).json({ message: "Incorrect Password" });
          } else {
            res.status(400).json({ message: "Email does not exist" });
          }
        }
      })
      .catch((error: any) => {
        res.status(400).json({ message: error.message });
        console.log(error);
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
}
