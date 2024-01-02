import { SEARCH_TYPE_CITY, SEARCH_TYPE_ORGANIZATION, SEARCH_TYPE_TITLE } from "./constants"

// Sub types
export interface Address {
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
type Role = 'user' | 'admin' | 'owner'
export type FormattedDate = {
    startDate: string
    endDate: string
    startTime: string
    endTime: string
}
// GOOGLE PLACES
interface MainTextMatchedSubstrings {
    offset: number;
    length: number;
}
interface StructuredFormatting {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
export interface PlaceType {
    description: string;
    structured_formatting: StructuredFormatting;
    place_id: string
}

// INVITATION
export interface Invitation {
    _id: string
    organization: {
        _id: string
        name: string
    }
    role: Role
    createdAt: string
}

// EVENT
export interface IEvent {
    _id: string
    start_date: string
    end_date: string
    title: string
    description: string
    extract: string
    visible: boolean
    address: Address
    image_id: string
    event_meta: {
        speaker?: string
        music?: string
        presenter?: string
    }
    organization: {
        organization_id: string,
        organization_name: string,
    }
    createdAt: Date,
    updatedAt: Date,
}

// SEARCH
export type SearchResult = {
    type:
    typeof SEARCH_TYPE_CITY |
    typeof SEARCH_TYPE_ORGANIZATION |
    typeof SEARCH_TYPE_TITLE
    data: string
}
export type SearchResults = {
    results: SearchResult[]
    error?: string
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
            invitation: undefined
			user_id: string
			user_name: string,
			user_email: string,
			role: "user" | "admin" | "owner",
			_id: string
		} | {
            invitation: true
            user_email: string
            role: "user" | "admin" | "owner"
            created_at: Date
        }
	],
	created_by: string,
	updated_by: string,
	createdAt: Date,
	updatedAt: Date,
	__v: number
}

export interface SendOrganization {
    address: Address,
	contact_info: ContactInfo,
	name: string,
	business_id: string,
	contact_info_visible: boolean,
}


export interface User {
    token: string,
    user: {
        _id: string,
        first_name: string,
        last_name: string,
        email: string,
        verified: boolean,
        organizations?: [
            {
                organization_id: string,
                organization_name: string,
                role: "user" | "admin" | "owner",
            }
        ]
    }
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