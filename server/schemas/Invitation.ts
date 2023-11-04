import { Schema, Types } from "mongoose";
import validator from "validator";
import { IInvitation } from "../types";

export default new Schema<IInvitation>({
    user_email: {
        type: String,
        required: true,
        trim: true,
        index: true,
        validate: {
            validator: function (value: string) {
                return validator.isEmail(value);
            },
            message: 'Invalid email address'
        }
    },
    role: { type: String, enum: ['user', 'admin', 'owner'], required: true },
    organization: {
        organization_id: { type: Types.ObjectId, required: true, index: true },
        organization_name: { type: String, required: true }
    },
    created_by: Types.ObjectId,
    updated_by: Types.ObjectId
}, { timestamps: true, expires: 604800 }); //adds createdAt, updatedAt. expires creates TTL (Time-To-Live) index in MongoDB. 604800 = 1 week