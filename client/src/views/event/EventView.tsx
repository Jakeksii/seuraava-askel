import { Paper } from "@mui/material";
import { useSearchContext } from "src/context/searchContext";
import calculateDistance from "../../functions/calculateDistance";
import formatDate from "../../functions/formatDate";
import { useIsMobile } from "../../hooks/useResponsive";
import { useScrollToId } from "../../hooks/useScroll";
import { EventPage } from "../../types";
import EventContent from "./EventContent";
import EventMobileContent from "./EventMobileContent";

type Props = {
    event: EventPage
}

export default function EventView({ event }: Props) {
    const isMobile = useIsMobile()
    const { values: { location } } = useSearchContext()
    useScrollToId('AppBar')

    const formattedDates = formatDate(event.start_date, event.end_date)
    
    const distance = location.on
        ? Math.round(calculateDistance(
            location.coordinates.longitude,
            location.coordinates.latitude,
            event.address.coordinates[0],
            event.address.coordinates[1]))
        : undefined

    const mapLink = "https://www.google.com/maps/dir/?api=1&destination="
        + encodeURI(`
        ${event.address.street} 
        ${event.address.zipcode} 
        ${event.address.city} 
        ${event.address.state} 
        ${event.address.country}`)

    // Render page
    return (
        <Paper sx={{ overflow: 'hidden', height: 'fit-content', position: 'relative', zIndex: '0' }}>
            {
                isMobile
                    ? <EventMobileContent
                        data={event}
                        formattedDates={formattedDates}
                        distance={distance}
                        mapLink={mapLink} />
                    : <EventContent
                        data={event}
                        formattedDates={formattedDates}
                        distance={distance}
                        mapLink={mapLink} />
            }
        </Paper>
    )
}