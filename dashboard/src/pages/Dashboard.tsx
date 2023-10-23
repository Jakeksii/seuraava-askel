import Header from "../assets/components/Header";
import { Link } from "react-router-dom";

export default function Dasboard() {
    //const appContext = useAppContext()
    return (
        <>
        <Header />
        <main>

            <h2 className="text-center p-2">Listaa Seurakunta</h2>
            <h2 className="text-center p-2">Liity Seurakuntaan</h2>
            <Link to="/chooseorganization" className="text-center p-2"> Valitse seurakunta </Link>
        </main>
        </>
    )
}