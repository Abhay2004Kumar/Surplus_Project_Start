import express from "express"
import http from "http"
import {Server} from "socket.io"
import cors from "cors"
import cookieParser from "cookie-parser"  //used for applying CRUD operation on cookies
import axios from "axios"
import dotenv from "dotenv"

dotenv.config();

const app=express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Allow requests from the frontend
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
})

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


app.get("/api/v1/location", async (req, res) => {
    try {
        const token = process.env.IP_TOKEN; // Your IPInfo API token
        const response = await axios.get(`https://ipinfo.io/json?token=${token}`);
        res.json(response.data); // Send the API response back to the frontend
    } catch (error) {
        console.error("Error fetching location:", error.message);
        res.status(500).json({ error: "Unable to fetch location" });
    }
});

// Socket.IO connection
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
  
    // Handle events from the client
    socket.on("sendNotification", (notification) => {
      console.log("Received notification:", notification);
  
      // Broadcast notification to all connected clients
      io.emit("receiveNotification", notification);
    });
  
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });


export {app}