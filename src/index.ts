import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"
import authRouter from "./Routes/AuthRoute";
import cors from 'cors'


const app = express();
app.use(cors(
  {credentials: true,
    origin: ["http://localhost:3000"]}
))
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL!)
  .then(() => console.log("MongoDB is connected successfully !"))
  .catch((err : any) => console.error(err));

app.listen(PORT, ()  => {
  console.log(`Server is listening on port ${PORT}`);
});


app.use(cookieParser())
app.use(express.json());

app.use("/", authRouter)