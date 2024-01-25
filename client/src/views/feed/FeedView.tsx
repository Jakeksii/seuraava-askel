import { useIntersection } from "@mantine/hooks"
import { Box, Stack } from "@mui/material"
import { useEffect, useRef } from "react"
import Error from "src/components/partials/Error"
import Loading from "src/components/partials/Loading"
import { useSearchContext } from "src/context/searchContext"
import useGetEvents from "src/hooks/useGetEvents"
import Event from "src/views/feed/Event"

export default function FeedView() {
    const { values: { search, location } } = useSearchContext()

    const {
        isLoading,
        data,
        isError,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage } = useGetEvents({ search, page: 1, location: location.on ? location.coordinates : undefined })

    const lastEventRef = useRef<HTMLDivElement | null>(null)
    const { ref, entry } = useIntersection({
        root: lastEventRef.current,
        threshold: 0
    })

    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage) fetchNextPage()
    }, [entry])

    // RENDER

    const renderEvents = data?.pages.map((page) => (
        page.map((event, i) => {
            if (page.length-1 === i) {
                return (
                    <Box ref={ref} key={event._id} width='100%' >
                        <Event event={event} />
                    </Box>
                )
            }
            return (
                <Box key={event._id} width='100%' >
                    <Event event={event} />
                </Box>
            )
        })
    ))

    return (
        <Stack alignItems={'center'} spacing={4} aria-busy={isLoading}>
            {isLoading && <Loading />}
            {isError && <Error />}
            {renderEvents}
            {isFetchingNextPage && <Loading />}
        </Stack>
    )
}