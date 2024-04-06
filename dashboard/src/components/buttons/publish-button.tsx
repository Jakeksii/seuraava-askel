import { LoadingButton } from '@mui/lab';

type Props = {
  disabled: boolean
}

export function PublishButton({ disabled = true }: Props) {

  return (
    <LoadingButton variant="contained" color="success"
      disabled={disabled}
    >
      Julkaise
    </LoadingButton>
  )
}

