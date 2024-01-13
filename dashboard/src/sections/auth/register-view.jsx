import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useRouter } from 'src/routes/hooks';

import { useRegister } from 'src/hooks/api-hooks/useAuthenticate';

import { useAppContext } from 'src/context/appContext';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import { validatePassword } from 'src/utils/test-password';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const theme = useTheme();
  const router = useRouter();
  const { mutate, isLoading } = useRegister()
  const { setSession } = useAppContext()
  const formRef = useRef()
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('')

  const [credintials, setCredintials] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })
  const [validationErrorVisible, setValidationErrorVisible] = useState({
    first_name: false,
    last_name: false,
    email: false,
    password: false
  })

  const handleValueChange = (e) => {
    if(e.target.name === 'password'){
      if(validatePassword(formRef.current.elements.password.value)) {
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
        onSuccess: (data) => {
          // Login success store data to context and session
          setSession(data)
          localStorage.setItem('token', data.token)
          router.push('/verify-email')
        },
        onError: (error) => {
          // Register error
          if(!error.response) return setError('Tarkista verkkoyhteytesi')
          switch(error.response.status) {
            case 409:
              setError("Syöttämäsi sähköpostiosoite on jo käytössä")
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
        <Stack direction="row" gap={2} justifyContent="flex-end" sx={{ my: 3 }}>
          <TextField
            name={'first_name'}
            label='Etunimi'
            required
            error={!!(validationErrorVisible.first_name && formRef.current?.elements['first_name']?.validationMessage)}
            helperText={validationErrorVisible.first_name && formRef.current?.elements['first_name']?.validationMessage}
            InputLabelProps={{ required: false }}
            value={credintials.first_name}
            onChange={handleValueChange}
            onBlur={handleBlur}
          />
          <TextField
            name={'last_name'}
            label='Sukunimi'
            required
            error={!!(validationErrorVisible.last_name && formRef.current?.elements['last_name']?.validationMessage)}
            helperText={validationErrorVisible.last_name && formRef.current?.elements['last_name']?.validationMessage}
            InputLabelProps={{ required: false }}
            value={credintials.last_name}
            onChange={handleValueChange}
            onBlur={handleBlur}
          />

        </Stack>
        <TextField
          name={'email'}
          type='email'
          label='Sähköposti'
          required
          error={!!(validationErrorVisible.email && formRef.current?.elements.email?.validationMessage)}
          helperText={validationErrorVisible.email && formRef.current?.elements.email?.validationMessage}
          InputLabelProps={{ required: false }}
          value={credintials.email}
          onChange={handleValueChange}
          onBlur={handleBlur}
        />
        
        <TextField
          name={'password'}
          type={showPassword ? 'text':'password'}
          autoComplete='new-password'
          label='Salasana'
          required
          error={!!(validationErrorVisible.password && formRef.current?.elements.password?.validationMessage)}
          helperText={validationErrorVisible.password && formRef.current?.elements.password?.validationMessage}
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
          Rekisteröidy
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
          <Typography variant="h4">Rekisteröidy</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
            Oletko jo rekisteröitynyt?
            <Link variant="subtitle2" component={'button'} sx={{ ml: 0.5 }} onClick={() => { router.push('/login') }}>
              Kirjaudu
            </Link>
          </Typography>

          <Typography variant="body1" color={'error'} sx={{ mb: 5 }}>
            {error}
          </Typography>
          {renderForm}

        </Card>
      </Stack>
    </Box>
  );
}