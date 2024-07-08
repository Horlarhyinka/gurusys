import { Request, Response } from "express"
import catchAsyncErrors from "../libs/catchAsyncErrors"
import validator from "../libs/validator"
import { AuthReq } from "../utils/types"
import { User } from "../model/types/user"
import blogModel from "../model/blog.model"
import commentModel from "../model/comment.model"

//create comment
export const createComment = catchAsyncErrors(async(req: AuthReq, res: Response)=>{
    const validateRes = validator.validateCreateCommentPayload(req.body)
    if(validateRes.error)return res.status(400).json({message: validateRes.error.message})
    const { blogId} = req.query
    if(!blogId)return res.status(400).json({message: "blogId is required"})
    const blog = await blogModel.findById(blogId)
    if(!blog)return res.status(404).json({message: "blog not found"})
    const comment = await commentModel.create({...req.body, blogId, username: req.user.username})
    return res.status(201).json(comment)
})

//get comments
export const getComments = catchAsyncErrors(async(req: Request, res: Response)=>{
    const { blogId} = req.query
    if(!blogId)return res.status(400).json({message: "blogId is required"})
    const blog = await blogModel.findById(blogId)
    if(!blog)return res.status(404).json({message: "blog not found"})
    const comments = await commentModel.find({blogId})
    return res.status(200).json(comments)
})

//get comment
export const getComment = catchAsyncErrors(async(req: Request, res: Response)=>{
    const {commentId} = req.params
    if(!commentId) return res.status(400).json({message: "commentId is required"})
    const comment = await commentModel.findById(commentId)
    if(!comment)return res.status(404).json({message: "comment not found"})
    return res.status(200).json(comment)
})