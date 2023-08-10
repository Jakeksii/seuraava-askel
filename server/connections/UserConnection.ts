import mongoose from "mongoose";
import dotenv from "dotenv";

import UserSchema, { IUser } from "../schemas/User.js";

dotenv.config();

const url:string = process.env.MONGO_URL_USER ?? ""
const UserConn = mongoose.createConnection(url)

UserConn.model<IUser>("User", UserSchema)

export const User = UserConn.models.User

export default UserConn