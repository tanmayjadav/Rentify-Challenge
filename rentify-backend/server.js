import {app} from "./app.js";
import { connectDB } from "./config/database.js";

connectDB();
// FRONTEND_URL = https://seva-setu-v3.vercel.app
// BACKEND_URL = https://sevasetu-zpdg.onrender.com

console.log(`${process.env.FRONTEND_URL} - frontend-url`)
console.log(`${process.env.BACKEND_URL} - backend-url`)

app.listen(process.env.PORT,()=>{
    console.log(`server is working on ${process.env.PORT}`)
})
