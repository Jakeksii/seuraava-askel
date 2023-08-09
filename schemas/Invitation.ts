import { Schema, Types} from "mongoose";
import validator from "validator";

export interface IInvitation {
    _id?: Types.ObjectId
    user_email: string
    organization: {
        organization_id: Types.ObjectId
        organization_name: string
    }
    expires: Date
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
            validator: function(value:string) {
                return validator.isEmail(value);
            },
            message: 'Invalid email address'
        }
    },
    organization: {
        organization_id: { type: Types.ObjectId, required: true, ref: "Organization" },
        organization_name: { type: String, required: true }
    },
    expires: { type: Date, required: true },
    created_by: Types.ObjectId,
    updated_by: Types.ObjectId
}, {timestamps: true}); //adds createdAt, updatedAt

export default Invitation;