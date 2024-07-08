import mongoose from "mongoose"
import { User } from "./types/user"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as config from "../config/config"

const userSchema = new mongoose.Schema<User>({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "password can not be less than 6 digits"]
    }
}, { timestamps: true})

//compare password method
userSchema.methods.comparePassword = async function(plain: string){
    return bcrypt.compare(plain, this.password)
}

//generate token method
userSchema.methods.generateJWT = async function(){
    const id = this._id
    return jwt.sign({id }, config.app.secret!, {expiresIn: "2d"})
}

//hash password before save and after update
userSchema.pre("save", async function(next){
    if(this.isNew || this.isModified("password") || this.directModifiedPaths().includes("password")){
      this.password = await hashPassword(this.password)
    }
    next()
  })
  
  userSchema.pre("findOneAndUpdate",async function(next){
    const updates = this.getUpdate() as {password?: string}
    if(updates["password"]){
      this.setUpdate({...updates, password: await hashPassword(updates["password"])})
    }
    next()
  })
  
  async function hashPassword(plain: string){
    const salt = await bcrypt.genSalt(12)
    const hashed = await bcrypt.hash(plain, salt);
    return hashed
  }

export default mongoose.model("user", userSchema)