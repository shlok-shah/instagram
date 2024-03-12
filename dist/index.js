"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;
mongoose
    .connect("mongodb://localhost:27017")
    .then(() => console.log("MongoDB is connected successfully !"))
    .catch((err) => console.error(err));
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());
