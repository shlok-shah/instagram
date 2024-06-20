import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"

const postSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: ['text', 'image']
  },
  imageURL: {
    type: String,
    default: ""
  },
  captionText: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Post", postSchema);