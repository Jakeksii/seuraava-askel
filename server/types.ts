import {
    Request as ExpressRequest,
    Response as ExpressResponse,
    NextFunction as ExpressNextFunction
} from "express";
import { Types } from "mongoose";

// EXPRESS
export interface Request extends ExpressRequest {
    user: IUser
}
export interface Response extends ExpressResponse { }
export interface NextFunction extends ExpressNextFunction { }

// Partial
export interface IAddress {
    street: string
    city: string
    state: string
    zipcode: string
    country: string
    coordinates: [number, number]
}

// Event
export interface IEvent {
    _id?: Types.ObjectId
    start_date: Date
    end_date: Date
    title: string
    extract: string
    description?: string //HTML
    visible: boolean
    address: IAddress
    image_id: string
    meta: {
        denomination?: number
        types?: number[]
        size?: number
        language?: number[]
        price?: {
            value: number,
            currency: string
        }
        online?: boolean
        speaker?: string
        music?: string
        presenter?: string
    }
    organization: {
        organization_id: String,
        organization_name: String,
    }
    created_by: Types.ObjectId
    updated_by: Types.ObjectId
    createdAt?: Date
    updatedAt?: Date
    __v?: number
}

// User
export interface IUser {
    _id: Types.ObjectId,
    first_name: string,
    last_name: string,
    email: string,
    password?: string,
    verified?: boolean,
    organizations: [{
        organization_id: Types.ObjectId
        organization_name: string
        role: string
        _id: Types.ObjectId
    }]
    createdAt?: Date,
    updatedAt?: Date,
    __v?: number,
}

// Organization
export interface IOrganization {
    name: string,
    business_id: string,
    address: IAddress
    contact_info: {
        email: string,
        phone: string
    },
    contact_info_visible: boolean,
    visible?: boolean,
    organization_users: [{
        user_id: Types.ObjectId,
        user_name: String,
        user_email: String,
        role: String
        _id?: Types.ObjectId
    }],
    created_by: Types.ObjectId,
    updated_by: Types.ObjectId,
    _id?: Types.ObjectId,
    createdAt?: Date,
    updatedAt?: Date,
    __v?: number
}
export interface IOrganizationUser {
    user_id: Types.ObjectId
    user_name: String
    user_email: String
    role: String
    test: string
}
export interface IOrganizationPage {
    _id: Types.ObjectId
    organization_name: String
    organization_id: Types.ObjectId
    image_id: string
    page_data: string
    created_by: Types.ObjectId
    updated_by: Types.ObjectId
    createdAt?: Date,
    updatedAt?: Date,
    __v?: number
}

// Invitation
export interface IInvitation {
    _id?: Types.ObjectId
    user_email: string
    organization: {
        organization_id: Types.ObjectId
        organization_name: string
    }
    expirationDate: Date
    created_by: Types.ObjectId
    updated_by?: Types.ObjectId
    createdAt?: Date
    updatedAt?: Date
    __v?: number
}

// Email
export interface IEmailVerification {
    _id: typeof Types.ObjectId
    user_id: typeof Types.ObjectId
    createdAt?: Date
    updatedAt?: Date
    __v?: number
}