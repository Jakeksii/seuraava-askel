import { Suspense } from "react";
import { useParams } from "react-router-dom";
import Header from "../../assets/components/Header";
import { useLocationContext } from "../../assets/context/locationContext";
import calculateDistance from "../../assets/functions/calculateDistance";
import useFormatDate from "../../assets/functions/formatDate";
import useGetEventPage from "../../assets/hooks/api-hooks/useGetEventPage";
import { useIsMobile } from '../../assets/hooks/useIsMobile';
import Loading from '../../assets/partials/Loading';
import NotFound from "../NotFound";
import EventContent from './EventContent';
import EventMobileContent from "./EventMobileContent";

const skeleton = (
    <>
        <Header />
        <main aria-busy={true}>
            <Loading />
        </main>
    </>
)

export default function EventPage() {
    const { event_id } = useParams()
    const { values: { coords } } = useLocationContext()
    const isMobile = useIsMobile()
    const { data, isLoading, isError } = useGetEventPage({ _id: event_id ?? "" })
    if (isLoading) return skeleton
    if (!data || isError) return <Suspense><NotFound /></Suspense>
    window.scrollTo(0, 0);

    const formattedDates = useFormatDate(data.start_date, data.end_date)
    const organizationLink = "/" + encodeURI(data.organization.organization_name.replace(/\s/g, '-'))
    const distance = Math.round(calculateDistance(coords.longitude, coords.latitude, data.address.coordinates[0], data.address.coordinates[1]))
    const mapLink = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURI(`${data.address.street} ${data.address.zipcode} ${data.address.city} ${data.address.state} ${data.address.country}`)

    // Render page
    return (
        <>
            {
                isMobile
                    ? <EventMobileContent
                        data={data}
                        formattedDates={formattedDates}
                        organizationLink={organizationLink}
                        distance={distance}
                        mapLink={mapLink} />
                    : <EventContent
                        data={data}
                        formattedDates={formattedDates}
                        organizationLink={organizationLink}
                        distance={distance}
                        mapLink={mapLink} />
            }
        </>
    )
}
