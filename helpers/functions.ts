import fs from "fs";
import short from "short-uuid";
import path from "path";
// import download from "image-downloader";
// import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const mediaURL = process.env.MEDIA_URL;

let dir = path.join(__dirname, "../../../media/");
let flag: number = -1;
let fileExtension;
let filename;
let fileSize;
let uuid;
let fullfilename: string;

//Sanitize input
export async function sanitizeInput(data: any) {
  return data;
}

//Upload Pic
export async function uploadPic(res: any, photo: any) {
  filename = photo.name;
  fileSize = photo.size;
  fileExtension = path.extname(filename);
  if (fileSize <= 2000000) {
    if (
      fileExtension == ".jpg" ||
      fileExtension == ".jpeg" ||
      fileExtension == ".png"
    ) {
      uuid = short.generate();
      fullfilename = "product_" + uuid + "_" + filename;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      await photo
        .mv(dir + fullfilename)
        .then(() => {
          // console.log("-------+++++++++++", dir);
          flag = 1;
        })
        .catch(() => {
          flag = 0;
        });

      if (flag == 0) {
        res.status(400).json({ message: "Something went wrong" });

        console.log("Something went wrong");
        return "";
      } else {
        return fullfilename;
      }
    } else {
      res.status(400).json({ message: "Upload only jpg,jpeg,png file" });
      console.log("Upload only jpg, jpeg, png file");
    }
  } else {
    res.status(400).json({ message: "File exceeds 2 MB" });
    console.log("File exceeds 2 MB");
  }
}
