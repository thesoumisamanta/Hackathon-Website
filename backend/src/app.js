import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { PAYLOAD_LIMIT } from "./constants.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: PAYLOAD_LIMIT}))
app.use(express.urlencoded({extended: true, limit: PAYLOAD_LIMIT}))
app.use(express.static("public"))

app.use(cookieParser())

//routes
import userRouter from "./routes/user.routes.js"
import hackathonRouter from "./routes/hackathon.routes.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/hackathons", hackathonRouter)

export {app}