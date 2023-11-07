import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AxiosError } from 'axios';
import { BaseSyntheticEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ErrorNode } from '../assets/components/partials/Error';
import { ERROR_DEFAULT, ERROR_NETWORK } from '../assets/constants';
import { useAppContext } from '../assets/context/appContext';
import { useLogin } from '../assets/hooks/api-hooks/useAuthenticate';

function getErrorMessage(statusCode: number | undefined): string {
    switch (statusCode) {
        case undefined: // Ei vastausta
            return ERROR_NETWORK
        case 400:
            return 'Väärä sähköposti tai salasana'
        default:
            return ERROR_DEFAULT
    }
}

type Values = {
    email: string
    password: string
}

export default function Login() {
    const appContext = useAppContext()
    const navigate = useNavigate()
    const location = useLocation()
    const { mutate, isLoading } = useLogin()
    const [errorMessage, setErrorMessage] = useState<string>()
    const [values, setValues] = useState<Values>({
        email: '',
        password: ''
    })
    const [stayLoggedIn, setStayLoggedIn] = useState(false)

    function handleChange(e: BaseSyntheticEvent) {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        mutate({ email: values.email, password: values.password }, {
            onSuccess(data) {
                // lisää käyttäjä localStorageen mikäli on valittu 'pysy kirjautuneena'
                appContext.setUser(data)
                if (stayLoggedIn) {
                    localStorage.setItem('user_data', JSON.stringify(data))
                } else {
                    sessionStorage.setItem('user_data', JSON.stringify(data))
                }
                location.state?.from ? navigate(location.state.from, { replace: true }) : navigate('/', { replace: true })
            },
            onError(error) {
                const axiosError = error as AxiosError
                setErrorMessage(getErrorMessage(axiosError.response?.status))
            }
        })
    }

    return (
        <main>
            <Container component="section" maxWidth="xs" className='mt-6'>
                <div className='flex flex-col items-center p-2'>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.dark' }}>
                        <LockOutlinedIcon />
                    </Avatar >
                    <ErrorNode message={errorMessage} />
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            color='info'
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            spellCheck={false}
                            label="Sähköposti"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={values.email}
                            onChange={handleChange}
                        />
                        <TextField
                            color='info'
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Salasana"
                            spellCheck={false}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={values.password}
                            onChange={handleChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="info" />}
                            label="Pysy kirjautuneena"
                            value={stayLoggedIn}
                            onChange={() => setStayLoggedIn(!stayLoggedIn)}
                        />
                        <Button
                            type="submit"
                            color="primary"
                            fullWidth
                            variant="contained"
                            disabled={isLoading}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Kirjaudu sisään
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
            </Container>
        </main>
    );
}