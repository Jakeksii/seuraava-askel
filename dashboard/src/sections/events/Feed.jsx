import { Box, Stack, Typography } from "@mui/material";
import LoadingView from "src/components/loading/loading-view";
import useGetEvents from "src/hooks/api-hooks/useGetOrgEvents";
import Event from "./Event";

export default function Feed() {
    const { isLoading, data, isError } = useGetEvents()

    if (isLoading) { return <LoadingView /> }
    if (isError || !data) { return <Typography variant='h4' textAlign='center' color="error">Oho, jokin meni vikaan</Typography> }

    // RENDER
    const renderEvents = data?.map((event) => (
        <Box key={event._id} width='100%'>
            <Event event={event} />
        </Box>
    ));

    return (
        <Stack alignItems={'center'} spacing={4} aria-busy={isLoading}>
            {renderEvents}
        </Stack>
    );
}