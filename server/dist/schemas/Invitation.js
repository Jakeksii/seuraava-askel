"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const Invitation = new mongoose_1.Schema({
    user_email: {
        type: String,
        required: true,
        trim: true,
        index: true,
        validate: {
            validator: function (value) {
                return validator_1.default.isEmail(value);
            },
            message: 'Invalid email address'
        }
    },
    organization: {
        organization_id: { type: mongoose_1.Types.ObjectId, required: true, ref: "Organization" },
        organization_name: { type: String, required: true }
    },
    expires: { type: Date, required: true },
    created_by: mongoose_1.Types.ObjectId,
    updated_by: mongoose_1.Types.ObjectId
}, { timestamps: true }); //adds createdAt, updatedAt
exports.default = Invitation;
