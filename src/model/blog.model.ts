import mongoose from "mongoose"
import { Blog } from "./types/blog"

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
    }
}, { timestamps: true})


export default mongoose.model("blog", blogSchema)