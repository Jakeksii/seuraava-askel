
import Typography from '@mui/material/Typography';

import { useAppContext } from 'src/context/appContext';
import { useGetUser } from 'src/hooks/api-hooks/useAuthenticate';
import { useEffect, useState, useCallback } from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';
import { Box, Card, CardContent, Chip, Container, Stack } from '@mui/material';
import EventIcon from '@mui/icons-material/Event'
import ScheduleIcon from '@mui/icons-material/Schedule';


// ----------------------------------------------------------------------

interface Location {
  coordinates: number[];
  type: string;
}

interface Organization {
  organization_id: string;
  organization_name: string;
}

interface Address {
  city: string;
  country: string;
  state: string;
  street: string;
  zipcode: string;
}

interface Event {
  _id: string;
  title: string;
  start_date: string;
  end_date: string;
  image_id: string;
  extract: string;
  location: Location;
  organization: Organization;
  address: Address;
}

export default function EventsView() {
  const { session } = useAppContext()
  const { data: user } = useGetUser(session!.token)

  const [events, setEvents] = useState<Event[]>([]);
  
  // Mistä saa user tiedot?
  const orgId = "65c0bf6d2ca0a78bc63b3e20";

  const getEvents = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/events/banjo/${orgId}`, {
        headers: {
          "Authorization": session!.token,
          "Organization": orgId,
        },
      });

      // Set the events in state
      setEvents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      // Handle error appropriately, e.g., set state to show an error message
    }
  }, [orgId, session]); // Add dependencies to the dependency array

  useEffect(() => {
    getEvents(); // Call the getEvents function inside useEffect
  }, [getEvents]); // Add getEvents to the dependency array to satisfy the exhaustive-deps rule


  // Hakataan sisään vaan tää kama
  const distance = 20;
  const distanceTag = (
    <Typography variant="body1" fontWeight={'bold'}>
        {distance} km
    </Typography>
)

// const mapLink = "https://www.google.fi/maps/dir//Aleksanterinkatu+19,+00101+Helsinki/@60.1697694,24.8595827,12z/data=!4m9!4m8!1m0!1m5!1m1!1s0x46920bcc6af0f117:0x6c82e40ede9ace9e!2m2!1d24.9419824!2d60.169795!3e0?hl=fi&entry=ttu"

const eventLink = "www.google.com"


// if (isMobile) {
//   return (
//     <Card>
//         <Link to={eventLink}>
//             <Box sx={{ aspectRatio: '1/1', width: '100%', backgroundImage: "linear-gradient(to top, rgba(255, 255, 255, 1.0) 0%, rgba(255, 255, 255, 0.5) 1%, transparent 30%)" }}>
//                 <Image image_id={event.image_id} aspectRatio={1 / 1} sx={{ position: 'relative', zIndex: -1 }} />
//             </Box>
//             <Box position={'absolute'} top={10} right={10} height={0}>
//                 {distanceTag}
//             </Box>

//             <CardContent sx={{ pt: 0 }}>
//                 <Typography variant="body2">
//                     {event.organization.organization_name}
//                 </Typography>
//                 <Typography variant="h3">
//                     {event.title}
//                 </Typography>
//                 <Stack direction={'row'} gap={1} sx={{ pb: 1, pt: 1, flexWrap: 'wrap' }}>
//                     <Chip color='secondary' icon={<EventIcon />} label={date} />
//                     <Chip color='secondary' icon={<ScheduleIcon />} label={time} />
//                 </Stack>
//                 <Typography variant="body2">
//                     {event.extract.length > 250 ? event.extract.slice(0, 250) + '...' : event.extract}
//                 </Typography>
//             </CardContent>
//         </Link>
//     </Card>
// )
// } else {
  return (
    <Container>
              <Typography variant="body2">
                     Hello {user.first_name}
              </Typography>
            {events.map(event => (
              <Card key={event._id}>
                <Link to={eventLink}>
                <Box position={'absolute'} top={10} right={10} height={0}>
                    {distanceTag}
                </Box>
                <Stack direction={'row'}>
                    <Box sx={{ aspectRatio: '1/1', width: '40%', flexShrink: 0, backgroundImage: "linear-gradient(to left, rgba(255, 255, 255, 1.0) 0%, rgba(255, 255, 255, 0.5) 1%, transparent 30%)" }}>
                        {/* <Image image_id={event.image_id} aspectRatio={1 / 1} sx={{ position: 'relative', zIndex: -1 }} /> */}
                    </Box>
                    <CardContent sx={{ pt: 0, alignSelf: 'center' }}>
                        <Typography variant="body2">
                            {event.organization.organization_name}
                        </Typography>
                        <Typography variant="h3">
                            {event.title}
                        </Typography>
                        <Stack direction={'row'} gap={1} sx={{ pb: 1, pt: 1, flexWrap: 'wrap' }}>
                            <Chip color='secondary' icon={<EventIcon />} label={event.start_date} />
                            <Chip color='secondary' icon={<ScheduleIcon />} label={event.end_date} />
                        </Stack>
                        <Typography variant="body2">
                            {event.extract}
                        </Typography>
                    </CardContent>
                </Stack>
            </Link>
               
              </Card>
            ))}
    </Container>
  );
}