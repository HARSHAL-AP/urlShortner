import { Document } from "mongoose";

export interface UserModel extends Document {
  userName: string;
  email: string;
  password: string;
  organizationName?: string;
  customDomain?: string;
  createbyIp: string;
  createdBydevice: {
    type: any;
    browser: any;
    version: any;
    os: any;
    platform: any;
  };
  loginLogs: Array<{
    ipAddress: string;
    location: {
      ip: string;
      city: string;
      region: string;
      country:string;
      loc:string;
      org:string;
      postal:string;
      timezone:string;
    };
    timestamp: Date;
    device: {
      type: any;
      browser: any;
      version: any;
      os: any;
      platform: any;
    };
    jwtToken:string;
    isActive: boolean;
  }>;
  accessToken: string;
  registrationDate?: Date;
  lastLogin?: Date;
  isActive: boolean;
}
