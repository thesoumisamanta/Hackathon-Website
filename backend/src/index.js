import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

connectDB()
.then(() => {

    app.on("Error", (err) => {
        console.error("Error in Server", err)
        throw err
    })

    app.listen(Process.env.PORT || 5000, () => {
        console.log(`Server is running on http://${process.env.PORT}`)
    })
})
.catch((err) => {
    console.error("MongoDB Connection Failed", err)
})