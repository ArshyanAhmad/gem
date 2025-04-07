import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function IconComponent() {
    return <div className="items-center justify-center  flex gap-5">
        <div className="p-2 flex items-center justify-center flex-col gap-2 ">
            <Link to={"/deposit"}>
                <div className="cursor-pointer hover:bg-blue-600  text-3xl text-white w-14 h-14 flex items-center justify-center rounded-full bg-blue-500">
                    <HiArrowSmDown className="text-4xl" />
                </div>
            </Link>
            <span className="text-slate-600 font-semibold">
                Deposit
            </span>
        </div>

        <div className="p-2 flex items-center justify-center flex-col gap-2 ">
            <Link to={"/transfer-money"}>
                <div className="cursor-pointer hover:bg-blue-600 text-3xl text-white w-14 h-14 flex items-center justify-center rounded-full bg-blue-500">
                    <HiArrowSmUp className="text-4xl" />
                </div>
            </Link>
            <span className=" text-slate-600 font-semibold">
                Transfer
            </span>
        </div>
    </div>
        ;
}
