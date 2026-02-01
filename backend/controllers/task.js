import TASK from "../models/task.js";

const createTask=async (req,res)=>{
try {
    const {title,description,status}=req.body;
    const result=await TASK.create({title,description,status,userId:req.user._id});
    if(result){
        return res.status(201).json({success:true,mssg:"Task Added"});
    }
    return res.status(404).json({success:false,mssg:"Something Went Wrong"})
} catch (err) {
    console.log(`${err}`);
    return res.status(500).json({success:false,mssg:"Internal Server Down"});
}
}

const editTask=async (req,res)=>{
    try {
        const {title,description,status,_id}=req.body;
        const result=await TASK.findByIdAndUpdate(_id,{title,description,status});
        if(result){
        return res.status(200).json({success:true,mssg:"Task Updated"});
    }
    return res.status(404).json({success:false,mssg:"Something Went Wrong"})

    } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({success:false,mssg:"Internal Server Down"});
    }
}
const deleteTask=async (req,res)=>{
    try {
        const {_id}=req.body;
        const result=await TASK.findByIdAndDelete(_id);
        if(result){
        return res.status(201).json({success:true,mssg:"Task Delete"});
    }
    return res.status(404).json({success:false,mssg:"Something Went Wrong"})
    } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({success:false,mssg:"Internal Server Down"});
    }
}

const getTask=async (req,res)=>{
    try {
        const {taskId}=req.query;
        const task=await TASK.findById(taskId);
        if(task) return res.status(200).json({success:true,task});
        return res.status(404).json({success:false,mssg:"Something Went Wrong"});
        
    } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({success:false,mssg:"Internal Server Down"});   
    }
}

const getAllTask=async (req,res)=>{
    try{
        const userId=req.user._id;
        const allTasks=await TASK.find({userId:userId}).sort({createdAt:-1})
        if(allTasks) return res.status(200).json({success:true,allTasks});
        return res.status(404).json({success:false,mssg:"Something Went Wrong"});
        
    } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({success:false,mssg:"Internal Server Down"});   
    }
}


export {createTask,editTask,deleteTask,getTask,getAllTask};