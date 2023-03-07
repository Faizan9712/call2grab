import express, { Express } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import { handleUpload, upload } from "../helpers/functions";
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

// CHANGE PASSWORD
router.put(
  "/change-userpassword/:id",
  isAuth,
  Validator("changeUserPasswordSchema"),
  changeUserPasssword
);

// CHANGE USER STATUS
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
router.patch("/upload-user/:id", isAuth, handleUpload, uploadUser);

export default router;
