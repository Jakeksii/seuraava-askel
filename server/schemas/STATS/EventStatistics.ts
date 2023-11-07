import { Schema, Types} from "mongoose";

export default new Schema ({
    organization_id: Types.ObjectId, // Link this stat to organization ( only user that has access to this organization can query this stat )
    event_id: Types.ObjectId, // Link this stat to event ( to make it easy to query only one events stats )
    event_title: {
        type: String,
        required: true, 
    },
    event_searches: {
        type: Number,
        default: 0
    },
    event_views: {
        type: Number,
        default: 0
    },
    event_unique_views: {
        type: Number,
        default: 0
    },
    event_location_views: {
        type: Number,
        default: 0
    },
    event_clicks: {
        type: Number,
        default: 0  
    },
    event_unique_clicks: {
        type: Number,
        default: 0
    },
    event_location_clicks: [
        {
            coordinates: {
                type: [Number, Number], // [longitude, latitude]
            },
        },
    ]
}, {timestamps: true});

