import { Request, Response } from "express";
import BrandService from "../services/BrandService";
import { sanitizeInput } from "../helpers/functions";

//INSTANCE VARIABLES

let output: any;
let querypm: number;

//CREATING OBJECT
const brandService = new BrandService();

//GET ALL BRANDS
export async function getBrands(req: Request, res: Response) {
  try {
    output = "";
    const { pageNo, orderBy, sortBy, query, filter, limit } =
      await sanitizeInput(req.query);
    output = await brandService
      .brandCases(
        pageNo == undefined ? 1 : pageNo,
        orderBy == undefined ? "brandId" : orderBy,
        sortBy == undefined ? "DESC" : sortBy,
        query,
        filter == undefined ? "all" : filter,
        limit == undefined ? 10 : limit
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

//GET Brand BY ID
export async function getBrand(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(Number(req.params.id));

    output = await brandService
      .getBrand(querypm)
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

//ADD Brand
export async function addBrand(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(req.body);
    output = await brandService
      .addBrand(querypm)
      .then((output: any) => {
        if (typeof output === "string") {
          res.status(200).json({ message: output });
        } else {
          res.status(200).json({ output: output });
        }
      })
      .catch((error: any) => {
        res.status(400).json({ message: "Invalid input" });
        console.log(error);
      });
  } catch (error) {
    res.status(503).json({ output: "Something went wrong" });
    console.log(error);
  }
}

//UPDATE Brand
export async function updateBrand(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(req.body);
    const id = await sanitizeInput(Number(req.params.id));
    let result = await brandService.getBrand(id);
    if (typeof result == "string") {
      res.status(400).json({ message: result });
    } else {
      output = await brandService
        .updateBrand(querypm, id)
        .then((output: any) => {
          if (output[0] === 0) {
            res.status(200).json({ message: "Already Updated" });
          } else {
            res.status(200).json({ message: "Brand Updated Successfully" });
          }
        })
        .catch((error: any) => {
          res.status(400).json({ message: "Invalid input" });
          console.log(error);
        });
    }
  } catch (error) {
    res.status(503).json({ output: "Something went wrong" });
    console.log(error);
  }
}

//DELETE Brand
export async function deleteBrand(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(Number(req.params.id));
    let result = await brandService.getBrand(querypm);
    if (typeof result == "string") {
      res.status(400).json({ message: result });
    } else {
      output = await brandService
        .deleteBrand(querypm)
        .then((output: any) => {
          res.status(200).json({ message: "Brand Deleted Successfully" });
        })
        .catch((error: any) => {
          res.status(400).json({ message: "Invalid input" });
          console.log(error);
        });
    }
  } catch (error) {
    res.status(503).json({ output: "Something went wrong" });
    console.log(error);
  }
}
