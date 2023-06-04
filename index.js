import express from "express";
import { studentsRouter } from "./Routers/students.js";
import dotenv from "dotenv"
import { mentorRouter } from "./Routers/mentor.js";
import cors from "cors"

//config the environment
dotenv.config();
const PORT = process.env.PORT

//initiating the server
const app = express();

//middleware
app.use(express.json());
app.use(cors())

//students routers
app.use("/students",studentsRouter)

//mentors router 
app.use("/mentors",mentorRouter)
//start the server
app.listen(PORT,()=>console.log(`server started in localhost:${PORT}`))