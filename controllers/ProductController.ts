import { Request, Response } from "express";
import ProductService from "../services/ProductService";
import { infoFromToken, sanitizeInput, uploadPic } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;
let querypm: number;
let photo: any;
let fullfilename: any;

//CREATING OBJECT
const productService = new ProductService();

//GET ALL PRODUCTS FUNCTION
// export async function getProducts(req: Request, res: Response) {
//   try {
//     output = "";
//     const { pageNo, orderBy, sortBy } = await sanitizeInput(req.query);
//     output = await productService
//       .getAllProducts(
//         pageNo == undefined ? 1 : pageNo,
//         orderBy == undefined ? "productId" : orderBy,
//         sortBy == undefined ? "ASC" : sortBy
//       )
//       .then((output: any) => {
//         if (typeof output === "string") {
//           res.status(200).json({ message: output });
//         } else {
//           res.status(200).json({ output: output });
//         }
//       })
//       .catch((error: any) => {
//         res.status(400).json({ output: "Something went wrong" });
//         console.log(error);
//       });
//   } catch (error) {
//     res.status(503).json({ output: "Something went wrong" });
//     console.log(error);
//   }
// }

//GET ALL PRODUCTS FUNCTION USING FILTERS AND SEARCH
export async function getProducts(req: Request, res: Response) {
  try {
    output = "";
    const { pageNo, orderBy, sortBy, query, filter } = await sanitizeInput(
      req.query
    );
    output = await productService
      .productCases(
        pageNo == undefined ? 1 : pageNo,
        orderBy == undefined ? "productId" : orderBy,
        sortBy == undefined ? "ASC" : sortBy,
        query,
        filter == undefined ? "all" : filter
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
    const information: any = await infoFromToken(req);
    req.body["productEntryId"] = information.id;
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
    const information: any = await infoFromToken(req);
    req.body["productModifiedId"] = information.id;
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
    const productId = await sanitizeInput(req.query.id);
    let count = 0;
    if (req.files === null || req.files === undefined) {
      res.status(403).json({ message: "Please select image" });
    } else {
      while (req.files.photo[count]) {
        photo = req.files.photo[count];
        fullfilename = await uploadPic(res, photo);
        if (fullfilename) {
          await productService.dbSetPath(fullfilename, productId);
          count++;
          if (req.files.photo[count] == undefined)
            res.status(200).json({ Message: "Image Uploaded Successfullly " });
          console.log("Image Uploaded Successfullly ");
        }
      }
    }
  } catch (error) {
    res.status(500).json({ Message: "Something went wrong " });
    console.log("Error :  " + error);
  }
}
