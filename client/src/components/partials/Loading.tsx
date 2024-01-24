import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
interface Props {
    size: number
}
function Loading({ size }: Props) {
    return (
        <CircularProgress size={size} />
    )
}
Loading.defaultProps = {
    size: 50
}

export default Loading