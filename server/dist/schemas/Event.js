"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Event = new mongoose_1.Schema({
    start_date: {
        type: Date,
        require: true
    },
    end_date: {
        type: Date,
        require: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 65,
        minlenght: 5,
        index: true
    },
    extract: {
        type: String,
        required: true,
        maxlength: 260,
        minlenght: 25,
    },
    visible: {
        type: Boolean,
        default: true
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true, index: true },
        state: { type: String, required: true },
        zipcode: { type: String, required: true },
        country: { type: String, required: true },
        coordinates: {
            type: [Number],
            index: '2dsphere',
            required: true
        }
    },
    image_id: String,
    event_meta: {
        speaker: { type: String, maxlength: 20 },
        music: { type: String, maxlength: 20 },
        presenter: { type: String, maxlength: 20 },
    },
    organization: {
        organization_id: mongoose_1.Types.ObjectId,
        organization_name: { type: String, index: true }
    },
    created_by: mongoose_1.Types.ObjectId,
    updated_by: String
}, { timestamps: true }); //adds createdAt, updatedAt
exports.default = Event;
