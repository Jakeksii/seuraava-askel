import { SEARCH_TYPE_CITY, SEARCH_TYPE_ORGANIZATION, SEARCH_TYPE_TITLE } from "./assets/constants"

// Sub types
interface Address {
    street: string
    city: string
    state: string
    zipcode: string
    country: string
    coordinates: [number, number]
}
interface ContactInfo {
    email: string,
    phone: string
}
export type FormattedDate = {
    startDate: string
    endDate: string
    startTime: string
    endTime: string
}

// EVENT
export interface Event {
    _id: string
    start_date: Date
    end_date: Date
    title: string
    extract: string
    address: Address
    image_id: string
    organization: {
        organization_id: string
        organization_name: string
    }
    createdAt: Date
    updatedAt: Date
    recommended?: boolean
}
export interface EventPage {
    _id: string
    start_date: Date
    end_date: Date
    title: string
    extract: string
    description?: string
    address: Address
    image_id: string
    meta: {
        denomination?: string
        types?: string[]
        size?: string
        language?: string
        price?: number
        online?: boolean
        speaker?: string
        music?: string
        presenter?: string
    }
    organization: {
        organization_id: string
        organization_name: string
    }
    createdAt: Date
    updatedAt: Date
}
export interface EventContentProps {
    data: EventPage
    formattedDates: FormattedDate
    organizationLink: string
    distance: number
    mapLink: string
}

// SEARCH
export type SearchResult = {
    type:
    typeof SEARCH_TYPE_CITY |
    typeof SEARCH_TYPE_ORGANIZATION |
    typeof SEARCH_TYPE_TITLE
    data: string
}
export interface Filters { // KS Event Schema
    "meta.denomination"?: 0 | 1 | 2
    "meta.types"?: number[]
    "meta.size"?: 0 | 1 | 2
    "meta.language"?: 0 | 1 | 2
    "meta.price.value"?: number
    "meta.online"?: boolean
}
export interface SearchQuery {
    location?: {
        latitude: number,
        longitude: number
    }
    search?: [
        { "address.city": string },
        { "organization.organization_name": string },
        { "title": string }
    ]
    filters?: Filters
}

// Organization
export interface OrganizationPage {
    organization: {
        name: string,
        address: Address,
        contact_info: ContactInfo,
        updatedAt: Date
    },
    image_id: string
    data: string
    updatedAt: Date
}
export interface Organization {
    address: Address,
    contact_info: ContactInfo,
    _id: string,
    name: string,
    business_id: string,
    contact_info_visible: boolean,
    visible: boolean,
    organization_users: [
        {
            user_id: string,
            user_name: string,
            user_email: string,
            role: "user" | "admin" | "owner",
            _id: string
        }
    ],
    created_by: string,
    updated_by: string,
    createdAt: Date,
    updatedAt: Date,
    __v: number
}

export interface EventStats {
    title: string
    event_searches: number
    event_views: number
    event_unique_views: number
    event_location_views: number
    event_clicks: number
    event_unique_clicks: number
    event_location_clicks: [
        {
            locationType: {
                type: string,
                enum: ['Point'], // You can specify the type as "Point" for geo coordinates
            },
            coordinates: {
                type: [number], // [longitude, latitude]
            },
        },
    ],
}