import { Schema, Types} from "mongoose";
import { IEventStats } from "../../types";


export default new Schema<IEventStats> ({
    event_name: {   // link to main/events
        type: String,
        required: true,
        minlength: 2,
        maxlength: 15       
    },
    event_searches: {
        type: Number,
        required: true,   
    },
    event_views: {
        type: Number,
        required: true,   
    },
    event_unique_views: {
        type: Number,
        required: true,
    },
    event_location_views: {
        type: String,
        required: true,
    },
    event_clicks: {
        type: Number,
        required: true,   
    },
    event_unique_clicks: {
        type: Number,
        required: true,   
    },
    event_location_clicks: {
        type: String,
        required: true,
    },

}, {timestamps: true});

