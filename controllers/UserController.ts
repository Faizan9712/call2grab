import { Request, Response } from "express";
import UserService from "../services/UserService";
import { sanitizeInput } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;
let querypm: number;

//CREATING OBJECT
const userService = new UserService();

//GET ALL UserS FUNCTION
export async function getUsers(req: Request, res: Response) {
  try {
    output = "";
    output = await userService
      .getAllUsers()
      .then((output: any) => {
        if (typeof output === "string") {
          console.log("====message");
          res.status(200).json({ message: output });
        } else {
          console.log("=====op");
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

//GET User BY ID
export async function getUser(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(Number(req.params.id));
    output = await userService
      .getUser(querypm)
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

//ADD User
export async function addUser(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(req.body);
    const email = await sanitizeInput(req.body.userEmail);
    const altEmail = await sanitizeInput(req.body.userAlternativeEmail);
    const flagEmail = await userService.checkEmail(email);
    const flagAltEmail = await userService.checkAltEmail(altEmail);

    if (flagEmail == 0 && flagAltEmail == 0) {
      output = await userService
        .addUser(querypm)
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
    } else {
      if (flagEmail == 1)
        res
          .status(400)
          .json({ message: "Email already exists with other user" });
      else if (flagAltEmail == 1)
        res
          .status(400)
          .json({ message: "Alternate Email already exists with other user" });
      else
        res
          .status(400)
          .json({ message: "Emails already exists with other user" });
    }
  } catch (error) {
    res.status(503).json({ output: "Something went wrong" });
    console.log(error);
  }
}

//UPDATE User
export async function updateUser(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(req.body);
    const id = await sanitizeInput(Number(req.params.id));
    let result = await userService.getUser(id);
    if (result == null) {
      res.status(400).json({ message: "User doesn't exist" });
    } else {
      output = await userService
        .updateUser(querypm, id)
        .then((output: any) => {
          if (output[0] === 0) {
            res.status(200).json({ message: "Already Updated" });
          } else {
            res.status(200).json({ message: "User Updated Successfully" });
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

//DELETE USER
export async function deleteUser(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(Number(req.params.id));
    let result = await userService.getUser(querypm);
    if (result == null) {
      res.status(400).json({ message: "User doesn't exist" });
    } else {
      output = await userService
        .deleteUser(querypm)
        .then((output: any) => {
          res.status(200).json({ message: "User Deleted Successfully" });
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
