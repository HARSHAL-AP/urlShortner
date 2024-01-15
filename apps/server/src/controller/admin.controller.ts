import { Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../model/admin.model";
import { AdminModel } from "../interface/admin.interface";
import { getLocation } from "../services/assess";
import env from "../config/env";

const key = env.KEY;

class AdminController {
  async getall(req: Request, res: Response): Promise<void> {
    try {
      const data = await Admin.find();
      res.status(200).json({
        isError: false,
        data,
      });
    } catch (error) {
      res.status(500).json({
        isError: true,
        error,
      });
    }
  }
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { userName, email, password, locationInfo, deviceInfo } = req.body;
      const existingUser = await Admin.findOne({ email });

      if (existingUser) {
        res.status(409).json({
          isError: true,
          errorLog: "account Allready Exist wiht this Email",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser: AdminModel = new Admin({
        userName,
        email,
        password: hashedPassword,
        createbyIp: req.ip,
        isActive: true,
        createdBydevice: deviceInfo,
      });
      await newUser.save();
      res.status(201).json({
        isError: false,
        message: "User registered successfully",
      });
    } catch (error) {
      res.status(500).json({
        isError: true,
        message: "Internal Server Error",
        error,
      });
    }
  }
  async login(req: Request, res: Response): Promise<void> {
    try {
     const {email,password,locationInfo, deviceInfo}=req.body;
    const admin=await Admin.findOne({email})
    if(!admin){
        res.status(401).json({
            isError: true,
            message: "Invalid credentials",
          });
          return;
    }
    const isPasswordValid= await bcrypt.compare(password,admin.password)
    if (!isPasswordValid) {
        res.status(401).json({
          isError: true,
          message: "Invalid credentials",
        });
        return;
      }
      const token = jwt.sign({ userId: admin._id.toString() }, key, {
        expiresIn: "24h",
      });
      const loginIp:any = {
        ipAddress: req.ip ?? "Unknown",
        location: locationInfo,
        device: deviceInfo,
        isActive: true,
        timestamp: Date.now(),
        jwttoken:token
      };

      admin.loginLogs.push(loginIp);
      await admin.save();
      res.cookie("authtoken", token, {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
      });
      res.status(200).json({
        isError: false,
        authToken: token,
        user: {
          userName:admin.userName,
          email: admin.email,
        },
      });
    } catch (error) {
      res.status(500).json({
        isError: true,
        error,
      });
    }
  }
  async getAuthonticated(req: Request, res: Response): Promise<void> {
    try {
      const authToken = req.cookies.authtoken;

      if (authToken) {
        const decoded = jwt.verify(authToken, env.KEY) as { userId: string };
        const user = await Admin.findById(decoded.userId);

        if (user) {
          res.status(200).json({
            isError: false,
            authToken,
            user: {
              userName: user.userName,
              email: user.email,
            },
          });
        } else {
          res.status(401).json({
            isError: true,
            isAuthenticated: false,
            message: "User not found",
          });
        }
      } else {
        res.status(401).json({
          isError: true,
          isAuthenticated: false,
          message: "Token not provided. Authentication failed.",
        });
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      res.status(500).json({
        isError: true,
        isAuthenticated: false,
        error,
      });
    }
  }
  async logout(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.query;
      const { locationInfo, deviceInfo } = req.body;
      const ip = req.ip;
      if (!token) {
        res.status(400).json({
          isError: true,
          message: "Token is missing in the query parameters",
        });
        return;
      }

      res.clearCookie("authtoken", {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
      });

      try {
        const decodedToken = jwt.verify(token as string, key || "") as {
          userId: string;
        };

        const user = await Admin.findById(decodedToken.userId);

        if (user) {
          const loginLogToUpdate = user.loginLogs.find(
            (log) => log.ipAddress === ip
          );

          if (loginLogToUpdate) {
            loginLogToUpdate.isActive = false;
          }
         
          await user.save();

          res.status(200).json({
            isError: false,
            message: "Logout successful",
          });
        } else {
          res.status(404).json({
            isError: true,
            message: "User not found",
          });
        }
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          res.status(401).json({
            isError: true,
            message: "Token expired. User logged out.",
          });
        } else {
          console.error("Error during logout:", error);
          res.status(500).json({
            isError: true,
            message: "Internal server error",
          });
        }
      }
    } catch (error) {
      console.error("Error clearing cookie:", error);
      res.status(500).json({
        isError: true,
        message: "Internal server error",
      });
    }
  }
  async updatpassword(req: Request, res: Response): Promise<void> {
    try {
    
      const { oldpassword, newpassword,userid } = req.body;
  
      
      const user:any = await Admin.findById({_id:userid});
  
      if (!user) {
         res.status(404).json({
          isError: true,
          message: "User not found",
        });
      }
  
     
      const isPasswordMatch = await bcrypt.compare(oldpassword, user.password);
  
      if (!isPasswordMatch) {
         res.status(401).json({
          isError: true,
          message: "Incorrect old password",
        });
      }
  
      
      const hashedPassword = await bcrypt.hash(newpassword, 10);
      user.password = hashedPassword;
  
      
      const updatedUser = await user.save();
  
      res.status(200).json({
        isError: false,
        updatedUser,
      });
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({
        isError: true,
        error: "Internal Server Error",
      });
    }
  }
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      const deletedUser = await Admin.findByIdAndDelete(userId);

      if (deletedUser) {
        res.status(200).json({
          isError: false,
          deletedUser,
        });
      } else {
        res.status(404).json({
          isError: true,
          message: "User not found",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({
        isError: true,
        error,
      });
    }
  }
  async updateLoginactivity(req:Request,res:Response):Promise<void>{
    try {
      const {userid,objectid}=req.body;
       
      if(!userid||!objectid){
        res.status(400).json({ error: 'Invalid input parameters' }); 
      }
       
      const user:any=await Admin.findById({_id:userid})

      if(!user){
        res.status(404).json({ error: 'User not found' });
      }
      const loginActivityIndex = user.loginLogs.findIndex(
        (activity:any) => activity._id.toString() === objectid
      );
      if (loginActivityIndex === -1) {
        res.status(404).json({ error: 'Login activity not found' });
      }
  
     
      user.loginLogs[loginActivityIndex].isActive = false;
  
      // Save the updated user
      await user.save();

      res.status(200).json({ message: 'Login activity updated successfully' });

    } catch (error) {
      console.error('Error updating login activity:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}


export default AdminController