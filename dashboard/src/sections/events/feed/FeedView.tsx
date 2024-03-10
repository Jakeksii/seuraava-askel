import { Stack, Box } from "@mui/material";
import useGetEvents from "src/hooks/api-hooks/useGetOrgEvents";
import Event from "src/sections/events/feed/Event";
import Error from "src/components/partials/Error";
import Loading from "src/components/partials/Loading";

export default function FeedView() {
    const { isLoading, data, isError } = useGetEvents({ orgId: "65e78d8e3688e6094db7dd07" }); // Hae kyseinen org id tähän

    // RENDER
    const renderEvents = data?.map((event) => (
        <Box key={event._id} width='100%'>
            <Event event={event} />
        </Box>
    ));

    return (
        <Stack alignItems={'center'} spacing={4} aria-busy={isLoading}>
            {isLoading && <Loading />}
            {isError && <Error />}
            {renderEvents}
        </Stack>
    );
}
