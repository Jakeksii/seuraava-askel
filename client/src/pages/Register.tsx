import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Header from '../assets/components/Header';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link className='text-info-main' to="/">
                Seuraava Askel
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function Register() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <>
            <Header />
            <main>
                <Container component="section" maxWidth="xs">
                    <div className='mt-4 flex flex-col items-center p-2'>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <Grid container gap={2}>
                                <Grid item xs>
                                    <TextField
                                        color='info'
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        color='info'
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>

                            </Grid>
                            <TextField
                                color='info'
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Sähköposti"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                color='info'
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Salasana"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Rekisteröidy
                            </Button>
                            <div className='text-center'>
                                <Link to="/login" className='text-info-main'>
                                    Onko jo tili olemassa? Kirjaudu sisään.
                                </Link>
                            </div>
                        </Box>
                    </div>
                    <Copyright sx={{ mt: 6, mb: 0 }} />
                </Container>
            </main>
        </>

    );
}