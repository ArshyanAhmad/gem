import { Link } from "react-router-dom";
import VenmoLogo from "./VenmoLogo";

export default function Header() {
    return <div className="flex w-full p-5 item-center justify-between  bg-gray-200/30  ">
        <div>
            <VenmoLogo />
        </div>

        <div>
            <Link to={"/signin"}>
                <button className="bg-blue-600 rounded-2xl px-4 h-8 text-white cursor-pointer hover:bg-blue-700 ">Logout</button>
            </Link>
        </div>

    </div >;
}
