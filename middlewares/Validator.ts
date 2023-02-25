import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
//* Include all validators
// import  Validators from'../Validators';
const Validators = require("../schema/GeneralSchema");
export default function async(validator: any) {
  // If validator is not exist, throw err
  if (!Validators.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator doesn't not exist`);
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const validated = await Validators[validator].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err: any) {
      //* Pass err to next
      // If validation error occurs call next with HTTP 422. Otherwise HTTP 500
      if (err.isJoi) {
        return next(createHttpError(422, { message: err.message }));
      }
      next(createHttpError(500));
    }
  };
}
