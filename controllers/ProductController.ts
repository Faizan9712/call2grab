import { Request, Response } from "express";
import ProductService from "../services/ProductService";
import { sanitizeInput, uploadPic } from "../helpers/functions";
import { string } from "joi";

//INSTANCE VARIABLES
let output: any;
let querypm: number;
let photo: any;
let fullfilename: any;

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

//ADD PRODUCT
export async function addProduct(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(req.body);
    output = await productService
      .addProduct(querypm)
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

//UPDATE PRODUCT
export async function updateProduct(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(req.body);
    const id = await sanitizeInput(Number(req.params.id));
    let result = await productService.getProduct(id);
    if (result == null) {
      res.status(400).json({ message: "Product doesn't exist" });
    } else {
      output = await productService
        .updateProduct(querypm, id)
        .then((output: any) => {
          if (output[0] === 0) {
            res.status(200).json({ message: "Already Updated" });
          } else {
            res.status(200).json({ message: "Product Updated Successfully" });
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

//DELETE PRODUCT

export async function deleteProduct(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(Number(req.params.id));
    let result = await productService.getProduct(querypm);
    if (result == null) {
      res.status(400).json({ message: "Product doesn't exist" });
    } else {
      output = await productService
        .deleteProduct(querypm)
        .then((output: any) => {
          res.status(200).json({ message: "Product Deleted Successfully" });
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

//UPLOAD PIC FUNCTION
export async function uploadProduct(req: any, res: Response) {
  try {
    // const userId = await getIdFromAuth(req);
    console.log("===1====", req.files);
    const productId = await sanitizeInput(req.query.id);
    // photo = "";

    if (req.files === null || req.files === undefined) {
      res.status(403).json({ message: "Please select image" });
    } else {
      photo = req.files.photo;
      console.log("====2===", photo);
      fullfilename = await uploadPic(res, photo);
      console.log("===3====", fullfilename);
      if (fullfilename) {
        await productService.dbSetPath(fullfilename, productId);
        res.status(200).json({ Message: "Image Uploaded Successfullly " });
        console.log("Image Uploaded Successfullly ");
      }
    }
  } catch (error) {
    console.log("Error :  " + error);
  }
}
