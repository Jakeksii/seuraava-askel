
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRange } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';


import Header from "../assets/components/Header";
import { useAppContext } from '../assets/context/appContext';
import DragDropFiles from '../assets/components/DragDropFiles';

import * as React from 'react';



export default function CreateEvent() {

    const [value, setValue] = React.useState<DateRange<Dayjs>>([
        dayjs('2022-04-17'),
        dayjs('2022-04-21'),
      ]);

    const appContext = useAppContext()


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

    };
    return (
        <>
        <Header />
        
        <main>

                <Container component="section" maxWidth="xs" className='mt-6'>
                    <div className='flex flex-col items-center p-2'>
                        <Box component="form" onSubmit={handleSubmit}>

                            <TextField
                                color='info'
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Tapahtuman nimi"
                                name="title"
                                autoFocus
                            />

                            <TextField
                                color='info'
                                margin="normal"
                                required
                                fullWidth
                                id="description"
                                label="Tapahtuman kuvaus"
                                name="description"
                                autoFocus
                            />

                            {/* https://mui.com/x/react-date-pickers/date-range-picker/#uncontrolled-vs-controlled-value */}
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
                                    <DemoItem label="Uncontrolled picker" component="DateRangePicker">
                                    <DateRangePicker
                                        defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
                                    />
                                    </DemoItem>

                                </DemoContainer>
                                </LocalizationProvider>

                            <TextField
                                color='info'
                                margin="normal"
                                required
                                fullWidth
                                name="phone-number"
                                label="Puhelin numero"
                                type="text"
                                id="phone-number"             
                            />


                            <TextField
                                color='info'
                                margin="normal"
                                required
                                fullWidth
                                name="leader"
                                label="Johtaja"
                                type="text"
                                id="leader"
                                
                            />

                            <h2> Osoite </h2>
                            <TextField
                                color='info'
                                margin="normal"
                                required
                                fullWidth
                                name="street"
                                label="Katu"
                                type="street"
                                id="street"
                                
                            />
                            
                            <TextField
                                color='info'
                                margin="normal"
                                required
                                fullWidth
                                name="city"
                                label="Kaupunki"
                                type="city"
                                id="city"
                                
                            />
                            
                            <TextField
                                color='info'
                                margin="normal"
                                required
                                fullWidth
                                name="state"
                                label="Maakunta"
                                type="state"
                                id="state"
                                
                            />

                            
                            <TextField
                                color='info'
                                margin="normal"
                                required
                                fullWidth
                                name="zipcode"
                                label="Postinumero"
                                type="zipcode"
                                id="zipcode"
                                
                            />

                            <TextField
                                color='info'
                                margin="normal"
                                required
                                fullWidth
                                name="country"
                                label="Maa"
                                type="country"
                                id="country"
                            />
                            
                            <h2> koordinaatit pitäis nappaa</h2>

                            
                            <TextField
                                color='info'
                                margin="normal"
                                required
                                fullWidth
                                name="speaker"
                                label="Puhuja"
                                type="text"
                                id="speaker"
                                
                            />

                            <TextField
                                color='info'
                                margin="normal"
                                required
                                fullWidth
                                name="music"
                                label="Ylistys"
                                type="text"
                                id="music"    
                            />

                            <TextField
                                color='info'
                                margin="normal"
                                required
                                fullWidth
                                name="page-url"
                                label="Linkki"
                                type="url"
                                id="page-url"    
                            />

                            <div className='drag-container'>
                                <h3>Lataa kuva tapahtumasta</h3>
                                <DragDropFiles />
                            </div>
                           
                                          
                            <Button
                                type="submit"
                                color="primary"
                                fullWidth
                                variant="contained"
                                
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Luo tapahtuma
                            </Button>
                            
                        </Box>
                    </div>
                </Container>
            </main>
        </>
    )
}