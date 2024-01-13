
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import { Button, CircularProgress, Typography } from '@mui/material';
import { useQueryClient } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import Logo from 'src/components/logo';
import { useVerifyEmail } from 'src/hooks/api-hooks/useAuthenticate';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function VerifiedEmailView() {
  const theme = useTheme()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const { isLoading, isSuccess, isError, error } = useVerifyEmail({ verification_token: searchParams.get('verification_token') })

  const continueClick = () => {
    queryClient.invalidateQueries('user')
    router.push('/')
  }

  function getErrorText() {
    if (!error.response) return 'Tarkista verkkoyhteytesi'
    switch (error.response.status) {
      case 401:
        return "Tunnuksen vahvistus epäonnistui. Linkki on voinut vanhentua."
      case 429:
        return 'Olet yrittänyt liian monta kertaa. Odota hetki ja yritä uudestaan.'
      default:
        return'Oho, jokin meni vikaan. Kokeile myöhemmin uudelleen.'
    }
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
          <Typography variant="h4">Sähköpostin vahvistus</Typography>
          {isLoading && <CircularProgress sx={{ justifySelf: 'center', mt: 2 }} />}
          {isSuccess && <Typography variant="body1">Sähköpostisi on vahvistettu!</Typography>}
          {isError && <Typography variant="body1" color={'error'}>{getErrorText()}</Typography>}

          <br />
          {(isSuccess || isError) &&
            <Button
              fullWidth
              color='success'
              size="large"
              variant="contained"
              onClick={continueClick}
            >
              Jatka
            </Button>
          }
        </Card>
      </Stack>
    </Box>
  );
}
