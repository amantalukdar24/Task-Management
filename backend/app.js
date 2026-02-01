import express, { urlencoded } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js"
dotenv.config();
const app=express();
const PORT=process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL).then(()=>{ console.log("Mongo Connected")
}).catch((err)=>{console.log(`Mongo Error:${err}`)});
app.use(cors());
app.use(urlencoded());
app.use("/user",userRouter);
app.use("/task",taskRouter);
app.listen(PORT,()=>{
    console.log(`Server Running on PORT:${PORT}`);
});