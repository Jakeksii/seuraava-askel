import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav/Nav";
const EmblaCarousel = lazy(() => import("./EmblaCarousel"));

type Props = {
    home?: boolean
}

export default function Header(props: Props) {
    if (props.home) return (
        <header>
            <Suspense fallback={<div className="h-[420px]" />}>
                <EmblaCarousel />
            </Suspense>
            <Nav />
        </header>
    )

    return (
        <header>
            <div className="bg-primary-light p-2 m-[6px] rounded-md shadow-md">
                <h1 className="text-center pb-0 ">
                    <Link className="text-white drop-shadow-md" to="/">SEURAAVA ASKEL</Link>
                </h1>
            </div>
        </header>
    )
}