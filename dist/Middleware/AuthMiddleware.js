"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userVerification = void 0;
require("dotenv").config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userVerification = (req, res, next) => {
    const authHeader = req.cookies;
    if (authHeader) {
        const token = req.cookies.token;
        console.log(token);
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_KEY || "ksdjflaksdmfjak", (err, user) => {
            if (err) {
                console.log(err);
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.userVerification = userVerification;
