import { Link } from "react-router-dom";

type Props = {
    text?: string
}

export default function Header({ text }: Props) {
    return (
        <header className="bg-secondary-dark p-2">
            <h1 className="text-center pb-0">
                <Link className="text-white" to="/">{text}</Link>
            </h1>
        </header>
    )
}