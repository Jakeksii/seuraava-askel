
import { Schema, Types} from "mongoose";
import { IEvent } from "./Event";


// settings schema will be added here

export interface Settings {
    _id: Types.ObjectId     // id
    max_distance: Number       // etäisyys filtteri
    liked_events: [     // haluanko listan jossa on objekteja, vai objektin jossa on lista???
        {
            event: IEvent
            likedAt: Date
        }
    ]

}
