import { Request, Response } from "express"
import catchAsyncErrors from "../libs/catchAsyncErrors"
import BlogModel from "../model/blog.model"
import validator from "../libs/validator"
import { AuthReq } from "../utils/types"
import { User } from "../model/types/user"

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

    const filters = ["authorid", "title", "tags", "content"]

    if(!filter || !filters.includes(filter?.toString().toLowerCase()) || !value){
     const blogs = await BlogModel.find({}).sort("-createdAt").skip((page - 1) * size).limit(size)
     const total = await BlogModel.countDocuments({}).sort("-createdAt")
     return res.status(200).json({ page, size, filter, total, data: blogs })
    }

    if(filter.toString().toLowerCase() === "authorid"){
     const blogs = await BlogModel.find({author: value}).sort("-createdAt").skip((page - 1) * size).limit(size)
     const total = await BlogModel.countDocuments({}).sort("-createdAt")
     return res.status(200).json({ page, size, filter, total, data: blogs })
    }else if(filter === "tag"){
        const q = { tags: { $in: Array.isArray(value)? value: [value] } }
        const blogs = await BlogModel.find(q).sort("-createdAt").skip((page - 1) * size).limit(size)
     const total = await BlogModel.countDocuments(q)
     return res.status(200).json({ page, size, filter, total, data: blogs })
    }else{
        const q = {
            [filter.toString()]: { $regex: new RegExp(value.toString(), "i") }
        }
        const blogs = await BlogModel.find(q).sort("-createdAt").skip((page - 1) * size).limit(size)
        const total = await BlogModel.countDocuments(q).sort("-createdAt")
        return res.status(200).json({ page, size, filter, total, data: blogs })
    }
})

export const getBlog = catchAsyncErrors(async(req: Request, res: Response)=>{
    const { blogId} = req.params
    if(!blogId)return res.status(400).json({message: "blogId is required"})
    const blog = await BlogModel.findById(blogId).populate({ path: "author", select: "-password"})
    if(!blog)return res.status(404).json({message: "blog not found."})
        return res.status(200).json(blog)

})

export const updateBlog = catchAsyncErrors(async(req: AuthReq, res: Response)=>{
    const { blogId} = req.params
    if(!blogId)return res.status(400).json({message: "blogId is required"})
    const blog = await BlogModel.findById(blogId)
    if(!blog)return res.status(404).json({message: "blog not found."})
    if(blog.author.toString() !== (req as any).user._id.toString())return res.status(403).json({message: "forbidden request"})
    const updates = {...req.body}
    if(updates.tags){
        if(!Array.isArray(updates.tags)){
            updates.tags = [updates.tags]
        }
    }
    const updated = await BlogModel.findByIdAndUpdate(blogId, updates, {new: true})
    return res.status(200).json(updated)
})

export const deleteBlog = catchAsyncErrors(async(req: Request, res: Response)=>{
    const { blogId} = req.params
    if(!blogId)return res.status(400).json({message: "blogId is required"})
    const blog = await BlogModel.findById(blogId).populate({ path: "author", select: "-password"})
    if(!blog)return res.status(404).json({message: "blog not found."})
        await blog.deleteOne()
    return res.status(200).json({message: "successful", data: blog})
})