import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useRouter } from 'src/routes/hooks';

import { useLogin } from 'src/hooks/api-hooks/useAuthenticate';

import { useAppContext } from 'src/context/appContext';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const theme = useTheme();
  const router = useRouter();
  const { mutate, isLoading } = useLogin()
  const { setSession } = useAppContext()

  const [showPassword, setShowPassword] = useState(false);

  const [credintials, setCredintials] = useState({
    email: '',
    password: '',
  })

  const handleValueChange = (e) => {
    setCredintials({
      ...credintials,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = () => {
    mutate(credintials, {
      onSuccess: (data) => {
        // Login success store data to context and session
        setSession(data)
        sessionStorage.setItem('session_data', JSON.stringify(data))
        router.push('/')
      },
      onError: (error) => {
        // Login error
        console.error(error)
      }
    })
  };

  const renderForm = (
    <>
      <Stack component='form' spacing={3}>
        <Typography>Not implemented</Typography>
        <TextField 
          name="email" 
          label="Email address"
          value={credintials.email}
          onChange={handleValueChange} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={credintials.password}
          onChange={handleValueChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Unohtuiko salasana?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        loading={isLoading}
        onClick={handleClick}
      >
        Kirjaudu
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Kirjaudu sisään</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Ei käyttäjää?
            <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={() => {router.push('/register')}}>
              Rekisteröidy
            </Link>
          </Typography>

          {renderForm}

        </Card>
      </Stack>
    </Box>
  );
}