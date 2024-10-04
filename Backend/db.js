import mongoose, {model} from "mongoose";
import { number, string } from "zod";


const schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;



const userSchema = new schema({
     email:{type:String, unique: true},
     password:{type:String},
     firstName:{type:String},
     lastName:{type:String},
});

const courseSchema = new schema({
     title:{type:String},
     description:{type:String},
     price:{type:Number},
     imageUrl:{type:String},
     creatorId:objectId,
})

const adminSchema = new schema({
     email:{type:String, unique: true},
     password:{type:String},
     firstName:{type:String},
     lastName:{type:String},
})

const purchaseSchema = new schema({
     courseId: objectId,
     userId:objectId
})

const userModel = mongoose.model("user", userSchema);
const courseModel = mongoose.model("course", courseSchema);
const adminModel = mongoose.model("admin", adminSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);


export{userModel, courseModel, adminModel, purchaseModel}


