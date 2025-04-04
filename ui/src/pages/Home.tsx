import { Link } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";

export default function Home() {
    return (
        <div>
            <Header />
            <main className="grid grid-cols-6">
                <aside>
                    <Sidebar />
                </aside>
                <section className="bg-gray-200/30 col-span-5 p-10 ">
                    <div>
                        <h4 className="p-3 text-3xl font-bold text-blue-600 ">Good Morning, King</h4>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-2xs h-96 flex flex-col justify-between">
                        <div>
                            <span className="text-md decoration-dashed underline-offset-4 underline font-semibold text-gray-400  ">Portfolio Value</span>
                            <h4 className="text-5xl text-neutral-600 py-4 pl-2 font-bold">
                                <span className="text-slate-400 pr-1">$</span>
                                0.00
                            </h4>

                        </div>

                        <div className="items-center justify-center  flex gap-5">

                            <div>
                                <Link to={"/deposit"}>
                                    <div className="cursor-pointer hover:bg-blue-600  text-3xl text-white w-13 h-13 flex items-center justify-center rounded-full bg-blue-500">
                                        <HiArrowSmDown />
                                    </div>
                                </Link>
                                <span className="text-slate-600 font-semibold">Deposit</span>
                            </div>

                            <div>
                                <Link to={"/transfer-money"}>
                                    <div className="cursor-pointer hover:bg-blue-600 text-3xl text-white w-13 h-13 flex items-center justify-center rounded-full bg-blue-500">
                                        <HiArrowSmUp />
                                    </div>
                                </Link>
                                <span className=" text-slate-600 font-semibold">Transfer</span>
                            </div>

                        </div>


                    </div>
                </section>
            </main>
        </div>
    );
}
