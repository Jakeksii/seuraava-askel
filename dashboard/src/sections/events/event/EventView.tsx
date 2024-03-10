import { Paper } from "@mui/material";
import { useEffect, useRef } from "react";

import formatDate from "src/functions/formatDate";
import { useIsMobile } from "src/hooks/useResponsive";
import { EventPage } from "src/types";
import EventContent from "./EventContent";
import EventMobileContent from "./EventMobileContent";

type Props = {
    event: EventPage
}

export default function EventView({ event }: Props) {
    const isMobile = useIsMobile()

    const ref = useRef<HTMLDivElement>(null)
    const appBarRef = useRef(document.getElementById('AppBar'))

    // scroll to event or appBar
    useEffect(() => {
        isMobile && ref.current && ref.current.scrollIntoView({ block: 'start', inline: 'nearest' })
        !isMobile && appBarRef?.current?.scrollIntoView({ block: 'start', inline: 'nearest' })
    }, [isMobile])

    const formattedDates = formatDate(event.start_date, event.end_date)


    const mapLink = "https://www.google.com/maps/dir/?api=1&destination="
        + encodeURI(`
        ${event.address.street} 
        ${event.address.zipcode} 
        ${event.address.city} 
        ${event.address.state} 
        ${event.address.country}`)

    // Render page
    return (
        <Paper ref={ref} sx={{ overflow: 'hidden', height: 'fit-content', position: 'relative', zIndex: '0' }}>
            {
                isMobile
                    ? <EventMobileContent
                        data={event}
                        formattedDates={formattedDates}
                        mapLink={mapLink} />
                    : <EventContent
                        data={event}
                        formattedDates={formattedDates}
                        mapLink={mapLink} />
            }
        </Paper>
    )
}