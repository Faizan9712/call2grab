import { Request, Response } from "express";
import CartService from "../services/CartService";
import { infoFromToken, sanitizeInput } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;

//CREATING OBJECT
const cartService = new CartService();

//GET ALL PRODUCTS OF CART FUNCTION
export async function getProductInCart(req: Request, res: Response) {
  try {
    output = "";
    const { pageNo, orderBy, sortBy } = await sanitizeInput(req.query);
    output = await cartService
      .getAllProducts(
        pageNo == undefined ? 1 : pageNo,
        orderBy == undefined ? "cartId" : orderBy,
        sortBy == undefined ? "ASC" : sortBy
      )
      .then((output: any) => {
        if (typeof output === "string") {
          res.status(200).json({ message: output });
        } else {
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
