import { Request, Response } from "express";
import OrderService from "../services/OrderService";
import { sanitizeInput, uploadPic } from "../helpers/functions";
import { string } from "joi";

//INSTANCE VARIABLES

let output: any;
let querypm: number;
let photo: any;
let fullfilename: any;

//CREATING OBJECT
const orderService = new OrderService();

//GET ALL OrderS FUNCTION
export async function getOrders(req: Request, res: Response) {
  try {
    output = "";
    const { pageNo, orderBy, sortBy, query, filter } = await sanitizeInput(
      req.query
    );
    output = await orderService
      .orderCases(
        pageNo == undefined ? 1 : pageNo,
        orderBy == undefined ? "orderId" : orderBy,
        sortBy == undefined ? "ASC" : sortBy,
        query,
        filter == undefined ? "all" : filter
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

//GET Order BY ID
export async function getOrder(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(Number(req.params.id));

    output = await orderService
      .getOrder(querypm)
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

//ADD Order
export async function addOrder(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(req.body);
    output = await orderService
      .addOrder(querypm)
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

//UPDATE Order
export async function updateOrder(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(req.body);
    const id = await sanitizeInput(Number(req.params.id));
    let result = await orderService.getOrder(id);
    if (typeof result == "string") {
      res.status(400).json({ message: result });
    } else {
      output = await orderService
        .updateOrder(querypm, id)
        .then((output: any) => {
          if (output[0] === 0) {
            res.status(200).json({ message: "Already Updated" });
          } else {
            res.status(200).json({ message: "Order Updated Successfully" });
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

//DELETE Order
export async function deleteOrder(req: Request, res: Response) {
  try {
    output = "";
    querypm = await sanitizeInput(Number(req.params.id));
    let result = await orderService.getOrder(querypm);
    if (typeof result == "string") {
      res.status(400).json({ message: result });
    } else {
      output = await orderService
        .deleteOrder(querypm)
        .then((output: any) => {
          res.status(200).json({ message: "Order Deleted Successfully" });
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

//POPULATE Orders
// export async function populateOrders(req: Request, res: Response) {
//   try {
//     output = "";
//     querypm = await sanitizeInput(req.query.qpm);
//     output = await orderService
//       .populateOrders(querypm)
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
