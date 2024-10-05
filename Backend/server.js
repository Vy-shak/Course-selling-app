import express, { application, urlencoded } from "express";
import { userRouter } from "./Routes/user.js";
import { courseRouter } from "./Routes/course.js";
import { adminRouter } from "./Routes/Admin.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"

const app = express();
app.use(cors());
dotenv.config();

app.use(express.json());
app.use(express.urlencoded());

app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/admin', adminRouter);



app.listen(3000, () => {
    console.log("app started listening on port 3000")
});

mongoose.connect(`mongodb+srv://vyshakn:${process.env.DB_PASS}@cluster0.twxk2.mongodb.net/userCourse`)