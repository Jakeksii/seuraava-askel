import { useLocationContext } from "../assets/context/locationContext";
import calculateDistance from "../assets/functions/calculateDistance";
import formatDate from "../assets/functions/formatDate";
import { useIsMobile } from "../assets/hooks/useIsMobile";
import EventContent from "../pages/Event/EventContent";
import EventMobileContent from "../pages/Event/EventMobileContent";
import { EventPage } from "../types";

type Props = {
    event: EventPage
}

export default function EventView({event}:Props) {
    const isMobile = useIsMobile()
    const { values: { coords } } = useLocationContext()
    window.scrollTo(0, 0);

    const formattedDates = formatDate(event.start_date, event.end_date)
    const organizationLink = "/" + encodeURI(event.organization.organization_name.replace(/\s/g, '-'))
    const distance = Math.round(calculateDistance(coords.longitude, coords.latitude, event.address.coordinates[0], event.address.coordinates[1]))
    const mapLink = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURI(`${event.address.street} ${event.address.zipcode} ${event.address.city} ${event.address.state} ${event.address.country}`)

    // Render page
    return (
        <>
            {
                isMobile
                    ? <EventMobileContent
                        data={event}
                        formattedDates={formattedDates}
                        organizationLink={organizationLink}
                        distance={distance}
                        mapLink={mapLink} />
                    : <EventContent
                        data={event}
                        formattedDates={formattedDates}
                        organizationLink={organizationLink}
                        distance={distance}
                        mapLink={mapLink} />
            }
        </>
    )
}
