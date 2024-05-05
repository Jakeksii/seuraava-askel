import { Schema, Types } from "mongoose";
import { IEvent } from "../types";

const EventSchema = new Schema<IEvent>({
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
        maxlength: 1000,
        minlenght: 100,
    },
    description: {
        type: String,
        maxlength: 10000
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
    dummydata: String,
    image_id: { type: Schema.Types.ObjectId, required: true },
    meta: {
        denomination: { type: [String], maxlength: 200 },
        category: { type: [String], maxlength: 200 },
        age_group: { type: [String], maxlength: 200 },
        language: { type: [String], maxlength: 200 },
        price: {
            value: Number,
            currency: String
        },
        online: { type: Boolean, default: false }
    },
    organization: {
        _id: Types.ObjectId,
        name: { type: String, index: true }
    },

    created_by: Types.ObjectId,
    updated_by: Types.ObjectId
}, { timestamps: true }); //adds createdAt, updatedAt

export default EventSchema