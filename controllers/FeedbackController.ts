import { Request, Response } from "express";
import FeedbackService from "../services/FeedbackService";
import { sanitizeInput } from "../helpers/functions";

//INSTANCE VARIABLES

let output: any;
let querypm: number;

//CREATING OBJECT
const feedbackService = new FeedbackService();

//GET ALL FEEDBACKS
export async function getFeedbacks(req: Request, res: Response) {
  try {
    output = "";
    const { pageNo, orderBy, sortBy, query, filter, limit } =
      await sanitizeInput(req.query);
    output = await feedbackService
      .feedbackCases(
        pageNo == undefined ? 1 : pageNo,
        orderBy == undefined ? "FeedbackId" : orderBy,
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

//GET FEEDBACK BY ID
export async function getFeedback(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(Number(req.params.id));

    output = await feedbackService
      .getFeedback(querypm)
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

//ADD FEEDBACK
export async function addFeedback(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(req.body);
    output = await feedbackService
      .addFeedback(querypm)
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

//UPDATE FEEDBACK
export async function updateFeedback(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(req.body);
    const id = await sanitizeInput(Number(req.params.id));
    let result = await feedbackService.getFeedback(id);
    if (typeof result == "string") {
      res.status(400).json({ message: result });
    } else {
      output = await feedbackService
        .updateFeedback(querypm, id)
        .then((output: any) => {
          if (output[0] === 0) {
            res.status(200).json({ message: "Already Updated" });
          } else {
            res.status(200).json({ message: "Feedback Updated Successfully" });
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

//DELETE FEEDBACK
export async function deleteFeedback(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(Number(req.params.id));
    let result = await feedbackService.getFeedback(querypm);
    if (typeof result == "string") {
      res.status(400).json({ message: result });
    } else {
      output = await feedbackService
        .deleteFeedback(querypm)
        .then((output: any) => {
          res.status(200).json({ message: "Feedback Deleted Successfully" });
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
