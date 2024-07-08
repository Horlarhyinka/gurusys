import { Request, Response } from "express"
import catchAsyncErrors from "../libs/catchAsyncErrors"
import BlogModel from "../model/blog.model"
import validator from "../libs/validator"
import { AuthReq } from "../utils/types"

export const createBlog = catchAsyncErrors(async(req: AuthReq, res: Response)=>{
    const validateRes = validator.validateCreateBlogPayload(req.body)
    if(validateRes.error)return res.status(400).json({message: validateRes.error.message})
    const blog = await BlogModel.create({...req.body, author: req.user._id})
    return res.status(201).json(blog)
})

export const getBlogs = catchAsyncErrors(async(req: Request, res: Response)=>{
    const {filter, value} = req.query;
    const page = (req.query.page && parseInt(req.query.page?.toString())) || 1
    const size = (req.query.size && parseInt(req.query.size?.toString())) || 20

    const filters = ["authorID", "title", "tag", "content"]

    if(!filter || !filters.includes(filter?.toString().toLowerCase())){
     const blogs = await BlogModel.find({}).sort("-createdAt").skip((page - 1) * size).limit(size)
     const total = await BlogModel.countDocuments({}).sort("-createdAt")
     return res.status(200).json({ page, size, filter, total, data: blogs })
    }

    if(filter === "authorID"){
     const blogs = await BlogModel.find({author: value}).sort("-createdAt").skip((page - 1) * size).limit(size)
     const total = await BlogModel.countDocuments({}).sort("-createdAt")
     return res.status(200).json({ page, size, filter, total, data: blogs })
    }else if(filter === "tag"){
        const blogs = await BlogModel.find({
            tags: { $in: Array.isArray(value)? value: [value] }
        }).sort("-createdAt").skip((page - 1) * size).limit(size)
     const total = await BlogModel.countDocuments({}).sort("-createdAt")
     return res.status(200).json({ page, size, filter, total, data: blogs })
    }
    
    
})

export const getBlog = catchAsyncErrors(async(req: Request, res: Response)=>{

})

export const updateBlog = catchAsyncErrors(async(req: Request, res: Response)=>{

})

export const deleteBlog = catchAsyncErrors(async(req: Request, res: Response)=>{

})