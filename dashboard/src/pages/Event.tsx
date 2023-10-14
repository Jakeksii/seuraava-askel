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
        <h2> Muokkaa organisaatiota</h2>
        <Link to="/:organization_id/organization" className="btn-primary">Tästä</Link>
        <h2> Tee uusi organisaatio: </h2>
        <Link to="/create" className="btn-primary">Tästä</Link>

        </main>
        </>
    )
}