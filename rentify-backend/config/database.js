import mongoose from "mongoose";

export const connectDB = async()=>{
    const {connection} = await mongoose.connect(process.env.MONGO_URL,{
        dbName:"Backend-Rentify"
    })
    console.log(`MongoDB is conneceteed ${connection.host}`)
}