"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EventPage = new mongoose_1.Schema({
    url: { type: String, index: true },
    event_id: String,
    organization_id: String,
    page_data: String,
    created_by: String,
    updated_by: String
}, { timestamps: true }); //adds createdAt, updatedAt
exports.default = EventPage;
