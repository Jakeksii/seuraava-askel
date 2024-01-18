import { ReactNode } from "react"
import Header from "../assets/components/Header"
import AppBar from "../assets/components/AppBar/AppBar"
import Main from "./Main"
import Footer from "./Footer"

type Props = {
    children: ReactNode
}

export default function AppLayout({ children }: Props) {
    return (
        <>
            <Header />

            <AppBar />

            <Main>
                {children}
            </Main>

            <Footer />
        </>
    )
}