"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.getDetails = void 0;
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const PostModel_1 = __importDefault(require("../Models/PostModel"));
const getDetails = async (req, res) => {
    const user = req.user;
    console.log(user.id);
    let details = await UserModel_1.default.findById(user.id);
    return res.status(200).json(details);
};
exports.getDetails = getDetails;
const createPost = async (req, res) => {
    try {
        const id = req.user.id;
        const type = req.body.type;
        const textBody = req.body.textBody;
        const post = new PostModel_1.default({
            user: id,
            type,
            captionText: textBody
        });
        await post.save();
        res.status(200).send({ message: "Posted Successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(409).send({ message: "Could not post" });
    }
};
exports.createPost = createPost;
