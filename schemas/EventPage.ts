import { Schema, Types} from "mongoose";

export interface IEventPage {
    _id: Types.ObjectId
    url: string
    event_id: Types.ObjectId
    organization_id: Types.ObjectId
    page_data: string
    created_by: String
    updated_by: String
    createdAt?: Date,
    updatedAt?: Date,
    __v?: number
}

const EventPage = new Schema({

    url: {type: String, index: true},
    event_id: String,
    organization_id: String,
    page_data: String,
    created_by: String,
    updated_by: String

}, {timestamps: true}); //adds createdAt, updatedAt

export default EventPage;