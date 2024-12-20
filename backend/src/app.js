import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"  //used for applying CRUD operation on cookies

const app=express()

//config cors
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from the frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16Kb"})) //used for extended objects
app.use(express.static("public")) //store assets

app.use(cookieParser())

//routes import
import Userrouter from "./routes/user.routes.js"

//routes declare
app.use("/api/v1/users",Userrouter)



export {app}