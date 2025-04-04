import { BiHome, BiWallet, BiTransfer, BiTimeFive } from "react-icons/bi";
import { HiDownload } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="h-screen flex  bg-gray-200/30 justify-center py-8  ">
            <div className="flex flex-col gap-6">
                <ul>
                    <Link
                        className="flex items-center gap-2 text-slate-600 hover:text-violet-950/90 ease-in-out"
                        to={"/"}
                    >
                        <BiHome className="text-3xl" />
                        <span className="text-xl font-semibold">Home</span>
                    </Link>
                </ul>
                <ul>
                    <Link
                        className="flex items-center gap-2 text-slate-600 hover:text-violet-950/90 ease-in-out"
                        to={"/portfolio"}
                    >
                        <BiWallet className="text-3xl" />
                        <span className="text-xl font-semibold">Portfolio</span>
                    </Link>
                </ul>
                <ul>
                    <Link
                        className="flex items-center gap-2 text-slate-600 hover:text-violet-950/90 ease-in-out"
                        to={"/portfolio"}
                    >
                        <HiDownload className="text-3xl" />
                        <span className="text-xl font-semibold">Deposit</span>
                    </Link>
                </ul>
                <ul>
                    <Link
                        className="flex items-center gap-2 text-slate-600 hover:text-violet-950/90 ease-in-out"
                        to={"/transfer-money"}
                    >
                        <BiTransfer className="text-3xl" />
                        <span className="text-xl font-semibold">Transfer</span>
                    </Link>
                </ul>
                <ul>
                    <Link
                        className="flex items-center gap-2 text-slate-600 hover:text-violet-950/90 ease-in-out"
                        to={"/all-transactions"}
                    >
                        <BiTimeFive className="text-3xl" />
                        <span className="text-xl font-semibold">Transactions</span>
                    </Link>
                </ul>
            </div>
        </div>
    );
}
