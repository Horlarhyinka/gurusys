import { Document, ObjectId} from "mongoose";

export interface Blog{
    title: string
    content: string
    tags: string[]
    author: ObjectId
}

