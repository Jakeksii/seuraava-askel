import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
interface Props {
    color?: string
    size?: number
    [x: string]: any
}
function Loading({ color, size, ...props }: Props) {
    return (
        <div className={`flex justify-center items-center m-4 text-${color}`} aria-busy={true} {...props}>
            <CircularProgress size={size} color={'inherit'} />
        </div>
    )
}
Loading.defaultProps = {
    color: 'white',
    size: 50
}

export default Loading