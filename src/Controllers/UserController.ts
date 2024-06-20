import User from "../Models/UserModel"
import Post from "../Models/PostModel"
import { AuthRequest } from "../types/userTypes"
import { Response } from "express";

export const getDetails = async (req: AuthRequest, res: Response) => {
    const user = req.user;
    console.log(user.id)
    let details = await User.findById(user.id)
    return res.status(200).json(details)
}

export const createPost = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.user.id;
        const type = req.body.type;
        const textBody = req.body.textBody
        const post = new Post({
            user: id,
            type,
            captionText: textBody
        })
        await post.save();
        await User.findByIdAndUpdate(id, {$push: { posts: post.id}})
        res.status(200).send({message: "Posted Successfully"})
    }
    catch(err){
        console.log(err)
        res.status(409).send({message: "Could not post"})
    }
}

export const getPosts = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.user.id;
        const userId = req.query.user;
        console.log(userId)
        const data = await Post.find({user: userId}).populate("user", {firstName: 1 ,lastName: 1, photoUrl: 1, username: 1 })
        res.status(200).send(data)
    }
    catch(err){
        console.log(err)
        res.status(400).send({message: "Error fetching posts"})
    }
}