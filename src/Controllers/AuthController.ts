import { NextFunction, Request, Response } from "express";
import User from "../Models/UserModel";
import { createSecretToken } from "../Utils/SecretToken";
import bcrypt from "bcryptjs"

interface signupRequestBody {
    email: string,
    firstName: string,
    lastName:string, 
    password: string,
    username: string,
}

export const Signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const { email, password, username, firstName, lastName } : signupRequestBody = req.body.data ;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const isUsernameTaken = await User.findOne({username})
    if(isUsernameTaken){
        return res.json({message: "Username is taken"})
    }
    const user = await User.create({ firstName, lastName, email, username ,password });
    const token = createSecretToken(user._id.toString());
    res.cookie("token", token , {
      withCredentials: true,
      httpOnly: false,
    })
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({message: "Could not create your account"})
  }
};

export const Login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body.data as {email: string, password: string};
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect email or password' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id.toString());
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     res.status(201).json({ message: "User logged in successfully", success: true });
     next()
  } catch (error) {
    console.error(error);
  }
}
