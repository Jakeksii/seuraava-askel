import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Box, Card, CardContent, Chip, Stack, Typography, styled } from "@mui/material";
import { format } from 'date-fns';
import parse from 'html-react-parser';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import CloudImage from 'src/components/images/image';
import { Event as EventType } from 'src/types';

type Props = {
    event: Omit<EventType, 'createdAt' | 'updatedAt' | '_id'>;
}

const Styled = styled('div')(({ theme }) => ({
    '*': {
        marginBlock: 0,
        padding: 0,
        boxSizing: 'border-box',
    },
    '& p': { ...theme.typography.body1 },
    '& h2': { ...theme.typography.h2 },
    '& h3': { ...theme.typography.h3 },
    '& ul, & ol': {
        paddingLeft: 50,
    },
}))

const Event = memo(({ event }: Props) => {

    const startDateWeekDay = format(new Date(event.start_date), 'eeee ')
    const startDate = format(new Date(event.start_date), 'dd.MM.')
    const endDate = format(new Date(event.end_date), 'dd.MM.')
    const startDateYear = format(new Date(event.start_date), 'yyyy')
    const endDateYear = format(new Date(event.end_date), 'yyyy')

    const startTime = format(new Date(event.start_date), 'HH:mm')
    const endTime = format(new Date(event.end_date), 'HH:mm')

    const date = (
        <Typography variant="body2" fontWeight={'bold'}>
            {
                (startDate === endDate)
                    ? startDateWeekDay + startDate + startDateYear
                    : startDate + " - " + endDate + endDateYear
            }
        </Typography>
    )

    const time = (
        <Typography variant="body2" fontWeight={'bold'}>
            {startTime} - {endTime}
        </Typography>
    )


    return (
        <Card component={Link} to={'#'} sx={{ textDecoration: 'none', backgroundColor: 'white', color: 'black' }}>
            <Box>
                <Stack sx={{ flexDirection: { sm: 'column', md: 'row' } }}>
                    <Box sx={{ height: '100%', width: {sm: '100%', md:'35%'}, flexShrink: 0, flexGrow: 0 }}>
                        <CloudImage image_id={`${event.organization._id}/${event.image_id}`} width={400} />
                    </Box>

                    <CardContent sx={{ pt: 0, alignSelf: 'center' }}>
                        <Typography variant="body2" sx={{ pt: 1 }}>
                            {event.organization.name}
                        </Typography>
                        <Typography variant="h2" component="h1">
                            {event.title}
                        </Typography>
                        <Stack direction={'row'} gap={1} sx={{ pb: 1, pt: 1, flexWrap: 'wrap' }}>
                            <Chip color='primary' size='small' icon={<EventIcon />} label={date} />
                            <Chip color='primary' size='small' icon={<ScheduleIcon />} label={time} />
                        </Stack>
                        <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                            {event.extract}
                        </Typography>
                    </CardContent>
                </Stack>

                {event.description &&
                    <Styled sx={{ p: 4 }}>
                        {parse(event.description)}
                    </Styled>}
            </Box>
        </Card>
    )
})

Event.displayName = 'Event'

export default Event