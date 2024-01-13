import dotenv from "dotenv";
import mongoose from "mongoose";
import UserSchema from "../schemas/User";

dotenv.config();
const url = process.env.USING_PUBLIC_DB ? (process.env.MONGO_URL_USER!) : (process.env.MONGO_URL_USER_LOCAL!)
const UserConn = mongoose.createConnection(url)

UserConn.model("User", UserSchema)

export const User = UserConn.models.User

export default UserConn