import Header from "../assets/components/Header";


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
        <h2> Kyseisen organisaation tapahtumat</h2>
        <h2> Luo uusi organisaatio </h2>
        <h2> Muokkaa organisaatiota</h2>
        </main>
        </>
    )
}