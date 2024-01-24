import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
type Props = {
    variant: 'h3' | 'h4' | 'h5' | 'body1'
    text: string
}
function Error({ variant, text }: Props) {
    return (
        <Stack>
            <Typography color='error' textAlign='center' variant={variant}>{text}</Typography>
        </Stack>
    )
}
Error.defaultProps = {
    variant: 'h3',
    text: 'Oho, jokin meni vikaan'
}

export default Error