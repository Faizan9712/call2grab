import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import { upload } from "../helpers/functions";
import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  changeUserPasssword,
  deactivateUser,
  uploadUser,
} from "../controllers/UserController";

dotenv.config();
const router: Express = express();

//GET ALL USER
router.get("/users", isAuth, getUsers);

//GET USER BY ID
router.get("/user/:id", isAuth, getUser);

// ADD USER
router.post("/user", isAuth, Validator("addUserSchema"), addUser);

// ADD USER
router.put(
  "/change-userpassword/:id",
  isAuth,
  Validator("changeUserPasswordSchema"),
  changeUserPasssword
);

// ADD USER
router.put(
  "/change-userstatus/:id",
  isAuth,
  Validator("deactivateUserSchema"),
  deactivateUser
);

//UPDATE USER
router.put("/user/:id", isAuth, Validator("updateUserSchema"), updateUser);

//DELETE User
router.delete("/user/:id", isAuth, deleteUser);

//UPLOAD PHOTO
// router.patch("/upload-user/:id", isAuth, uploadUser);

router.patch("/upload-user/:id", isAuth, upload.single("image"), uploadUser);

export default router;
