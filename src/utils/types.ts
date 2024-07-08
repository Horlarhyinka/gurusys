import { User } from "../model/types/user"
import {Request} from "express"

export interface AuthReq extends Request{
    user: User
}