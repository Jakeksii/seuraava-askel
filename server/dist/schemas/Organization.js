"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const OrganizationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        index: true
    },
    business_id: {
        type: String,
        required: true,
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipcode: { type: String, required: true },
        country: { type: String, required: true },
        coordinates: {
            type: [Number],
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
                validator: function (value) {
                    return value ? validator_1.default.isEmail(value) : true;
                },
                message: 'Invalid email address'
            }
        },
        phone: {
            type: String,
            trim: true,
            validate: {
                validator: (value) => {
                    return value ? validator_1.default.isMobilePhone(value) : true;
                },
                message: "Invalid phone number"
            }
        }
    },
    contact_info_visible: { type: Boolean, default: true },
    visible: { type: Boolean, default: false },
    organization_users: [{
            user_id: { type: mongoose_1.Types.ObjectId, ref: 'User' },
            user_name: String,
            user_email: String,
            role: String
        }],
    created_by: String,
    updated_by: String //User _id. Server will set this value
}, { timestamps: true }); //adds createdAt, updatedAt
exports.default = OrganizationSchema;
