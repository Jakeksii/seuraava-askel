import { useContext, useEffect } from "react";
import Header from "../assets/components/Header";
import { Link } from "react-router-dom";
import { useAppContext } from "../assets/context/appContext";



export default function Events() {


    const {organization} = useAppContext()

    const data = organization?._id;
    // this gives undefined^
    const linkstr = data
    

    useEffect(() => {
        console.log(data)
        console.log(linkstr)
    }, [])

    return (
        <>
        <Header />
        <main>
        <h2 className="text-center p-2">Tapahtuma listaus sivu</h2>
        <Link to={`/${data}/events/CreateEvent`} className="btn-primary"> Tee tapahtuma </Link>
        </main>
        </>
    )
}