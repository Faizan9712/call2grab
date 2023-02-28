import { Request, Response } from "express";
import DealService from "../services/DealService";
import { sanitizeInput } from "../helpers/functions";
import { filePath } from "../helpers/functions";

//INSTANCE VARIABLES

let output: any;
let querypm: number;

//CREATING OBJECT
const dealService = new DealService();

//GET ALL CATEGORIES
export async function getDeals(req: Request, res: Response) {
  try {
    output = "";
    const { pageNo, orderBy, sortBy, query, filter, limit } =
      await sanitizeInput(req.query);
    output = await dealService
      .dealCases(
        pageNo == undefined ? 1 : pageNo,
        orderBy == undefined ? "dealId" : orderBy,
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

//GET Deal BY ID
export async function getDeal(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(Number(req.params.id));

    output = await dealService
      .getDeal(querypm)
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

//ADD Deal
export async function addDeal(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(req.body);
    output = await dealService
      .addDeal(querypm)
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

//UPDATE Deal
export async function updateDeal(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(req.body);
    const id = await sanitizeInput(Number(req.params.id));
    let result = await dealService.getDeal(id);
    if (typeof result == "string") {
      res.status(400).json({ message: result });
    } else {
      output = await dealService
        .updateDeal(querypm, id)
        .then((output: any) => {
          if (output[0] === 0) {
            res.status(200).json({ message: "Already Updated" });
          } else {
            res.status(200).json({ message: "Deal Updated Successfully" });
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

//DELETE Deal
export async function deleteDeal(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(Number(req.params.id));
    let result = await dealService.getDeal(querypm);
    if (typeof result == "string") {
      res.status(400).json({ message: result });
    } else {
      output = await dealService
        .deleteDeal(querypm)
        .then((output: any) => {
          res.status(200).json({ message: "Deal Deleted Successfully" });
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


//UPLOAD DEAL BANNER PIC
export async function uploadDeal(req: any, res: Response) {
  try {
    // Check if file exists
    if (!req.files || req.files.length === 0) {
      res.status(400).json({ message: "Please select image to upload" });
    } else {
      // Save file path to database
      const dealId = await sanitizeInput(req.params.id);
      output = await dealService
        .getDeal(dealId)
        .then(async (output: any) => {
          if (typeof output === "string") {
            res.status(200).json({ message: output });
          } else {
            const fullfilename = await filePath(req);
            // Save file to database using filePath
            await dealService.dbSetPath(fullfilename, dealId);
            res.status(200).json({ message: "Image uploaded successfully." });
          }
        });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
