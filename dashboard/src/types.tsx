// Sub types
export type Address = {
    street: string | null
    city: string | null
    state: string | null
    zipcode: string | null
    country: string | null
}
export type Location = {
    coordinates: number[]
}
export type FormattedDate = {
    startDate: string
    endDate: string
    startTime: string
    endTime: string
}

// EVENT
export type Event = {
    description: string
    _id: string
    start_date: string | Date
    end_date: string | Date
    title: string
    extract: string
    address: Address
    location: Location
    image_id: string
    organization: {
        _id: string
        name: string
    }
    createdAt: string
    updatedAt: string
}
export type EventPage = {
    _id: string
    start_date: Date
    end_date: Date
    title: string
    extract: string
    description?: string
    address: Address
    location: Location
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