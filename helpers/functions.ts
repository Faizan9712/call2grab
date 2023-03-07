import fs from "fs";
import short from "short-uuid";
import path from "path";
import jwt_decode from "jwt-decode";
import multer from "multer";
import dotenv from "dotenv";
import { NextFunction } from "express";

dotenv.config();
const mediaURL = process.env.MEDIA_URL;

let dir = path.join(__dirname, "../../../media/");

//Sanitize input
export async function sanitizeInput(data: any) {
  return data;
}

// export async function sanitizeInput(data: any) {
//   return await data.replace(/[^\w. ]/gi, function (c: any) {
//     return "&#" + c.charCodeAt(0) + ";";
//   });
// }

export async function pagination(pageNumber: number) {
  const newPage = pageNumber ? pageNumber - 1 : 0;
  const pagination = newPage != 0 ? newPage * 10 : 0;
  return pagination;
}

//Information from the token
export async function infoFromToken(req: any) {
  let authorization = await sanitizeInput(req.headers["authorization"]);
  if (authorization) {
    const authHeader = authorization;
    const token = authHeader.split(" ")[1];
    const decoded = jwt_decode(token);
    return decoded;
  }
}

//PIC UPLOAD USING MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${req.url.slice(8, 12)}-${short.generate()}-${file.originalname}`
    );
  },
});

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  // Accept only files with .jpg, .jpeg, or .png extensions
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(new Error("Only .jpg, .jpeg, or .png files are allowed"));
  }
};

// MULTER OBJECT
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
  },
});

//HANDLE UPLOAD
export async function handleUpload(req: any, res: any, next: NextFunction) {
  upload.array("image", 10)(req, res, function (err) {
    // INVALID FILE TYPE, message will return from fileFilter callback
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}

//FILE PATH
export async function filePath(req: any) {
  return req.files[0].filename;
  //return path.join(req.files.filename.split(".")[0]);
}
//END USING MULTER

//Upload Pic
// export async function uploadPic(req: any, res: any, photo: any) {
//   filename = photo.name;
//   fileSize = photo.size;
//   fileExtension = path.extname(filename);
//   if (fileSize <= 2000000) {
//     if (
//       fileExtension == ".jpg" ||
//       fileExtension == ".jpeg" ||
//       fileExtension == ".png"
//     ) {
//       uuid = short.generate();
//       const prefix = await sanitizeInput(req.url.slice(8, 12));
//       fullfilename = prefix + "_" + uuid + "_" + filename;
//       if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir);
//       }
//       await photo
//         .mv(dir + fullfilename)
//         .then(() => {
// console.log("-------+++++++++++", dir);
//           flag = 1;
//         })
//         .catch(() => {
//           flag = 0;
//         });

//       if (flag == 0) {
//         res.status(400).json({ message: "Something went wrong" });
//         console.log("Something went wrong");
//         return "";
//       } else {
//         return fullfilename;
//       }
//     } else {
//       res.status(400).json({ message: "Upload only jpg,jpeg,png file" });
//       console.log("Upload only jpg, jpeg, png file");
//     }
//   } else {
//     res.status(400).json({ message: "File exceeds 2 MB" });
//     console.log("File exceeds 2 MB");
//   }
// }
