import mongoose, { Schema, Document } from "mongoose";
import { UserModel as IUserModel } from "../interface/user.interface";
import crypto from "crypto";

interface UserLoginLog {
  ipAddress: string;
  timestamp: any;
  device: {
    type: string;
    browser: string;
    version: string;
    os: string;
    platform: string;
  };
  location: {
    ip: string;
    city: string;
    region: string;
    country: string;
    loc: string;
    org: string;
    postal: string;
    timezone: string;
  };
  jwtToken:string;
  isActive: boolean;
}

interface UserModel extends Document, IUserModel {
  loginLogs: UserLoginLog[];
}

const UserSchema: Schema<UserModel> = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    organizationName: { type: String },
    customDomain: { type: String },
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
        jwtToken:{type:String,require:true},
        isActive:{type:Boolean}
      },
    ],
    accessToken: { type: String, require: true, unique: true },
    registrationDate: { type: Date },
    lastLogin: { type: Date },
    isActive: { type: Boolean, required: true },
  },
 
);

UserSchema.pre<UserModel>("save", async function (next) {
  const user = this;

  if (!user.accessToken) {
    user.accessToken = generateUniqueAccessToken();
  }

  next();
});

function generateUniqueAccessToken(): string {
  const length = 14;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let accessToken = "";

  while (accessToken.length < length) {
    const randomBytes = crypto.randomBytes(1);
    const randomIndex = randomBytes[0] % characters.length;
    accessToken += characters.charAt(randomIndex);
  }

  return accessToken;
}

const UserModel = mongoose.model<UserModel>("User", UserSchema);

export default UserModel;
