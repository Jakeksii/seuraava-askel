// Sub types
export type Address = {
    street: string
    city: string
    state: string
    zipcode: string
    country: string
}
export type FormattedDate = {
    startDate: string
    endDate: string
    startTime: string
    endTime: string
}

// EVENT
export type Event = {
    _id: string
    start_date: Date
    end_date: Date
    title: string
    extract: string
    address: Address
    location: {
        coordinates: [number, number]
    }
    image_id: string
    organization: {
        organization_id: string
        organization_name: string
    }
    createdAt: Date
    updatedAt: Date
}
export type EventPage = {
    _id: string
    start_date: Date
    end_date: Date
    title: string
    extract: string
    description?: string
    address: Address
    location: {
        coordinates: [number, number]
    }
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