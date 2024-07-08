import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken"
import  * as config from "../config/config";
import { User } from "../model/types/user";
import UserModel from "../model/user.model"
import { AuthReq } from "../utils/types";

interface ExtReq extends Request{
    user: User
}

const useAuth = async function(req: Request, res: Response, next: NextFunction){
    function sendUnauthenticated(msg?: string){
        return res.status(401).json({message: msg || "unauthenticated"})
    }
    const authPayload = req.headers["authorization"]
    if(!authPayload)return sendUnauthenticated()
    const [prefix, token] = authPayload.split(" ")
    if(prefix?.toLowerCase() !== "bearer" || !token)return sendUnauthenticated("bearer token is required")
    const payload = (jwt.verify(token, config.app.secret!) as {id: string})
    if(!payload.id)return sendUnauthenticated()
    const user = await UserModel.findById(payload.id)
    if(!user)return sendUnauthenticated("user not found");
    (req as AuthReq).user = user
    next()
}

export default useAuth