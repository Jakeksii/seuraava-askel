import Header from "../assets/components/Header";
import { Link } from "react-router-dom";



type Props = {
    imageID: string
    title: string
    extract: string
    organization: string
    distance: number | null
    startDate: Date
    endDate: Date
    _id: string
}


export default function Event(props: Props) {

    // tänne hae kaikki Eventit joissa on organisaation id
   
    return (
        <>
        <Header />
        <main>
        <h2 className="text-center p-2">Tapahtuman sivu. Luo uusi / muokkaa</h2>
        <h2> Kyseisen organisaation tapahtumat: </h2>
        <Link to="/:organization_id/events" className="btn-primary">Tästä</Link>
        <p><br></br></p>
        <Link to="/:organization_id/organization" className="btn-primary">Muokkaa tapahtumaa</Link>
        <p><br></br></p>
        <Link to="/create" className="btn-primary">Tee uusi tapahtuma: </Link>

        </main>
        </>
    )
}