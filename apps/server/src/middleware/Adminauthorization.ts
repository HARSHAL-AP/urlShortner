import jwt from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
import env from "../config/env"
import Admin from "../model/admin.model";


export const Adminauthorization=async(req:Request,res:Response,next:NextFunction)=>{
    const token =req.cookies.authtoken;
    if (!token) {
        return res.status(401).json({ error: true, message: 'Unauthorized: Missing JWT token' });
      }
      try {
        const decoded = jwt.verify(token, env.KEY) as { userId: string };
        
        req.body.userid = decoded.userId; 
        const user=await Admin.findOne({_id:req.body.userid}) 
        if(!user){
         res.status(401).json({ error: true, message: 'Unauthorized Access...' });
        }
        next();
      } catch (error) {
        return res.status(401).json({ error: true, message: 'Unauthorized: Invalid JWT token' });
      }


}