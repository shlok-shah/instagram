"use strict";
//@ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.Signup = void 0;
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const SecretToken_1 = require("../Utils/SecretToken");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Signup = async (req, res, next) => {
    try {
        const { email, password, username, firstName, lastName } = req.body.data;
        const existingUser = await UserModel_1.default.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }
        const isUsernameTaken = await UserModel_1.default.findOne({ username });
        if (isUsernameTaken) {
            return res.json({ message: "Username is taken" });
        }
        const user = await UserModel_1.default.create({ firstName, lastName, email, username, password });
        const token = (0, SecretToken_1.createSecretToken)(user._id.toString());
        console.log(token);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res
            .status(201)
            .json({ message: "User signed in successfully", success: true, user });
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Could not create your account" });
    }
};
exports.Signup = Signup;
const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body.data;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await UserModel_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }
        const auth = await bcryptjs_1.default.compare(password, user.password);
        if (!auth) {
            return res.status(401).json({ message: 'Incorrect password or email' });
        }
        const token = (0, SecretToken_1.createSecretToken)(user._id.toString());
        console.log(token);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({ message: "User logged in successfully", success: true });
        next();
    }
    catch (error) {
        console.error(error);
    }
};
exports.Login = Login;
