import { Schema, Types } from "mongoose";

export interface IEmailVerification {
    _id: typeof Types.ObjectId
    user_id: typeof Types.ObjectId
    createdAt?: Date
    updatedAt?: Date
    __v?: number
}

const EmailVerification = new Schema<IEmailVerification>({
    user_id: {type: Types.ObjectId, required: true},
}, { timestamps: true, expires: 86400 }); //adds createdAt, updatedAt, 86400 = 1 day

export default EmailVerification;