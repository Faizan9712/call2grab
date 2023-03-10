import { Request, Response } from "express";
import CategoryService from "../services/CategoryService";
import { sanitizeInput } from "../helpers/functions";
import { filePath } from "../helpers/functions";

//INSTANCE VARIABLES

let output: any;
let querypm: number;

//CREATING OBJECT
const categoryService = new CategoryService();

//GET ALL CATEGORIES
export async function getCategorys(req: Request, res: Response) {
  try {
    output = "";
    const { pageNo, orderBy, sortBy, query, filter, limit } =
      await sanitizeInput(req.query);
    output = await categoryService
      .categoryCases(
        pageNo == undefined ? 1 : pageNo,
        orderBy == undefined ? "categoryId" : orderBy,
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

//GET CATEGORY BY ID
export async function getCategory(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(Number(req.params.id));

    output = await categoryService
      .getCategory(querypm)
      .then((output: any) => {
        if (typeof output === "string") {
          // console.log("======", output);
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

//ADD CATEGORY
export async function addCategory(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(req.body);
    output = await categoryService
      .addCategory(querypm)
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

//UPDATE CATEGORY
export async function updateCategory(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(req.body);
    const id = await sanitizeInput(Number(req.params.id));
    let result = await categoryService.getCategory(id);
    if (typeof result == "string") {
      res.status(400).json({ message: result });
    } else {
      output = await categoryService
        .updateCategory(querypm, id)
        .then((output: any) => {
          if (output[0] === 0) {
            res.status(200).json({ message: "Already Updated" });
          } else {
            res.status(200).json({ message: "Category Updated Successfully" });
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

//DELETE CATEGORY
export async function deleteCategory(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(Number(req.params.id));
    let result = await categoryService.getCategory(querypm);
    if (typeof result == "string") {
      res.status(400).json({ message: result });
    } else {
      output = await categoryService
        .deleteCategory(querypm)
        .then((output: any) => {
          res.status(200).json({ message: "Category Deleted Successfully" });
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

//UPLOAD CATEGORY PIC
export async function uploadCategory(req: any, res: Response) {
  try {
    // Check if file exists
    if (!req.files || req.files.length === 0) {
      res.status(400).json({ message: "Please select image to upload" });
    } else {
      // Save file path to database
      const categoryId = await sanitizeInput(req.params.id);
      output = await categoryService
        .getCategory(categoryId)
        .then(async (output: any) => {
          if (typeof output === "string") {
            res.status(200).json({ message: output });
          } else {
            const fullfilename = await filePath(req);
            // Save file to database using filePath
            await categoryService.dbSetPath(fullfilename, categoryId);
            res.status(200).json({ message: "Image uploaded successfully." });
          }
        });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

//UPLOAD PIC FUNCTION
// export async function uploadCategory(req: any, res: Response) {
//   try {
//     const categoryId = await sanitizeInput(req.params.id);
//     if (req.files === null || req.files === undefined) {
//       res.status(400).json({ message: "Please select image" });
//     } else {
// if (fullfilename) {
//       output = await categoryService
//         .getCategory(categoryId)
//         .then(async (output: any) => {
//           if (typeof output === "string") {
//             res.status(200).json({ message: output });
//           } else {
//             photo = await req.files.photo;
//             fullfilename = await uploadPic(req, res, photo);
//             if (fullfilename) {
//               await categoryService.dbSetPath(fullfilename, categoryId);
//               res
//                 .status(200)
//                 .json({ Message: "Image Uploaded Successfullly " });
//               console.log("Image Uploaded Successfullly ");
//             }
//           }
//         });

// }
//     }
//   } catch (error) {
//     res.status(500).json({ Message: "Something went wrong " });
//     console.log("Error :  " + error);
//   }
// }
