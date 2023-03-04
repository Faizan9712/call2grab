import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import db from "./config/database";
import authenticationRouter from "./routes/Authentication";
import userRouter from "./routes/User";
import productRouter from "./routes/Product";
import categoryRouter from "./routes/Category";
import parentCategoryRouter from "./routes/ParentCategory";
import cartRouter from "./routes/Cart";
import orderRouter from "./routes/Order";
import couponRouter from "./routes/Coupon";
import brandRouter from "./routes/Brand";
import dealRouter from "./routes/Deal";
import areaRouter from "./routes/Area";
import parentAreaRouter from "./routes/ParentArea";
import taxRouter from "./routes/Tax";
import createHttpError from "http-errors";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

//PORT AND DATABASE CHECK
app.listen(PORT, () => {
  console.log(`Running on ${PORT}⚡`);
  db.authenticate()
    .then(async () => {
      console.log("Database Connected");
      try {
        await db.sync({ force: false });
        console.log("Model generated successfully");
      } catch (error: any) {
        console.log(error.message);
      }
    })
    .catch((error: any) => {
      console.log(error.message);
    });
});

//TESTING API
app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hey Faizan</h1>");
});

//BINDING ROUTES
app.use("/api", authenticationRouter);
app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", parentCategoryRouter);
app.use("/api", cartRouter);
app.use("/api", orderRouter);
app.use("/api", couponRouter);
app.use("/api", brandRouter);
app.use("/api", dealRouter);
app.use("/api", areaRouter);
app.use("/api", parentAreaRouter);
app.use("/api", taxRouter);

// Catch HTTP 404
app.use((req, res, next) => {
  next(createHttpError(200));
});

// ERROR MESSAGES
app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status);
  console.log(err.message);
  res.json({
    error: {
      // status: err.status ,
      message: err.message,
    },
  });
});
