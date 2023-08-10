import { SEARCH_TYPE_CITY, SEARCH_TYPE_ORGANIZATION, SEARCH_TYPE_TITLE } from "./constants"

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

// EVENT
export interface IEvent {
    _id: string
    start_date: Date
    end_date: Date
    title: string
    extract: string
    visible: boolean
    address: Address
    image_id: string
    event_meta: {
        speaker: string
        music: string
        presenter: string
    }
    event_page_url: string
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

// PAGES
export interface PageProps {
    dict: Dictionary
}

// DICTIONARY
export interface Dictionary {
    global_error: {
        404: string,
        500: string,
        failed: string
    },
    actions: {
        to_front_page: string
    }
}