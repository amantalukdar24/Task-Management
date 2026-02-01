import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
async function AuthUser(req,res,next){
     try {
        const token=req.headers["authorization"];
        if(!token) return res.status(403).json({success:false,mssg:"Unauthorized Access"});
        const decoded=await jwt.verify(token,process.env.JWT_KEY);
        if(!decoded) return res.status(403).json({success:false,mssg:"Unauthorized Access"});
        req.user=decoded;
        next();
     } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({success:false,mssg:"Internal Server Down"});
     }
}
export {AuthUser};