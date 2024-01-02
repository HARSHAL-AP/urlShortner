import { Document } from "mongoose";

export interface UserModel extends Document {
    userName: string;
    email: string;
    password: string;
    organizationName?: string;
    customDomain?: string;
    createbyIp: string;
    loginLogs: Array<{
        ipAddress: string;
        location: string;
        timestamp: string; 
    }>;
    accessToken:string;
    registrationDate?: Date; 
    lastLogin?: Date; 
    isActive: boolean; 
}
