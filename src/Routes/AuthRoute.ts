import { Login, Signup } from "../Controllers/AuthController";
const authRouter = require("express").Router();

authRouter.post("/signup", Signup);
authRouter.post("/login", Login)

export default authRouter;