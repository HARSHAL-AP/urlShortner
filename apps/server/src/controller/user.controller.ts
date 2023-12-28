import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model/user.model";
import { UserModel } from "../interface/user.interface";
import { getLocation } from "../services/assess";
import env from "../config/env";
import crypto from "crypto";

const key = env.KEY;




class UserController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const data = await User.find();
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
      const { userName, email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        res.status(409).json({
          isError: true,
          message: "User with this email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser: UserModel = new User({
        userName,
        email,
        password: hashedPassword,
        createbyIp: req.ip,
        isActive: true,
        registrationDate: new Date(),
      });

      await newUser.save();

      const user: any = await User.findOne({ email });

      if (!user) {
        res.status(500).json({
          isError: true,
          message: "Error finding user after registration",
        });
      }

      const token = jwt.sign({ userId: user._id }, key, {
        expiresIn: "24h",
      });

      const loginIp = {
        ipAddress: req.ip ?? "Unknown",
        location: "Unknown",
        timestamp: new Date().toISOString(),
      };

      try {
        const locationInfo = await getLocation(req.ip);
        loginIp.location =
          locationInfo.city || locationInfo.region || "Unknown";
      } catch (error) {
        console.error("Error fetching location:", error);
      }

      user.loginLogs.push(loginIp);
      user.lastLogin = new Date();
      await user.save();
      res.cookie("authtoken", token, {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
      });
      res.status(201).json({
        isError: false,
        authTokne:token,
        accessToken: user.accessToken,
        message: "User registered successfully",
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({
        isError: true,
        message: "Internal Server Error",
        error: error || "Unexpected error",
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        res.status(401).json({
          isError: true,
          message: "Invalid credentials",
        });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({
          isError: true,
          message: "Invalid credentials",
        });
        return;
      }

      user.isActive = true;

      const token = jwt.sign({ userId: user._id.toString() }, key, {
        expiresIn: "24h",
      });

      const loginIp = {
        ipAddress: req.ip ?? "Unknown",
        location: "Unknown",
        timestamp: new Date().toISOString(),
      };

      try {
        const locationInfo = await getLocation(req.ip);
        loginIp.location =
          locationInfo.city || locationInfo.region || "Unknown";
      } catch (error) {
        console.error("Error fetching location:", error);
      }

      user.loginLogs.push(loginIp);
      user.lastLogin = new Date();
      await user.save();
      res.cookie("authtoken", token, {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
      });
      res.status(200).json({
        isError: false,
        accessToken: user.accessToken,
        authTokne:token,
        user: {
          userName: user.userName,
          email: user.email,
        }})
    } catch (error) {
      console.error("Error during login:", error);
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
        const user = await User.findById(decoded.userId);

        if (user) {
          res.status(200).json({
            isError: false,
            authToken,
            accessToken: user.accessToken,
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
      res.clearCookie("authtoken", {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
      });

      const token = req.headers.authorization?.replace("Bearer ", "");

      const decodedToken = jwt.verify(token || "", key || "") as {
        userId: string;
      };

      const user = await User.findById(decodedToken.userId);

      if (user) {
        user.isActive = false;
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
      console.error("Error during logout:", error);
      res.status(500).json({
        isError: true,
        error,
      });
    }
  }
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { userName, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          userName,
          email,
          password: hashedPassword,
        },
        { new: true }
      );

      if (updatedUser) {
        res.status(200).json({
          isError: false,
          updatedUser,
        });
      } else {
        res.status(404).json({
          isError: true,
          message: "User not found",
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({
        isError: true,
        error,
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      const deletedUser = await User.findByIdAndDelete(userId);

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
}
export default UserController;
