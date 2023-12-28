import mongoose, { Schema, Document } from "mongoose";
import { UserModel as IUserModel } from "../interface/user.interface";
import crypto from "crypto";

interface UserLoginLog {
  ipAddress: string;
  location: string;
  timestamp: string;
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
    loginLogs: [
      {
        ipAddress: { type: String, required: true },
        location: { type: String, required: true },
        timestamp: { type: String, required: true },
      },
    ],
    accessToken: { type: String, require: true, unique: true },
    registrationDate: { type: Date },
    lastLogin: { type: Date },
    isActive: { type: Boolean, required: true },
  },
  { timestamps: true }
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
