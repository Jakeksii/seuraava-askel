import { useIntersection } from "@mantine/hooks"
import CircularProgress from "@mui/material/CircularProgress"
import { useEffect, useRef } from "react"
import { useLocationContext } from "../../context/locationContext"
import { useSearchContext } from "../../context/searchContext"
import useGetEvents from "../../hooks/api-hooks/useGetEvents"
import useCalculateDistance from "../../hooks/useCalculateDistance"
import Event from "./Event"

const loading = (
    <div className="grid justify-center pt-4" aria-busy={true}>
        <CircularProgress size={50} color="info" />
    </div>
)

export default function EventFeed() {
    const searchContext = useSearchContext()
    const locationContext = useLocationContext()
    const { isLoading, data, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetEvents({ query: searchContext.query, page: 1 })
    const lastEventRef = useRef<HTMLDivElement | null>(null)
    const { ref, entry } = useIntersection({
        root: lastEventRef.current,
        threshold: 0
    })
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
                <h2 className="text-center pt-4">Error when fetching events. Please try again</h2>
            </div>
        )
    }


    return (
        <>
            <div /*className="grid gap-4 grid-cols-1 sm:grid-cols-2" */>
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
                                            distance={(locationContext.coords.latitude) ? Math.round(useCalculateDistance(
                                                locationContext.coords.longitude,
                                                locationContext.coords.latitude,
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
                                        distance={(locationContext.coords.latitude) ? Math.round(useCalculateDistance(
                                            locationContext.coords.longitude,
                                            locationContext.coords.latitude,
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