interface Props {
    message: string | undefined
    children?: React.ReactNode
    [x:string]: any
}
function ErrorNode({message, children, ...props}: Props) {
    if(!message) return <div className="min-h-[24px] m-4"></div>
    return (
        <div className={`flex justify-center items-center text-error-dark m-4`} aria-busy={true} {...props}>
            <b>
                {message}
                {children}
            </b>
        </div>
    )
}

export { ErrorNode }
