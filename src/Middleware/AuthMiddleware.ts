import User from "../Models/UserModel";
require("dotenv").config();
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/userTypes";

export const userVerification = (req: AuthRequest, res: Response, next: NextFunction) => {

    const authHeader = req.cookies;

    if (authHeader) {
        const token = req.cookies.token;
        console.log(token)
        jwt.verify(token, process.env.TOKEN_KEY || "ksdjflaksdmfjak", (err: any, user: any) => {
            if (err) {
                console.log(err)
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}