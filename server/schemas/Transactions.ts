import { Schema, Types } from "mongoose";

export default new Schema({
    // WHO PAID AND WHAT WAS PAID INFO
    organization_id: { type: String, required: true, index: true },

    // PAYMENT INFO
    stamp: { type: String, required: true },
    transaction_id: { type: String, required: true, index: true },
    reference: { type: String, required: true },
    status: { type: String, required: true },
    
    created_by: String, //User _id. Server will set this value
    updated_by: String  //User _id. Server will set this value

}, { timestamps: true }); //adds createdAt, updatedAt

