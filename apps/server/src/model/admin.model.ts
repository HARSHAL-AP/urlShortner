import mongoose,{Schema} from "mongoose";
import {  AdminModel } from "../interface/admin.interface";


const AdminSchema:Schema<AdminModel>=new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
   
    createbyIp: { type: String, required: true },
    createdBydevice: {
        type: {
          type: String,
          enum: ["mobile", "tablet", "desktop", "unknown"],
          default: "unknown",
        },
        browser: { type: String },
        version: { type: String },
        os: { type: String },
        platform: { type: String },
      },
      loginLogs: [
        {
          ipAddress: { type: String, required: true },
          location: {
            ip: { type: String },
            city: { type: String },
            region: { type: String },
            country: { type: String },
            loc: { type: String },
            org: { type: String },
            postal: { type: String },
            timezone: { type: String },
          },
          device: {
            type: {
              type: String,
              enum: ["mobile", "tablet", "desktop", "unknown"],
              default: "unknown",
            },
            browser: { type: String },
            version: { type: String },
            os: { type: String },
            platform: { type: String },
          },
          timestamp: { type: Date, default: Date.now },
          isActive:{type:Boolean},
          jwttoken:{type:String,required:true}
        },
      ],
}, { timestamps: true })


const AdminModel=mongoose.model<AdminModel>("admin",AdminSchema)

export default AdminModel;