import express from "express";
import userRouter from "./routes/user.routes";
import helmet from "helmet";
import morgan from "morgan";
import errorHandler from "./controller/error.controller";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
