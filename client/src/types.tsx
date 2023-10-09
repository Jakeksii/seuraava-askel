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
export interface Location {
    latitude: number,
    longitude: number
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
        type?: string
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
    meta?: {
        "meta.denomination"?: number[],
        "meta.types"?: number[],
        "meta.size"?: number[],
        "meta.language"?: number[]
    }
    min_distance?: number,
    max_distance?: number
}
export interface AvailableFilters {
    denomination: [{ value: number }],
    types: [{ value: number }],
    size: [{ value: number }],
    language: [{ value: number }],
    price: [{ value: number }],
    online: [{ value: boolean }]
}
export interface SearchQuery {
    location?: Location
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