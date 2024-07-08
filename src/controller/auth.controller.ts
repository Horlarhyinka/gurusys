import { Request, Response } from "express"
import catchAsyncErrors from "../libs/catchAsyncErrors"
import UserModel from "../model/user.model"
import validator from "../libs/validator"

export const register = catchAsyncErrors(async(req: Request, res: Response)=>{
    const validateRes = validator.validateRegisterPayload(req.body)
    if(validateRes.error)return res.status(400).json({message: validateRes.error.message})
    const user = await UserModel.create({...req.body})
    return res.status(201).json({user: {...user.toObject(), password: undefined}, token: await user.generateJWT()})
})

export const login = catchAsyncErrors(async(req: Request, res: Response)=>{
    const {username, password} = req.body
    if(!username || !password)return res.status(401).json({message: "username and password is required"})
    const user = await UserModel.findOne({username})
    if(!user)return res.status(404).json({message: "user not found"})
    const passwordMatch = await user.comparePassword(password)
    if(!passwordMatch)return res.status(401).json({message: "incorect password"})
    return res.status(200).json({user: {...user.toObject(), password: undefined}, token: await user.generateJWT()})
})

// UserModel.deleteMany({})
// .then(()=>{
//     console.log("sanitized")
// })