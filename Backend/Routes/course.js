import { Router } from "express";
import { courseModel } from "../db.js";
import { adminCheck, userCheck } from "../Middlewares/auth.js";
import { purchaseModel } from "../db.js";

const courseRouter = Router();


courseRouter.get('/preview',async(req,res)=>{
  const course = await courseModel.find({});

  res.json({
    msg:course
  })

})


courseRouter.post('/purchase',userCheck,async (req,res)=>{
    const id = req.creatorId;
    const {courseId} = req.body;

    await purchaseModel.create({
         userId: id,
         courseId:courseId
    });

    res.json({
        msg:"your have successfully purchased the course"
    })


})


courseRouter.get('/mycourse',userCheck,async(req,res)=>{
    const id = req.creatorId;
    const {courseId} = req.body;
    
    const mycourse = await purchaseModel.find({
        userId:id,
        courseId:courseId
    });

    const mycourse2 = await courseModel.find({
        _id:courseId
    })
    
    res.send({
        msg2:mycourse2
    })


})


export {courseRouter}