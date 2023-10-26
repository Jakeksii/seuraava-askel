import Header from "../assets/components/Header";
import { Link } from "react-router-dom";

export default function Dasboard() {
    //const appContext = useAppContext()
    return (
        <>
        <Header />
        <main>

            <Link to="/create" className="text-center p-2"> Listaa Seurakunta </Link>
            <Link to="/join-organization" className="text-center p-2"> Liity Seurakuntaan </Link>
            <Link to="/chooseorganization" className="text-center p-2"> Valitse seurakunta </Link>
        </main>
        </>
    )
}