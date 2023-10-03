
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


import Container from '@mui/material/Container';

import TextField from '@mui/material/TextField';
import Header from "../assets/components/Header";
import { useAppContext } from '../assets/context/appContext';
import DragDropFiles from '../assets/components/DragDropFiles';


export default function CreateOrganization() {


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
                                id="name"
                                label="Seurakunnan nimi"
                                name="name"
                                autoFocus
                            />

                            <TextField
                                color='info'
                                margin="normal"
                                required
                                fullWidth
                                name="nomination"
                                label="Kirkkokunta"
                                type="text"
                                id="nomination"
                                
                            />

                            <TextField
                                color='info'
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Sähköposti"
                                type='email'
                                name="email"
                                
                                autoFocus
                            />
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
                                name="business-id"
                                label="Y-tunnus"
                                type="text"
                                id="business-id"
                                
                            />

                            <div className='drag-container'>
                                <DragDropFiles />
                            </div>
                           
                                          
                            <Button
                                type="submit"
                                color="primary"
                                fullWidth
                                variant="contained"
                                
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Luo seurakunta
                            </Button>
                            
                        </Box>
                    </div>
                </Container>
            </main>
        </>
    )
}