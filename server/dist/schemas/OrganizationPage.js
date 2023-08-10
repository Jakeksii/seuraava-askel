"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrganizationPage = new mongoose_1.Schema({
    organization_name: { type: String, unique: true, index: true },
    organization_id: mongoose_1.Types.ObjectId,
    image_id: String,
    page_data: String,
    created_by: mongoose_1.Types.ObjectId,
    updated_by: mongoose_1.Types.ObjectId
}, { timestamps: true }); //adds createdAt, updatedAt
exports.default = OrganizationPage;
