import { Schema, Types} from "mongoose";
import validator from "validator";
// Tyyppi = objektin rakenne
export interface IUser {
    _id: Types.ObjectId,
	first_name: string,
	last_name: string,
	email: string,
    password?: string,
	verified?: boolean,
	organizations: [{
        organization_id: Types.ObjectId
        organization_name: string
        role: string
        _id: Types.ObjectId
    }]
    createdAt?: Date,
	updatedAt?: Date,
	__v?: number,
}

const User = new Schema<IUser>({
    first_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 15
    },
    last_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 15
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true,
        index: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(value:string) {
                return validator.isEmail(value);
            },
            message: 'Invalid email address'
        }
    },
    password: { //Normally would have more configurations
        type: String,
        required: true,
        minlength: 5
    },
    organizations: [{
        organization_id: { type: Types.ObjectId, ref: 'Organization' },
        organization_name: { type: String },
        role: String,
    }],
    verified: {type: Boolean, default: false}

}, {timestamps: true}); //adds createdAt, updatedAt

export default User;