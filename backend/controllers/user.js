import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import USER from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();
const registerUser=async (req,res)=>{
    try{
          const {email,name,password}=req.body;
          const checkUser=await USER.findOne({email:email.toLowerCase()});
          if(checkUser) return res.status(400).json({success:false,mssg:"User already exist! Signin"});
          const hashPassword=await bcrypt.hash(password,10);
          const result=await USER.create({
            email:email.toLowerCase(),name,password:hashPassword
          });
          if(result){
           const token=jwt.sign({_id:result._id,email:result.email,name},process.env.JWT_KEY);
           return res.status(201).json({success:true,mssg:"Account Created",token});
          }
          return res.status(404).json({success:false,mssg:"Something Went Wrong"});
        }
    catch(err){
        console.log(`${err}`);
        return res.status(500).json({success:false,mssg:"Internal Server Down"});
    }
}

const signUser=async (req,res)=>{
    try{
        const {email,password} =req.body;
        const checkUser=await USER.findOne({email:email.toLowerCase()});
        if(!checkUser) return res.status(404).json({success:false,mssg:"Invalid Account or Password"});

        const comparePassword=await bcrypt.compare(password,checkUser.password);
        if(comparePassword) {
            const token=jwt.sign({_id:checkUser._id,email:checkUser.email,name:checkUser.name},process.env.JWT_KEY);
           return res.status(200).json({success:true,mssg:`Welcome Back ${checkUser.name}`,token});
        }
        return res.status(404).json({success:false,mssg:"Invalid Account or Password"});

    }
     catch(err){
        console.log(`${err}`);
        return res.status(500).json({success:false,mssg:"Internal Server Down"});
    }
}
const resetPass=async (req,res)=>{
    try{
         const {name,email,password}=req.body;
         const findUser=await USER.findOne({email:email.toLowerCase()});
         if(!findUser) return res.status(404).json({success:false,mssg:"This email is not registered ! Sign-Up"});
         if(findUser.name!==name) return res.status(404).json({success:false,mssg:"Invalid Name!"});
         const hashPassword=await bcrypt.hash(password,10);
         const result=await USER.findByIdAndUpdate(findUser._id,{password:hashPassword});
         if(result) return res.status(200).json({success:true,mssg:"Password Updated"});
         return res.status(404).json({success:false,mssg:"Something Went Wrong"})
    }
    catch(err){
        console.log(`${err}`);
        return res.status(500).json({success:false,mssg:"Internal Server Down"});
    }
}

export {registerUser,signUser,resetPass};