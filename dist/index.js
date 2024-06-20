"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const AuthRoute_1 = __importDefault(require("./Routes/AuthRoute"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ credentials: true,
    origin: ["http://localhost:3000"] }));
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;
mongoose_1.default
    .connect(MONGO_URL)
    .then(() => console.log("MongoDB is connected successfully !"))
    .catch((err) => console.error(err));
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/", AuthRoute_1.default);
