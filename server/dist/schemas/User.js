"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const User = new mongoose_1.Schema({
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
            validator: function (value) {
                return validator_1.default.isEmail(value);
            },
            message: 'Invalid email address'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    organizations: [{
            organization_id: { type: mongoose_1.Types.ObjectId, ref: 'Organization' },
            organization_name: { type: String },
            role: String,
        }],
    verified: { type: Boolean, default: false }
}, { timestamps: true }); //adds createdAt, updatedAt
exports.default = User;
