import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getFeedbacks,
  getFeedback,
  addFeedback,
  updateFeedback,
  deleteFeedback,
  //   populateFeedbacks
} from "../controllers/FeedbackController";

dotenv.config();
const router: Express = express();

//GET ALL Feedbacks
router.get("/feedbacks", isAuth, getFeedbacks);

//GET Feedback BY ID
router.get("/feedback/:id", isAuth, getFeedback);

// ADD Feedback
router.post("/feedback", isAuth, Validator("addFeedbackSchema"), addFeedback);

// UPDATE Feedback
router.put(
  "/feedback/:id",
  isAuth,
  Validator("updateFeedbackSchema"),
  updateFeedback
);

//DELETE Feedback
router.delete("/feedback/:id", isAuth, deleteFeedback);

export default router;
