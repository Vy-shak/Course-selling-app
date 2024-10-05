import { Router } from "express";
import z from "zod";
import { userModel } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";




const userRouter = Router();

userRouter.post('/signup', async (req, res) => {

    const val = z.object({
        email: z.string().min(3).max(50).superRefine((val, ctx) => {
            if (!/[@]/.test(val)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.too_big,
                    message: "your email format is not correct   "
                });
                return
            }
        }),
        password: z.string().min(3).max(50),
        firstName: z.string().min(3).max(50),
        lastName: z.string().min(3).max(50)
    })

    const parseCheck = val.safeParse(req.body)
    // console.log(parseCheck.data);

    if (!parseCheck.success) {
        return res.send({
            msg: parseCheck.error
        })
    }

    const { email, password, firstName, lastName } = req.body;

    const hashedPass = await bcrypt.hash(password, 5)
    // hashing the password



    try {
        const response = await userModel.create({
            email: email,
            password: hashedPass,
            firstName: firstName,
            lastName: lastName
        });

        return res.send({
            msg: "your data uploaded successfully"
        });


    } catch (error) {

        return res.status(401).send({
            err: "can not upload your data",
            err2: error.message
        })
    }
});

userRouter.post('/signin', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;


    try {
        const result = await userModel.findOne({
            email: email,
            firstName: firstName,
            lastName: lastName
        });

        const verifyPass = bcrypt.compare(password, result.password)

        if (result && verifyPass) {
            const token = jwt.sign({
                id: result._id.toString()
            }, process.env.JWT_SECRET);

            if (token) {
                res.send({
                    token: token,
                    user: result
                })
            }

        }
        else {
            res.json({
                msg: "can not locate user"
            })
            return
        }

    } catch (error) {
        res.json({
            msg: "some error in finding the user",
            msg2: error.message
        })
    }


});

export { userRouter };