import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate()
    return (
        <header>
            <div className="flex justify-between items-center w-full bg-blue-600 border-b-slate-700 border-b-2 p-2 text-white">
                <div className="pl-4">
                    <IconButton color="inherit" onClick={() => navigate(-1)}>
                        <ArrowBackIcon fontSize="medium" />
                    </IconButton>
                </div>
                <h1 className="text-center self-center pb-1">
                    <Link className="text-white" to="/">Seuraava Askel</Link>
                </h1>
                <div className="w-[67px]" />
            </div>



        </header>
    )
}