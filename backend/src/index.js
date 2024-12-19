import dotenv from "dotenv"

import mongoose from "mongoose";
import {DB_NAME} from "./constants.js";
import {app} from "./app.js"

import connectDB from "./db/index.js";


dotenv.config({
    path: './.env'
})

//professional approach
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MONGODB connection failed !",error);
})



