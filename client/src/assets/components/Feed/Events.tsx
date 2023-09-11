import { useIntersection } from "@mantine/hooks"
import CircularProgress from "@mui/material/CircularProgress"
import { useEffect, useRef } from "react"
import { ERROR_DEFAULT } from "../../constants"
import { useLocationContext } from "../../context/locationContext"
import { useSearchContext } from "../../context/searchContext"
import calculateDistance from "../../functions/calculateDistance"
import useGetEvents from "../../hooks/api-hooks/useGetEvents"
import Event from "./Event"

type Props = {
    query?: string
}

const loading = (
    <div className="grid justify-center pt-4" aria-busy={true}>
        <CircularProgress size={50} color="info" />
    </div>
)

export default function EventFeed(props: Props) {
    const { values: { query } } = useSearchContext()
    const { values: { locationOn, coords}, getLocation} = useLocationContext()
    const { isLoading, data, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetEvents({ query: props.query ?? query, page: 1 }) // if query is passed as a prop we use it to fetch events
    const lastEventRef = useRef<HTMLDivElement | null>(null)
    const { ref, entry } = useIntersection({
        root: lastEventRef.current,
        threshold: 0
    })
    useEffect(() => {
        if (!locationOn) getLocation()
    }, [])
    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage) fetchNextPage()
    }, [entry])

    // RENDER
    if (isLoading) {
        return loading
    }
    if (isError) {
        return (
            <div>
                <h2 className="text-center pt-4">{ERROR_DEFAULT}</h2>
            </div>
        )
    }


    return (
        <>
            <div>
                {
                    data?.pages.map((page) => (
                        page.map((event, i) => {
                            if (page.length - 1 === i) {
                                return (
                                    <div ref={ref} key={event._id}>
                                        <Event
                                            _id={event._id}
                                            imageID={event.image_id}
                                            title={event.title}
                                            extract={event.extract}
                                            organization={event.organization.organization_name}
                                            //We calculate the distance between our coords and coords in event
                                            distance={(locationOn) ? Math.round(calculateDistance(
                                                coords.longitude,
                                                coords.latitude,
                                                event.address.coordinates[0],
                                                event.address.coordinates[1])) : null}
                                            startDate={event.start_date}
                                            endDate={event.end_date} />
                                    </div>)
                            }
                            return (
                                <div key={event._id}>
                                    <Event
                                        _id={event._id}
                                        imageID={event.image_id}
                                        title={event.title}
                                        extract={event.extract}
                                        organization={event.organization.organization_name}
                                        //We calculate the distance between our coords and coords in event
                                        distance={(locationOn) ? Math.round(calculateDistance(
                                            coords.longitude,
                                            coords.latitude,
                                            event.address.coordinates[0],
                                            event.address.coordinates[1])) : null}
                                        startDate={event.start_date}
                                        endDate={event.end_date} />
                                </div>)
                        })
                    ))
                }
            </div>
            <div className="w-[100%]">
                {
                    isFetchingNextPage ? loading : <div className="h-1 rounded-sm m-6 bg-slate-400"></div>
                }
            </div>
        </>
    )
}