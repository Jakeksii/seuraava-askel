// Sub types
type Address = {
    street: string
    city: string
    state: string
    zipcode: string
    country: string
    coordinates: [number, number]
}
type ContactInfo = {
    email: string,
    phone: string
}
type Role = 'user' | 'admin' | 'owner'

// INVITATION ------------------------------
export interface Invitation {
    _id: string
    organization: {
        _id: string
        name: string
    }
    role: Role
    createdAt: string
}

// EVENT ----------------------------
export interface IEvent {
    _id: string | undefined
    start_date: Date
    end_date: Date
    title: string
    description: string
    contactinfo: ContactInfo
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

// ORGANIZATION -----------------------------
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

// USER -----------------------------
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