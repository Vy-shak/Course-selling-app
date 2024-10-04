
import jwt from "jsonwebtoken";


function adminCheck(req,res,next) {
    console.log(req.headers.token)
    const token = req.headers.token;
    
    const decode = jwt.verify(token,process.env.JWT_SECRET2);
    console.log(decode)

    if (decode) {
        req.creatorId = decode.id;
        next()
    }
    else{
        return res.send({
            msg:"some error in the token"
        })
    }
}

function userCheck(req,res,next) {
    console.log(req.headers.token)
    const token = req.headers.token;
    
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    console.log(decode)

    if (decode) {
        req.creatorId = decode.id;
        next()
    }
    else{
        return res.send({
            msg:"some error in the token"
        })
    }
}

export {adminCheck, userCheck};