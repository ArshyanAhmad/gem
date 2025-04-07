import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { CiUser } from "react-icons/ci";
import Button from "../components/Button";

export default function Transfer() {
    return (
        <div>
            <Header />
            <main className="grid grid-cols-6">
                <aside>
                    <Sidebar />
                </aside>
                <section className="bg-gray-200/30  col-span-5 p-6 px-10">

                    <div>
                        <input className="rounded-full border border-slate-300 pl-7 text-lg w-full text-gray-500  outline-0  h-13" placeholder="Name" />
                    </div>

                    <div className="pt-20 flex item-center flex-col gap-4">

                        <div className="flex items-center justify-between py-2 px-3 bg-slate-100 rounded">
                            <div className="flex items-center gap-5">
                                <span className="">
                                    <CiUser className="text-2xl" />
                                </span>
                                <h4>Username</h4>
                            </div>
                            <div className="w-25 h-10">
                                <Button text="Send" bgColor="bg-blue-500" textColor="text-white" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-2 px-3 bg-slate-100 rounded">
                            <div className="flex items-center gap-5">
                                <span className="">
                                    <CiUser className="text-2xl" />
                                </span>
                                <h4>Username</h4>
                            </div>
                            <div className="w-25 h-10">
                                <Button text="Send" bgColor="bg-blue-500" textColor="text-white" />
                            </div>
                        </div>

                    </div>

                </section>
            </main>
        </div>
    );
}
