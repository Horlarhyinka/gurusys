import mongoose from "mongoose"
import { Blog } from "./types/blog"

import "./user.model"

const blogSchema = new mongoose.Schema<Blog>({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, { timestamps: true})


export default mongoose.model("blog", blogSchema)