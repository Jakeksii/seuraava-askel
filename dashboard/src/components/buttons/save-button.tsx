import { LoadingButton } from '@mui/lab';
/* eslint-disable-next-line */
export function SaveButton({...props}: {[key: string]: any}) {
    
    return (
        <LoadingButton variant="contained" color="primary" {...props} >
          Tallenna
        </LoadingButton>
    )
}