

import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';

import { useAppContext } from 'src/context/appContext';
import { useGetUser } from 'src/hooks/api-hooks/useAuthenticate';
import { useEffect, useState, useCallback } from 'react';

import axios from 'axios';
// ----------------------------------------------------------------------

interface Event {
  _id: string;
  title: string;
  start_date: string;
  // Add more properties as needed
}

export default function EventsView() {
  const { session } = useAppContext()
  const { data: user } = useGetUser(session!.token)

  const [events, setEvents] = useState<Event[]>([]);
  
  
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
    } catch (error) {
      console.error("Error fetching events:", error);
      // Handle error appropriately, e.g., set state to show an error message
    }
  }, [orgId, session]); // Add dependencies to the dependency array

  useEffect(() => {
    getEvents(); // Call the getEvents function inside useEffect
  }, [getEvents]); // Add getEvents to the dependency array to satisfy the exhaustive-deps rule

  return (
    <Container>
      <Typography variant="h4" pb={5}>Katsele ja muokkaa tapahtumia</Typography>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hei {user.first_name}, Tässä tapahtumasi👋
      </Typography>
      <div>
      <h1>Events</h1>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <p>Title: {event.title}</p>
            <p>Start Date: {event.start_date}</p>
            {/* Add more event properties as needed */}
          </li>
        ))}
      </ul>
    </div>
    </Container>
  );
}