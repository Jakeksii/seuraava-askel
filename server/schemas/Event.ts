import { Schema, Types} from "mongoose";

export interface IEvent {
    _id: Types.ObjectId
    start_date: Date
    end_date: Date
    title: string
    extract: string
    visible: boolean
    address: {
        street: string
        city: string
        state: string
        zipcode: string
        country: string
        coordinates: [number, number]
    }
    image_id: string
    event_meta: {
        speaker: string
        music: string
        presenter: string
    }
    organization: {
        organization_id: String,
        organization_name: String,
    }
    created_by: string
    updated_by: string
    createdAt?: Date,
    updatedAt?: Date,
    __v?: number
}

const Event = new Schema<IEvent>({

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
        coordinates: { //Documentation https://www.mongodb.com/docs/manual/reference/operator/query/nearSphere/#-nearsphere
            type: [Number], // [longitude, latitude]
            index: '2dsphere',
            required: true
        }
    },
    image_id: String,
    event_meta: {
        speaker: {type: String, maxlength: 20},
        music: {type: String, maxlength: 20},
        presenter: {type: String, maxlength: 20},
    },
    organization: {
        organization_id: Types.ObjectId,
        organization_name: { type: String, index: true }
    },
    
    created_by: Types.ObjectId,
    updated_by: String


}, {timestamps: true}); //adds createdAt, updatedAt

export default Event;