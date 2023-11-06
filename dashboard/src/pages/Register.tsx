import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Checkbox, FormControlLabel } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AxiosError } from 'axios';
import { BaseSyntheticEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ErrorNode } from '../assets/components/partials/Error';
import { ERROR_DEFAULT, ERROR_NETWORK } from '../assets/constants';
import { useAppContext } from '../assets/context/appContext';
import { useLogin, useRegister } from '../assets/hooks/api-hooks/useAuthenticate';

function getErrorMessage(statusCode: number | undefined): string {
    switch (statusCode) {
        case undefined: // Ei vastausta
            return ERROR_NETWORK
        case 400:
            return 'Sähköposti on virheellinen'
        case 409:
            return 'Sähköposti on käytössä'
        default:
            return ERROR_DEFAULT
    }
}

type Values = {
    first_name: string
    last_name: string
    email: string
    password: string
}


export default function Register() {
    const appContext = useAppContext()
    const navigate = useNavigate()
    const location = useLocation()
    const { mutate: register } = useRegister()
    const { mutate: login } = useLogin()
    const [errorMessage, setErrorMessage] = useState<string>()
    const [isRegistered, setRegistered] = useState(false)
    const [stayLoggedIn, setStayLoggedIn] = useState(false)
    const [values, setValues] = useState<Values>({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    })
    

    function handleChange(e: BaseSyntheticEvent) {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        register({ ...values }, {
            onSuccess() {
                setRegistered(true)
                setErrorMessage(undefined)
            },
            onError(error) {
                const axiosError = error as AxiosError
                setErrorMessage(getErrorMessage(axiosError.response?.status))
            }
        })
    }

    const handleLogin = () => {
        login({ email: values.email, password: values.password }, {
            onSuccess(data) {
                setErrorMessage(undefined)
                appContext.setUser(data)
                if (stayLoggedIn) localStorage.setItem('user_data', JSON.stringify(data))
                location.state?.from ? navigate(location.state.from, { replace: true }) : navigate('/', { replace: true })
            },
            onError(error) {
                const axiosError = error as AxiosError
                setErrorMessage(getErrorMessage(axiosError.response?.status))
            }
        })
    }

    const registerSuccessElement = (
        <>
            <h2 className='text-center mt-6'>Hei, {values.first_name} rekisteröinti onnistui</h2>
            <ErrorNode message={errorMessage} />
            <FormControlLabel
                control={<Checkbox value="remember" color="info" />}
                label="Pysy kirjautuneena"
                value={stayLoggedIn}
                onChange={() => setStayLoggedIn(!stayLoggedIn)}
            />
            <Button variant='contained' fullWidth onClick={handleLogin}>
                Kirjaudu sisään
            </Button>
        </>
    )
    const registerElement = (
        <>
            <ErrorNode message={errorMessage} />
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container gap={2}>
                    <Grid item xs>
                        <TextField
                            color='info'
                            autoComplete="given-name"
                            spellCheck={false}
                            name="first_name"
                            required
                            fullWidth
                            id="first_name"
                            label="First Name"
                            autoFocus
                            value={values.first_name}
                            onChange={handleChange}
                            className=' autofill:bg-blend-color-burn'
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            color='info'
                            required
                            fullWidth
                            spellCheck={false}
                            id="last_name"
                            label="Last Name"
                            name="last_name"
                            autoComplete="family-name"
                            value={values.last_name}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <TextField
                    color='info'
                    margin="normal"
                    required
                    fullWidth
                    spellCheck={false}
                    type='email'
                    id="email"
                    label="Sähköposti"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                />
                <TextField
                    color='info'
                    margin="normal"
                    required
                    fullWidth
                    spellCheck={false}
                    name="password"
                    label="Salasana"
                    type="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size='large'
                    sx={{ mt: 3, mb: 2 }}
                >
                    Rekisteröidy
                </Button>
                <div className='text-center'>
                    <Link to="/login" replace className='text-info-main'>
                        Onko jo tili olemassa? Kirjaudu sisään.
                    </Link>
                </div>
            </Box>
        </>
    )

    return (
        <main>
            <Container component="section" maxWidth="xs" className='mt-6'>
                <div className='flex flex-col items-center p-2'>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.dark' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    {isRegistered ? registerSuccessElement : registerElement}
                </div>
            </Container>
        </main>
    );
}