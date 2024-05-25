import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import propertyRoutes from "./routes/propertyRoutes.js"
import userRoutes from "./routes/userRoutes.js"

config({path:"./config/config.env"})

export const app = express()

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['GET','POST','PUT','DELETE'],
    credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api",propertyRoutes)  
app.use("/api",userRoutes)  
// app.use("/api",createRoutes)
// app.use("/api/seller",sellerRoutes)
// app.use("/api/buyer",buyerRouter)

