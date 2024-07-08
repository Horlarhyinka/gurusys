import { Document, ObjectId } from "mongoose";

export interface Comment extends Document{
    blogId: ObjectId
    username: string
    body: string
}

