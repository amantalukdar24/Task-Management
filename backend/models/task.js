import { Schema,model } from "mongoose";

const taskSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        default:""
    },
    status:{
        type:String,
        required:true,
        enums:["Pending","Ongoing","Done"]
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
    }
},{
    timestamps:true
});
const TASK=model("task",taskSchema);
export default TASK;