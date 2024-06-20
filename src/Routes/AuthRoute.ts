import { Login, Signup } from "../Controllers/AuthController";
import { userVerification } from "../Middleware/AuthMiddleware";
import {createPost, getDetails, getPosts} from "../Controllers/UserController"

const authRouter = require("express").Router();

authRouter.get("/api/getDetails", userVerification, getDetails)
authRouter.post("/api/post", userVerification, createPost)
authRouter.get("/api/posts", userVerification, getPosts)
authRouter.post("/api/signup", Signup);
authRouter.post("/api/login", Login)

export default authRouter;