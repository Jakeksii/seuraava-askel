"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EmailVerification = new mongoose_1.Schema({
    user_id: { Type: mongoose_1.Types.ObjectId },
}, { timestamps: true, expires: 86400 }); //adds createdAt, updatedAt, 86400 = 1 day
exports.default = EmailVerification;
