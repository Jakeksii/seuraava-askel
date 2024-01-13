import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import { LoadingButton } from '@mui/lab';
import { CircularProgress } from '@mui/material';
import Logo from 'src/components/logo';
import { useAppContext } from 'src/context/appContext';
import { useCreateVerifyEmail, useGetUser, useLogout } from 'src/hooks/api-hooks/useAuthenticate';

// ----------------------------------------------------------------------

export default function VerifyEmailView() {
  const theme = useTheme()
  const { session } = useAppContext()
  const { data: user } = useGetUser(session.token)
  const { mutate, isLoading, isSuccess, isError } = useCreateVerifyEmail()
  const { logout } = useLogout()
  const [error, setError] = useState('')

  useEffect(() => {
    sendEmailVerification()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sendEmailVerification = () => {
    mutate({ token: session.token }, {
      onSuccess: () => {
        console.log('Email verification link send')
      },
      onError: (error) => {
        if (!error.response) return setError('Tarkista verkkoyhteytesi')
        switch (error.response.status) {
          case 409:
            setError('Virhe 409: Sähköpostisi on jo vahvistettu! Kirjaudu sisään uudelleen.')
            break
          case 429:
            setError('Olet yrittänyt liian monta kertaa. Odota hetki ja yritä uudestaan.')
            break
          default:
            setError('Oho, jokin meni vikaan.')
            break
        }
      }
    })
  }

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
            display: 'grid'
          }}
        >

          <Typography variant="h4" sx={{ mb: 5 }}>Vahvista sähköposti</Typography>

          { isLoading && <CircularProgress sx={{ justifySelf: 'center' }} /> }
          {
            isSuccess && <>
                <Typography variant="body1" sx={{ mb: 5 }}>
                  Hei {user.first_name}, olemme lähettäneet sähköpostivahvistuksen osoitteeseen <Link underline='none'>{user.email}</Link>
                </Typography>
                <Typography variant="body2">
                  Etkö saanut sähköpostia?
                </Typography>

                <LoadingButton
                  size="medium"
                  variant="text"
                  onClick={sendEmailVerification}
                  sx={{ mb: 2, textAlign: 'left', justifySelf: 'left' }}
                >
                  Lähetä viesti uudelleen
                </LoadingButton>
              </>
          }
          { isError && <Typography variant="body1" color={'error'}> {error} </Typography> }

          <LoadingButton
            fullWidth
            color='error'
            size="small"
            variant="text"
            onClick={logout}
            sx={{ mt: 5 }}
          >
            Kirjaudu ulos
          </LoadingButton>
        </Card>
      </Stack>
    </Box>
  );
}
