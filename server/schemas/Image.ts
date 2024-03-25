import { Schema, Types } from "mongoose";
import { IImage } from "../types";

export default new Schema<IImage>({
    name: { type: String, required: true },
    organization_id: { type: Schema.Types.ObjectId, required: true, index: true},
    created_by: Types.ObjectId,
    updated_by: Types.ObjectId
}, { timestamps: true });