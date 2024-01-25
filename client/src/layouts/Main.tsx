import { Box } from "@mui/material"
import { ReactNode } from "react"
import { useIsTiny } from "src/hooks/useResponsive"

type Props = {
    children: ReactNode
}

export default function Main({ children }: Props) {
    const margin = (useIsTiny()) ? 0 : 4
    return (
        <main>
            <Box sx={{m: margin, mt:4}} minHeight={'100vh'}>
                {children}
            </Box>
        </main>
    )
}