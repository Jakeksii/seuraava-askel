import { ReactNode } from "react"
import Header from "./Header"
import AppBar from "../components/AppBar/AppBar"
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