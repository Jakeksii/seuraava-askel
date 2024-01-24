import { Box } from "@mui/material"
import { ReactNode } from "react"
import { useResponsive } from "src/hooks/useResponsive"

type Props = {
    children: ReactNode
}

export default function Main({ children }: Props) {
    const margin = (useResponsive('down', 'xs')) ? 1 : 4
    return (
        <main>
            <Box display={'grid'} sx={{m: margin, mt:4}} minHeight={'100vh'}>
                {children}
            </Box>
        </main>
    )
}