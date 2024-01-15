import jwt from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
import env from "../config/env"
import User from "../model/user.model"

export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token =req.cookies.authtoken;
  
    if (!token) {
      return res.status(401).json({ error: true, message: 'Unauthorized: Missing JWT token' });
    }
  
    try {
      const decoded = jwt.verify(token, env.KEY) as { userId: string };
      req.body.userid = decoded.userId; 
      next();
    } catch (error) {
      return res.status(401).json({ error: true, message: 'Unauthorized: Invalid JWT token' });
    }
  };



export const verifyUserAccestoken=async(req:Request,res:Response,next:NextFunction)=>{
  const accessToken = req.query.accessToken;
  if (!accessToken) {
    return res.status(400).json({ error: true, errorlog: 'Access Token is required' });
  }

  const user = await User.findOne({ accessToken });

  if (!user) {
    return res.status(401).json({ error: true, errorlog: 'Unauthorized: Invalid access token or user' });
  }
  
  req.body.accessToken =accessToken; 
  next();
}
