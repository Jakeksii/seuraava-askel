import { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import useGetEventPage from "../assets/hooks/api-hooks/useGetEventPage";
import EventView from "../views/EventView";
import NotFound from "./NotFound";
import Loading from "../assets/partials/Loading";

export default function EventPage() {
    const { event_id } = useParams()
    const { data, isLoading, isError } = useGetEventPage({ _id: event_id ?? "" })
    if (isLoading) return <Loading />
    if (!data || isError) return <Suspense><NotFound /></Suspense>

    return (
        <>
            <Helmet>
                <title> {data.title} </title>
            </Helmet>
            
            <EventView event={data} />
        </>
    )
}