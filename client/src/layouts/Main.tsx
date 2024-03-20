import { Box } from "@mui/material"
import { ReactNode } from "react"
import { useIsMobile, useIsTiny } from "src/hooks/useResponsive"

type Props = {
    children: ReactNode
}

export default function Main({ children }: Props) {
    const isMobile = useIsMobile()
    const isTiny = useIsTiny()
    const margin = isMobile ? (isTiny ? 1 : 2) : 4
    return (
        <main>
            <Box sx={{m: margin, mt:4}} minHeight={'100vh'}>
                {children}
            </Box>
        </main>
    )
}