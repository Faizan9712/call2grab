import { Request, Response } from "express";
import CouponService from "../services/CouponService";
import { sanitizeInput } from "../helpers/functions";

//INSTANCE VARIABLES

let output: any;
let querypm: number;
let photo: any;
let fullfilename: any;

//CREATING OBJECT
const couponService = new CouponService();

//GET ALL CouponS FUNCTION
export async function getCoupons(req: Request, res: Response) {
  try {
    output = "";
    const { pageNo, orderBy, sortBy } = await sanitizeInput(req.query);
    output = await couponService
      .getAllCoupons(
        pageNo == undefined ? 1 : pageNo,
        orderBy == undefined ? "couponId" : orderBy,
        sortBy == undefined ? "ASC" : sortBy
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

//GET Coupon BY ID
export async function getCoupon(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(Number(req.params.id));

    output = await couponService
      .getCoupon(querypm)
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

//ADD Coupon
export async function addCoupon(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(req.body);
    output = await couponService
      .addCoupon(querypm)
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

//UPDATE Coupon
export async function updateCoupon(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(req.body);
    const id = await sanitizeInput(Number(req.params.id));
    let result = await couponService.getCoupon(id);
    if (typeof result == "string") {
      res.status(400).json({ message: result });
    } else {
      output = await couponService
        .updateCoupon(querypm, id)
        .then((output: any) => {
          if (output[0] === 0) {
            res.status(200).json({ message: "Already Updated" });
          } else {
            res.status(200).json({ message: "Coupon Updated Successfully" });
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

//DELETE Coupon
export async function deleteCoupon(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(Number(req.params.id));
    let result = await couponService.getCoupon(querypm);
    if (typeof result == "string") {
      res.status(400).json({ message: result });
    } else {
      output = await couponService
        .deleteCoupon(querypm)
        .then((output: any) => {
          res.status(200).json({ message: "Coupon Deleted Successfully" });
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

//POPULATE Coupons
// export async function populateCoupons(req: Request, res: Response) {
//   try {
//     output = "";
//     querypm = await sanitizeInput(req.query.qpm);
//     output = await couponService
//       .populateCoupons(querypm)
//       .then((output: any) => {
//         if (typeof output === "string") {
//           res.status(200).json({ message: output });
//         } else {
//           res.status(200).json({ output: output });
//         }
//       })
//       .catch((error: any) => {
//         res.status(400).json({ output: "Something went wrong" });
//         console.log(error);
//       });
//   } catch (error) {
//     res.status(503).json({ output: "Something went wrong" });
//     console.log(error);
//   }
// }
