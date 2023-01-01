import { Request, Response } from "express";
import ProductService from "../services/ProductService";
import { sanitizeInput } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;
let querypm: number;

//CREATING OBJECT
const productService = new ProductService();

//GET ALL PRODUCTS FUNCTION
export async function getProducts(req: Request, res: Response) {
  try {
    output = "";
    output = await productService
      .getAllProducts()
      .then((output: any) => {
        if (typeof output === "string") {
          console.log("====message");
          res.status(200).json({ message: output });
        } else {
          console.log("=====op");
          res.status(200).json({ output: output });
        }
      })
      .catch((error: any) => {
        res.status(400).json({ output: "Something went wrong" });
        console.log(error);
      });
  } catch (error) {
    res.status(503).json({ output: "Something went wrong" });
    console.log(error);
  }
}

//GET PRODUCT BY ID
export async function getProduct(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(Number(req.params.id));
    output = await productService
      .getProduct(querypm)
      .then((output: any) => {
        if (typeof output === "string") {
          res.status(200).json({ message: output });
        } else {
          res.status(200).json({ output: output });
        }
      })
      .catch((error: any) => {
        res.status(400).json({ message: "Something went wrong" });
        console.log(error);
      });
  } catch (error) {
    res.status(503).json({ output: "Something went wrong" });
    console.log(error);
  }
}
