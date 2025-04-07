import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";
import { SITE_NAME } from "../config/helper";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import IconComponent from "../components/IconComponent";

export default function Portfolio() {
    const [userBalance, setUserBalance] = useState<number>(0);

    const fetchWalletData = async () => {
        const userData = Cookies.get("userData");

        const user = JSON.parse(userData!);
        const userId = user?.userId;

        try {
            const res = await axios.get(
                `${SITE_NAME}/api/wallet/balance/${userId}`,
                {
                    headers: {
                        authorization: Cookies.get("authToken"),
                    },
                }
            );

            const userBalance = res.data?.balance;
            setUserBalance(userBalance);
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.error || "Unexpected error occurred";

            toast.error(errorMessage, { id: "balance-error" });
            console.error("Error while fetching balance of user");
        }
    };

    useEffect(() => {
        fetchWalletData();
    }, []);

    return (
        <div>
            <Header />
            <main className="grid grid-cols-6">
                <aside>
                    <Sidebar />
                </aside>

                <section className="bg-gray-200/30 col-span-5 p-10 ">
                    <div className="bg-white p-6 rounded-xl shadow-2xs h-96 flex flex-col justify-between">
                        <div>
                            <span className="text-md decoration-dashed underline-offset-4 underline font-semibold text-gray-400  ">
                                Portfolio Value
                            </span>
                            <h4 className="text-5xl text-neutral-600 py-4 pl-2 font-bold">
                                <span className="text-slate-400 pr-1">$</span>
                                {userBalance ? userBalance : "0.00"}
                            </h4>
                        </div>

                        <IconComponent />
                    </div>
                </section>
            </main>
        </div>
    );
}
