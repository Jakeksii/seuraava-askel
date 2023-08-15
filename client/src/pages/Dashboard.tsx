import Header from "../assets/components/Header";
import { useAppContext } from "../assets/context/appContext";

type OrganizationProps = {
    name: string
    link: string
}
function Organization() {
    return (
        <></>
    )
}

export default function Dasboard() {
    const appContext = useAppContext()
    return (
        <>
        <Header />
        <main>
            <div className="p-4"/>
            <h2 className="text-center">Valitse hallittava seurakunta</h2>
            <Organization />
            
        </main>
        </>
    )
}