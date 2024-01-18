import { Box } from "@mui/material"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function Main({ children }: Props) {
    return (
        <main>
            <Box margin={4}>
                {children}
            </Box>
        </main>
    )
}