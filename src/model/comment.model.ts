import mongoose from "mongoose"

import { Comment } from "./types/comment"

import "./user.model"

const commentSchema = new mongoose.Schema<Comment>({
    body: {
        type: String,
        required: true,
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    username: {
        type: String,
        required: true
    }
})

export default mongoose.model("comment", commentSchema)