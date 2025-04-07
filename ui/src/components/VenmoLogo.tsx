import venmoLogo from "../assets/logo.svg"
import { useNavigate } from "react-router-dom";

export default function VenmoLogo() {

    const navigate = useNavigate()

    return (
        <div className="w-28 h-full">
            <img onClick={() => {
                navigate("/")
            }} className="w-fit h-full cursor-pointer" src={venmoLogo} alt="Venmo Logo" />
        </div>
    );
}
