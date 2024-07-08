import { Document, ObjectId } from "mongoose";

export interface Comment extends Document{
    blogId: ObjectId
    body: string
}