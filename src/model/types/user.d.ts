import { Document } from "mongoose";

export interface User extends Document{
    username: string
    password: string
    comparePassword: (plain: string)=>Promise<boolean>
    generateJWT: ()=>Promise<string>
}

