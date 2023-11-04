import { ERROR_DEFAULT } from "../../constants"

interface Props {
    color?: string
    message?: string
    children?: React.ReactNode
    [x:string]: any
}
export function ErrorNode({color, message, children, ...props}: Props) {
    const errorMessage = message ?? ERROR_DEFAULT
    return (
        <div className={`flex justify-center items-center m-4 text-${color}`} aria-busy={true} {...props}>
            <b>
                {errorMessage}
                {children}
            </b>
        </div>
    )
}