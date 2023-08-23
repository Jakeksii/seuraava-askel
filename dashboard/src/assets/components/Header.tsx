import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <div className="bg-secondary-dark p-1">
                <h1 className="text-center pb-0">
                    <Link className="text-white" to="/">Dashboard</Link>
                </h1>
            </div>
        </header>
    )
}