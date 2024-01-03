import { Document } from "mongoose";
export interface AccessLog {
    ipAddress: string;
    location: string;
    timestamp: Date;
    device:{
            type:any;
            browser:any;
            version:any;
            os:any;
            platform:any;
    };
  }
  
export interface UrlModel extends Document {
    originalUrl: string;
    shortUrl: string;
    title?:string;
    createdByIp: string;
    createdBydevice:{
        type:any;
        browser:any;
        version:any;
        os:any;
        platform:any;
    };
    linkDescription: string;
    accessCount: number;
    accessLogs: Array<{
        ipAddress: string;
        location: string;
        timestamp: Date;
        device:{
            type:any;
            browser:any;
            version:any;
            os:any;
            platform:any;
        };
    }>;
    tags: Array<string>;
    expiryDate?: Date; 
    accessToken:string;
   

}
