import { Link } from "react-router-dom";
import Header from "../assets/components/Header";
import { useAppContext } from "../assets/context/appContext";
import OrganizationPreview from "../assets/components/OrganizationPreview";



export default function Organization() {

    const appContext = useAppContext()

    const organization = appContext.user?.user.organizations?.[0]

    // tänne hae kaikki organisaatiot, joissa on käyttäjän id


    return (
        <>
        <Header />
        <main>
          <h2>Kuulut {organization && organization.organization_name} seurakuntaan </h2>
          <p>Tähän Seurakunnan kuva string </p>
        <OrganizationPreview />
        <Link to="/Create" className="btn-primary"> Muokkaa seurakunnan tietoja (Väärä linkki, menee "luo seurakunta") </Link>
        </main>
        </>
    )
}