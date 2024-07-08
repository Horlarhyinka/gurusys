import mongoose from "mongoose"
import * as config from "./config"

export const connectDB = async() =>{
    return mongoose.connect(config.db.url)
}