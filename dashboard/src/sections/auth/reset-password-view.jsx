import { useRef, useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useRouter } from 'src/routes/hooks';

import { useResetPassword } from 'src/hooks/api-hooks/useAuthenticate';


import { bgGradient } from 'src/theme/css';

import { useSearchParams } from 'react-router-dom';
import Logo from 'src/components/logo';
import { validatePassword } from 'src/utils/test-password';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const [searchParams] = useSearchParams()
  const { mutate, isLoading, isSuccess } = useResetPassword()
  const formRef = useRef()
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('')
  const [error401, setError401] = useState(false)
  const [credintials, setCredintials] = useState({
    reset_token: searchParams.get('reset_token'),
    password: '',
  })
  const [validationErrorVisible, setValidationErrorVisible] = useState({
    password: false
  })

  const handleValueChange = (e) => {
    if (e.target.name === 'password') {
      if (validatePassword(formRef.current.elements.password.value)) {
        e.target.setCustomValidity('');
      } else {
        e.target.setCustomValidity("Salasanan on oltava vähintään 8 merkkiä pitkä ja siinä on oltava vähintään yksi iso ja pieni kirjain sekä numero.")
      }
    }

    setCredintials({
      ...credintials,
      [e.target.name]: e.target.value
    })
  }

  const handleBlur = (e) => {
    setValidationErrorVisible({
      ...validationErrorVisible,
      [e.target.name]: true
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formRef.current.checkValidity()) {
      mutate(credintials, {
        onError: (error) => {
          if (!error.response) return setError('Tarkista verkkoyhteytesi')
          switch (error.response.status) {
            case 401:
              setError401(true)
              break
            default:
              setError('Oho, jokin meni vikaan')
              break
          }
        }
      })
    }
  };

  const renderForm = (
    <form noValidate onSubmit={handleSubmit} ref={formRef}>
      <Stack spacing={3}>
        <TextField
          name={'password'}
          type={showPassword ? 'text' : 'password'}
          label='Uusi salasana'
          autoComplete='new-password'
          required
          error={!!(validationErrorVisible.password && formRef.current?.elements['password']?.validationMessage)}
          helperText={validationErrorVisible.password && formRef.current?.elements['password']?.validationMessage}
          InputLabelProps={{ required: false }}
          value={credintials.password}
          onChange={handleValueChange}
          onBlur={handleBlur}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color='success'
          loading={isLoading}
        >
          Vaihda
        </LoadingButton>
      </Stack>
    </form>
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
          <Typography variant="h4">Vaihda salasana</Typography>

          <Typography variant="body1" color={'error'} sx={{ mb: 5 }}>
            {error}
          </Typography>

          {error401 &&
            <>
              <Typography variant="h5" color='error' sx={{ mt: 2, mb: 5 }}>
                Pääsytunnuksen vahvistus epäonnistui. Linkki on voinut vanhentua.
              </Typography>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                onClick={() => { router.push('/forgot-password') }}
              >
                Lähetä uusi linkki
              </LoadingButton>
            </>
          }

          {!error401 && !isSuccess && renderForm}

          {isSuccess &&
            <>
              <Typography variant="h5" color='success' sx={{ mt: 2, mb: 5 }}>
                Salasanasi on nyt vaihdettu!
              </Typography>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color='success'
                onClick={() => { router.push('/login') }}
              >
                Kirjaudu sisään
              </LoadingButton>
            </>
          }

        </Card>
      </Stack>
    </Box>
  );
}
