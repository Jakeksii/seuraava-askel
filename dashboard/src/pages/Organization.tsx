import { Link } from "react-router-dom";
import Header from "../assets/components/Header";
import { useAppContext } from "../assets/context/appContext";



export default function Organization() {

    const appContext = useAppContext()

    const organization = appContext.user?.user.organizations?.[0]

    // tänne hae kaikki organisaatiot, joissa on käyttäjän id


    return (
        <>
        <Header />
        <main>
        <h2 className="text-center p-2">Seurakunnan esikatselu / muokkaus sivu</h2>
        <h1>täällä näkyy tämä {organization && organization.organization_name}</h1>
        {/* miksi ei toimi?? */}

        <Link to="/Create" className="btn-primary"> Tee seurakunta </Link>
        </main>
        </>
    )
}