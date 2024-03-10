import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Image } from "src/components/Image";
import Grid from '@mui/material/Unstable_Grid2';
import AppWidgetSummary from 'src/sections/overview/app-widget-summary';
import AppWebsiteVisits from 'src/sections/overview/app-website-visits';

import useFormatDate from "src/functions/formatDate";
import { useIsMobile } from 'src/hooks/useResponsive';
// import { secondary } from 'src/theme/palette'; // Lisää tää myöhemmin 
import { Event as EventType } from 'src/types';

type Props = {
    event: EventType
}


const Event = memo(({ event }: Props) => {
    const isMobile = useIsMobile()


    const formattedDates = useFormatDate(event.start_date, event.end_date)
    const date = (
        <Typography variant="body2" fontWeight={'bold'}>
            {(formattedDates.startDate === formattedDates.endDate) ?
                formattedDates.startDate :
                formattedDates.startDate + " - " + formattedDates.endDate}
        </Typography>
    )

    const time = (
        <Typography variant="body2" fontWeight={'bold'}>
            {formattedDates.startTime} - {formattedDates.endTime}
        </Typography>
    )

    const eventLink = "/event/" + event._id

    if (isMobile) {
        return (
            <Card>
                <Link to={eventLink}>
                    <Box sx={{ aspectRatio: '1/1', width: '100%', backgroundImage: "linear-gradient(to top, rgba(255, 255, 255, 1.0) 0%, rgba(255, 255, 255, 0.5) 1%, transparent 30%)" }}>
                        <Image image_id={event.image_id} aspectRatio={1 / 1} sx={{ position: 'relative', zIndex: -1 }} />
                    </Box>


                    <CardContent sx={{ pt: 0 }}>
                        <Typography variant="body2">
                            {event.organization.organization_name}
                        </Typography>
                        <Typography variant="h3">
                            {event.title}
                        </Typography>
                        <Stack direction={'row'} gap={1} sx={{ pb: 1, pt: 1, flexWrap: 'wrap' }}>
                            <Chip color='secondary' icon={<EventIcon />} label={date} />
                            <Chip color='secondary' icon={<ScheduleIcon />} label={time} />
                        </Stack>
                        <Typography variant="body2">
                            {event.extract.length > 250 ? event.extract.slice(0, 250) + '...' : event.extract}
                        </Typography>
                    </CardContent>
                </Link>

                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="New Users"
                        total={1352831}
                        color="info"
                        icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
                        sx={{ /* your custom styles here */ }}
                    />
                </Grid>

            </Card>
        )
    } else {
        return (
            <Card>
                <Link to={eventLink}>
                    <Stack direction={'row'}>
                        <Box sx={{ aspectRatio: '1/1', width: '40%', flexShrink: 0, backgroundImage: "linear-gradient(to left, rgba(255, 255, 255, 1.0) 0%, rgba(255, 255, 255, 0.5) 1%, transparent 30%)" }}>
                            <Image image_id={event.image_id} aspectRatio={1 / 1} sx={{ position: 'relative', zIndex: -1 }} />
                        </Box>
                        <CardContent sx={{ pt: 0, alignSelf: 'center' }}>
                            <Typography variant="body2">
                                {event.organization.organization_name}
                            </Typography>
                            <Typography variant="h3">
                                {event.title}
                            </Typography>
                            <Stack direction={'row'} gap={1} sx={{ pb: 1, pt: 1, flexWrap: 'wrap' }}>
                                <Chip color='secondary' icon={<EventIcon />} label={date} />
                                <Chip color='secondary' icon={<ScheduleIcon />} label={time} />
                            </Stack>
                            <Typography variant="body2">
                                {event.extract}
                            </Typography>
                            <Stack direction={'row'} gap={1} sx={{ justifyContent: 'space-around'}}>
                                <Grid >
                                    <AppWebsiteVisits
                                        title="Impressiot"
                                        subheader="(+43%) than last year"
                                        chart={{
                                            labels: [
                                            '01/01/2003',
                                            '02/01/2003',
                                            '03/01/2003',
                                            '04/01/2003',
                                            '05/01/2003',
                                            '06/01/2003'


                                            ],
                                            series: [
                                            {
                                                name: 'Team A',
                                                type: 'column',
                                                fill: 'solid',
                                                data: [23, 11, 22, 27, 13, 50],
                                            },
                                            {
                                                name: 'Team B',
                                                type: 'area',
                                                fill: 'gradient',
                                                data: [44, 55, 41, 67, 22, 45],
                                            },
                                            {
                                                name: 'Team C',
                                                type: 'line',
                                                fill: 'solid',
                                                data: [30, 25, 36, 30, 45, 12],
                                            },
                                            {
                                                name: 'Team D',
                                                type: 'line',
                                                fill: 'solid',
                                                data: [20, 13, 45, 60, 43, 100],
                                            },
                                            ],
                                        }}
                                    />
                                </Grid>
                                <Grid >
                                    <AppWebsiteVisits
                                        title="Impressiot"
                                        subheader="(+43%) than last year"
                                        chart={{
                                            labels: [
                                            '01/01/2003',
                                            '02/01/2003',
                                            '03/01/2003',
                                            '04/01/2003',
                                            '05/01/2003',


                                            ],
                                            series: [
                                            {
                                                name: 'Team A',
                                                type: 'column',
                                                fill: 'solid',
                                                data: [23, 11, 22, 27, 13],
                                            },
                                            {
                                                name: 'Team B',
                                                type: 'area',
                                                fill: 'gradient',
                                                data: [44, 55, 41, 67, 22],
                                            },
                                            {
                                                name: 'Team C',
                                                type: 'line',
                                                fill: 'solid',
                                                data: [30, 25, 36, 30, 45],
                                            },
                                            {
                                                name: 'Team D',
                                                type: 'line',
                                                fill: 'solid',
                                                data: [20, 13, 45, 60, 43],
                                            },
                                            ],
                                        }}
                                    />
                                </Grid>
                            </Stack>
                        </CardContent>
                    </Stack>
                </Link>
                {/* <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Total Impressions"
                        total={50462}
                        color="info"
                        icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
                        sx={{ }}
                    />
                </Grid> */}

            </Card>

        )
    }
})

Event.displayName = 'Event'

export default Event