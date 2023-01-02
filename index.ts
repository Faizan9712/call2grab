import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import db from "./config/database";
import authenticationRouter from "./routes/Authentication";
import userRouter from "./routes/User";
import productRouter from "./routes/Product";
import createHttpError from "http-errors";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
