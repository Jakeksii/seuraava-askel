import { Schema, Types} from "mongoose";
import validator from "validator";

export interface IOrganization {
    name: string,
    business_id: string,
    address: {
        street: string,
        city: string,
        state: string,
        zipcode: string,
        country: string,
        coordinates: [
            number,
            number
        ]
    },
    contact_info: {
        email: string,
        phone: string
    },
    contact_info_visible: boolean,
    visible?: boolean,
    organization_users: [{
        user_id: Types.ObjectId,
        user_name: String,
        user_email: String,
        role: String
        _id:Types.ObjectId
    }],
    created_by: Types.ObjectId,
    updated_by: Types.ObjectId,
    _id?: Types.ObjectId,
    createdAt?: Date,
    updatedAt?: Date,
    __v?: number
}
export interface IOrganizationUser {
    user_id: Types.ObjectId
    user_name: String
    user_email: String
    role: String
    test: string
}

const OrganizationSchema = new Schema<IOrganization>({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        index: true
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
        coordinates: { //Documentation https://www.mongodb.com/docs/manual/reference/operator/query/nearSphere/#-nearsphere
            type: [Number], // [longitude, latitude]
            index: '2dsphere',
            required: true
        }
    },
    contact_info: {
        email: {
            type: String,         
            lowercase: true,
            trim: true,
            validate: {
                validator: function(value:any) {
                    return value ? validator.isEmail(value) : true;
                },
                message: 'Invalid email address'
            }
        },
        phone: {
            type: String,
            trim: true,
            validate: {
                validator: (value:any) => {
                    return value ? validator.isMobilePhone(value) : true;
                },
                message: "Invalid phone number"
            }
        }
    },

    contact_info_visible: {type: Boolean, default: true},
    visible: {type: Boolean, default: false}, // If Organization passses the validation prosess, value will be set to true.
    organization_users: [{
        user_id: {type: Types.ObjectId, ref: 'User'},
        user_name: String,
        user_email: String,
        role: String
    }],
    created_by: String, //User _id. Server will set this value
    updated_by: String  //User _id. Server will set this value
    
}, {timestamps: true}); //adds createdAt, updatedAt

export default OrganizationSchema
