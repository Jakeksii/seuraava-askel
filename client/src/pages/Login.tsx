import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from "@mui/material/CircularProgress";
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../assets/components/Header';
import { useLogin } from '../assets/hooks/api-hooks/useAuthenticate';
import { useAppContext } from '../assets/context/appContext';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link to="/" className='text-info-main'>
                Seuraava Askel
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function getErrorMessage(status: number): string {
    if(!status) return ""
    switch(status) {
        case 400:
            return "Tarkista salasana ja sähköposti osoite"
        case 500:
            return "Sisäinen palvelin virhe. Yritä uudelleen"
        default:
            return "Jokin meni vikaan. Yritä uudelleen"
    }
}


export default function Login() {
    const appContext = useAppContext()
    const navigate = useNavigate()
    const location = useLocation()
    const { mutate, isLoading, error } = useLogin()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        mutate({
                email: formData.get('email')?.toString(), 
                password: formData.get('password')?.toString()
            },
            {
                onSuccess(data) {
                    appContext.setUser(data)
                    sessionStorage.setItem('user_data', JSON.stringify(data))
                    location.state?.from ? navigate(location.state.from, {replace: true}) : navigate('/dashboard', {replace: true})
                },
            }
        )
    };

    return (
        <>
            <Header />
            <main>
                <Container component="section" maxWidth="xs">
                    <div className='mt-4 flex flex-col items-center p-2 '>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.dark' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <div className='pt-2 text-error-main'>
                            <p>{getErrorMessage((error as any)?.response.status)}</p>
                        </div>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                            <FormControlLabel
                                control={<Checkbox value="remember" color="info" />}
                                label="Muista minut"
                            />
                            <Button
                                type="submit"
                                color="primary"
                                fullWidth
                                variant="contained"
                                disabled={isLoading}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {isLoading ? <CircularProgress size={'26px'} color='info' /> : <p>Kirjaudu sisään</p>}
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="#" className='text-info-main'>
                                        Unohtuiko salasana?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/register" className='text-info-main'>
                                        {"Ei tiliä? Rekisteröidy."}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                    <Copyright sx={{ mt: 6, mb: 0 }} />
                </Container>
            </main>
        </>
    );
}