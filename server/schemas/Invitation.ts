import { Schema, Types } from "mongoose";
import validator from "validator";

export interface IInvitation {
    _id?: Types.ObjectId
    user_email: string
    organization: {
        organization_id: Types.ObjectId
        organization_name: string
    }
    expirationDate: Date
    created_by: Types.ObjectId
    updated_by?: Types.ObjectId
    createdAt?: Date
    updatedAt?: Date
    __v?: number
}

const Invitation = new Schema<IInvitation>({
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
    organization: {
        organization_id: { type: Types.ObjectId, required: true, ref: "Organization" },
        organization_name: { type: String, required: true }
    },
    created_by: Types.ObjectId,
    updated_by: Types.ObjectId
}, { timestamps: true, expires: 604800 }); //adds createdAt, updatedAt, 604800 = 1 week

export default Invitation;