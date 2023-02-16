import { Request, Response } from "express";
import ParentCategoryService from "../services/ParentCategoryService";
import { sanitizeInput } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;
let querypm: number;

//CREATING OBJECT
const parentCategoryService = new ParentCategoryService();

//GET ALL parentCategoryS FUNCTION
export async function getParentCategorys(req: Request, res: Response) {
  try {
    output = "";
    const { pageNo, orderBy, sortBy } = await sanitizeInput(req.query);
    output = await parentCategoryService
      .getAllParentCategorys(
        pageNo == undefined ? 1 : pageNo,
        orderBy == undefined ? "parentCategoryId" : orderBy,
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

//GET parentCategory BY ID
export async function getParentCategory(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(Number(req.params.id));
    output = await parentCategoryService
      .getParentCategory(querypm)
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

//ADD parentCategory
export async function addParentCategory(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(req.body);
    output = await parentCategoryService
      .addParentCategory(querypm)
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

//UPDATE parentCategory
export async function updateParentCategory(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(req.body);
    const id = await sanitizeInput(Number(req.params.id));
    let result = await parentCategoryService.getParentCategory(id);
    if (result == null) {
      res.status(400).json({ message: "ParentCategory doesn't exist" });
    } else {
      output = await parentCategoryService
        .updateParentCategory(querypm, id)
        .then((output: any) => {
          if (output[0] === 0) {
            res.status(200).json({ message: "Already Updated" });
          } else {
            res
              .status(200)
              .json({ message: "Parent Category Updated Successfully" });
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

//DELETE parentCategory
export async function deleteParentCategory(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(Number(req.params.id));
    let result = await parentCategoryService.getParentCategory(querypm);
    if (result == null) {
      res.status(400).json({ message: "parentCategory doesn't exist" });
    } else {
      output = await parentCategoryService
        .deleteParentCategory(querypm)
        .then((output: any) => {
          res
            .status(200)
            .json({ message: "Parent Category Deleted Successfully" });
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

//POPULATE CATEGORIES
export async function populateParentCategories(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(req.query.qpm);
    output = await parentCategoryService
      .populateParentCategories(querypm)
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
