import { Request, Response } from "express";
import AreaService from "../services/AreaService";
import { sanitizeInput } from "../helpers/functions";

//INSTANCE VARIABLES

let output: any;
let querypm: number;

//CREATING OBJECT
const areaService = new AreaService();

//GET ALL AREAS
export async function getAreas(req: Request, res: Response) {
  try {
    output = "";
    const { pageNo, orderBy, sortBy, query, filter, limit } =
      await sanitizeInput(req.query);
    output = await areaService
      .areaCases(
        pageNo == undefined ? 1 : pageNo,
        orderBy == undefined ? "areaId" : orderBy,
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
        res.status(400).json({ output: "Bad Request Please try again!!!" });
        console.log(error);
      });
  } catch (error) {
    res.status(503).json({ output: "Something went wrong" });
    console.log(error);
  }
}

//GET AREA BY ID
export async function getArea(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(Number(req.params.id));

    output = await areaService
      .getArea(querypm)
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

//ADD AREA
export async function addArea(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(req.body);
    output = await areaService
      .addArea(querypm)
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

//UPDATE AREA
export async function updateArea(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(req.body);
    const id = await sanitizeInput(Number(req.params.id));
    let result = await areaService.getArea(id);
    if (typeof result == "string") {
      res.status(400).json({ message: result });
    } else {
      output = await areaService
        .updateArea(querypm, id)
        .then((output: any) => {
          if (output[0] === 0) {
            res.status(200).json({ message: "Already Updated" });
          } else {
            res.status(200).json({ message: "Area Updated Successfully" });
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

//DELETE AREA
export async function deleteArea(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(Number(req.params.id));
    let result = await areaService.getArea(querypm);
    if (typeof result == "string") {
      res.status(400).json({ message: result });
    } else {
      output = await areaService
        .deleteArea(querypm)
        .then((output: any) => {
          res.status(200).json({ message: "Area Deleted Successfully" });
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
