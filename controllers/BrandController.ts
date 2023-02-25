import { Request, Response } from "express";
import BrandService from "../services/BrandService";
import { sanitizeInput } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;

//CREATING OBJECT
const brandService = new BrandService();

//GET ALL BRANDS
export async function getBrands(req: Request, res: Response) {
  try {
    output = "";
    const { pageNo, orderBy, sortBy } = await sanitizeInput(req.query);
    output = await brandService
      .getAllBrands(
        pageNo == undefined ? 1 : pageNo,
        orderBy == undefined ? "brandId" : orderBy,
        sortBy == undefined ? "DESC" : sortBy
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
