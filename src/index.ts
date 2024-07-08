import express, {Request, Response} from "express"
import cors from "cors"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import http from "http"
import { connectDB } from "./config/db.config"
import * as config from "./config/config"

import authRouter from "./router/auth.router"

const app = express()

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	legacyHeaders: false,
})

app.use(limiter)
app.use(cors({ origin: "*"}))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/v1/auth", authRouter)

async function start() {
    const server = http.createServer(app)
    server.on("listening", ()=>{
        console.log(`server running ${config.app.env} mode on port ${(server.address() as {port: number}).port}`)
    })
    connectDB()
    .then(()=>{
        console.log("db connected")
        server.listen(config.app.port)
    })
    .catch(err=>{
        console.log("failed to connect to db:", err)
        process.exit(1)
    })
}

start()