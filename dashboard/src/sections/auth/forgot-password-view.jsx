import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { useRef, useState } from 'react';

import { useRouter } from 'src/routes/hooks';

import { useForgotPassword } from 'src/hooks/api-hooks/useAuthenticate';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

export default function ForgotPasswordView() {
  const theme = useTheme();
  const router = useRouter();
  const { mutate, isLoading, isSuccess } = useForgotPassword()
  const formRef = useRef()
  const [error, setError] = useState('')
  const [error404, setError404] = useState(false)

  const [credintials, setCredintials] = useState({
    email: '',
  })
  const [validationErrorVisible, setValidationErrorVisible] = useState({
    email: false
  })

  const handleValueChange = (e) => {
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
          // Register error
          if (!error.response) return setError('Tarkista verkkoyhteytesi')
          switch (error.response.status) {
            case 404:
              setError404(true)
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

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color='success'
          loading={isLoading}
        >
          Lähetä
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
          <Typography variant="h4">Salasanan nollaus</Typography>

          {!isSuccess &&
            <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
              Muistuiko salasana?
              <Link variant="subtitle2" component={'button'} sx={{ ml: 0.5 }} onClick={() => { router.push('/login') }}>
                Takaisin
              </Link>
            </Typography>
          }

          <Typography variant="body1" color={'error'} sx={{ mb: 1 }}>
            {error}
            {error404 &&
              <Typography variant="body1" sx={{ mb: 0 }}>
                Syöttämääsi sähköpostia ei löytynyt.
                <Link variant="subtitle2" component={'button'} sx={{ ml: 0.5 }} onClick={() => { router.push('/register') }}>
                  Rekisteröidy
                </Link>
              </Typography>}
          </Typography>

          {!isSuccess && renderForm}

          {isSuccess &&
            <>
              <Typography variant="h5" sx={{ mt: 2, mb: 5 }}>
                Linkki salasanan vaihtamiseen on lähetetty sähköpostiin
                <br />
                <Link>
                  {credintials.email}
                </Link>
              </Typography>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color='success'
                onClick={() => { router.push('/') }}
              >
                Takaisin
              </LoadingButton>
            </>
          }

        </Card>
      </Stack>
    </Box>
  );
}