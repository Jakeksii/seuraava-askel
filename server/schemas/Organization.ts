import { Schema, Types } from "mongoose";
import validator from "validator";
import { IOrganization } from "../types";

export default new Schema<IOrganization>({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    status: {
        type: String,
        required: true,
        default: 'inreview',
        enum: ['verified', 'inreview', 'suspended']
    },
    business_id: { //Y-koodi
        type: String,
        required: true,
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipcode: { type: String, required: true },
        country: { type: String, required: true },
    },
    location: {
        type: {
            type: String,
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number, Number],
            required: true
        }
    },
    contact_info: {
        email: {
            type: String,
            lowercase: true,
            trim: true,
            validate: {
                validator: function (value: any) {
                    return value ? validator.isEmail(value) : true;
                },
                message: 'Invalid email address'
            }
        },
        phone: {
            type: String,
            trim: true,
            validate: {
                validator: (value: any) => {
                    return value ? validator.isMobilePhone(value) : true;
                },
                message: "Invalid phone number"
            }
        }
    },
    dummydata: { type: String },
    contact_info_visible: { type: Boolean, default: true },
    visible: { type: Boolean, default: false }, // If Organization passses the validation prosess, value will be set to true.
    organization_users: [{
        user_id: { type: Types.ObjectId, ref: 'User' },
        user_name: String,
        user_email: String,
        role: String,
        invited_by: Types.ObjectId,
        updated_by: Types.ObjectId,
        created_at: Date,
        updated_at: Date
    }],
    created_by: String, //User _id. Server will set this value
    updated_by: String  //User _id. Server will set this value

}, { timestamps: true }); //adds createdAt, updatedAt