import { Document } from "mongoose";

export interface UrlModel extends Document {
    originalUrl: string;
    shortUrl: string;
    title?:string;
    createdByIp: string;
    linkDescription: string;
    accessCount: number;
    accessLogs: Array<{
        ipAddress: string;
        location: string;
        timestamp: Date;
    }>;
    tags: Array<string>;
    expiryDate?: Date; 
    accessToken:string;
    
}
