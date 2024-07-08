import dotenv from "dotenv"

dotenv.config()

export const app = {
    port: process.env.APP_PORT || 8000,
    host: process.env.APP_HOST || "localhost",
    env: process.env.NODE_ENV || "development",
    secret: process.env.APP_SECRET
}

export const db = {
    url: process.env.DB_URI || "mongodb://localhost:27017/gurusys"
}

