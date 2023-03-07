import express, { Express} from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getFeedbacks,
  getFeedback,
  addFeedback,
  updateFeedback,
  deleteFeedback,
} from "../controllers/FeedbackController";

dotenv.config();
const router: Express = express();

//GET ALL FEEDBACKS
router.get("/feedbacks", isAuth, getFeedbacks);

//GET FEEDBACK BY ID
router.get("/feedback/:id", isAuth, getFeedback);

// ADD FEEDBACK
router.post("/feedback", isAuth, Validator("addFeedbackSchema"), addFeedback);

// UPDATE FEEDBACK
router.put(
  "/feedback/:id",
  isAuth,
  Validator("updateFeedbackSchema"),
  updateFeedback
);

//DELETE FEEDBACK
router.delete("/feedback/:id", isAuth, deleteFeedback);

export default router;
