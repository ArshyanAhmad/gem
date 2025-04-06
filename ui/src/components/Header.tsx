import { useNavigate } from "react-router-dom";
import VenmoLogo from "./VenmoLogo";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function Header() {
    const navigate = useNavigate();

    function logoutHandler() {
        Cookies.remove("authToken");
        Cookies.remove("userData");

        toast.error("User logout successfully!", { id: "logout-warning" });
        navigate("/signin");
    }

    return (
        <div className="flex w-full p-5 item-center justify-between  bg-gray-200/30  ">
            <div>
                <VenmoLogo />
            </div>

            <div>
                <button onClick={logoutHandler} className="bg-blue-600 rounded-4xl px-4 h-9 text-white cursor-pointer hover:bg-blue-700 ">Logout</button>
            </div>
        </div>
    );
}
