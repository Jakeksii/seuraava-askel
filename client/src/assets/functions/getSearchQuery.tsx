import { Filters, SearchQuery } from "../../types";

type Props = {
    type: "city" | "organization" | "title"
    search: string
    filters?: Filters
} | {
    type: "location"
    location: {
        latitude: number
        longitude: number
    }
    filters?: Filters
}

export default function getSearchQuery(props: Props): SearchQuery {
    if (props.type === "location") {
        return {
            location: props.location,
            filters: props.filters
        }
    } else {
        return {
            search: [
                { "address.city": props.type === "city" ? props.search : "" },
                { "organization.organization_name": props.type === "organization" ? props.search : "" },
                { "title": props.type === "title" ? props.search : "" }
            ],
            filters: props.filters
        }
    }
}