import { LoadingButton } from '@mui/lab';
type Props = {
  disabled?: boolean
  loading: boolean
  formId: string
  fullwidth?: boolean
}

export function PublishButton({ disabled, loading, formId, fullwidth }: Props) {

  return (
    <LoadingButton variant="contained" color="success"
      disabled={disabled}
      loading={loading}
      type='submit'
      fullWidth={fullwidth}
      form={formId}
    >
      Julkaise
    </LoadingButton>
  )
}

