import { Router } from "express";
import z from "zod";
import { adminModel, courseModel} from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { adminCheck } from "../Middlewares/auth.js";

const adminRouter = Router();

adminRouter.post('/signup',async (req,res)=>{
    
    const val = z.object({
        email:z.string().min(3).max(50).superRefine((val,ctx)=>{
            if (!/[@]/.test(val)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.too_big,
                    message:"your email format is not correct   "
                  });
                  return
            }
        }),
        password:z.string().min(3).max(50),
        firstName:z.string().min(3).max(50),
        lastName:z.string().min(3).max(50)  
    })
    
    const parseCheck = val.safeParse(req.body)
    // console.log(parseCheck.data);

    if (!parseCheck.success) {
        return res.send({
            msg:parseCheck.error
        })
    }

const {email, password, firstName, lastName} = req.body;

const hashedPass = await bcrypt.hash(password,5)
// hashing the password



try {
    const response = await adminModel.create({
        email:email,
        password:hashedPass,
        firstName:firstName,
        lastName:lastName
    });

    return res.send({
        msg: "your data uploaded successfully"
    });


} catch (error) {

    return res.send({
        err: "can not upload your data",
        err2:error.message
    })
}
});

adminRouter.post('/signin',async (req,res)=>{


const {email, password,} = req.body;

try {
    const result = await adminModel.findOne({
       email:email,
    });
    
    const verifyPass = await bcrypt.compare(password,result.password)
    if (result&&verifyPass) {
        const token = jwt.sign({
            id: result._id.toString()
        },process.env.JWT_SECRET2);

        if (token) {
            res.send({
                token:token,
                user:result
            })
        }

    }
    else{
        res.json({
            msg: "can not locate user"
        })
        return
    }

} catch (error) {
    res.json({
        msg:"some error in finding the user",
        msg2:error.message
    })
}


});



adminRouter.post('/add', adminCheck, async (req,res)=>{
    const id = req.creatorId;
    console.log(id)
    const {title, description, price, imageUrl} = req.body;
    try {
        await courseModel.create({
            title:title,
            description:description,
            price:price,
            imageUrl:imageUrl,
            creatorId:id,
        })

        return res.status(201).send({
            msg:"course added",
        })
    } catch (error) {
        return res.send({
            err:error.message
        })
    }


})


adminRouter.put('/update', adminCheck, async (req,res)=>{
    const id = req.creatorId;
    const {title, description, price, imageUrl,courseId} = req.body;
    try {
        await courseModel.findOne({
            _id:courseId,
            creatorId:id
        })

        console.log(courseModel)

        if(!courseModel){
            return res.send({
                msg:"can not get your course"
            })
        }

        else{
            await courseModel.updateOne({
                _id:courseId,
                creatorId:id
            },
            {
                title:title,
                description:description,
                price:price,
                imageUrl:imageUrl,
                creatorId:id,
            })
    
            return res.status(201).send({
                msg:"course updated",
            })

        }

    } catch (error) {
        return res.send({
            err:error.message
        })
    }


})

adminRouter.get('/all',adminCheck, async (req,res)=>{
    const id = req.creatorId
    try {
        const allCourse = await courseModel.find({
            creatorId:id
        })

        if (!courseModel) {
            return res.send({
                msg:"you have no course"
            })
        }
        else{
            return res.send({
                msg:allCourse
            })
        }
    } catch (error) {
        res.send({
            err0:"some error on getting all the course",
            err1:error.message
        })
    }
})

export {adminRouter};