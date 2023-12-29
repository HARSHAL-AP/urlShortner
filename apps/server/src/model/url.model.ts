import mongoose, { Schema } from "mongoose";
import { UrlModel } from "../interface/url.interface";

const urlSchema = new Schema(
  {
    originalUrl: { type: String, required: true, validate: { validator:Boolean, message: String } },
    shortUrl: { type: String, required: true },
    createdByIp: { type: String, required: true },
    linkDescription: { type: String },
    title:{type:String},
    accessCount: { type: Number, default: 0 },
    accessLogs: [
      {
        ipAddress: { type: String },
        location: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    tags: [{ type: String }],
    expiryDate: { type: Date ,default:null},
    accessToken:{type:String,required:true}
   
  },
  { timestamps: true }
);

export default mongoose.model<UrlModel>("Url", urlSchema);
