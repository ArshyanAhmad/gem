import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { CiUser } from "react-icons/ci";
import InputElement from "../components/InputElement";
import Button from "../components/Button";
import Cookies from "js-cookie";
import axios from "axios";
import { SITE_NAME } from "../config/helper";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Deposit() {
    const [amount, setAmount] = useState("");
    const userData = Cookies.get("userData");

    let username;
    if (userData) {
        const user = JSON.parse(userData);
        username = user?.username;
    }

    async function addMoneyToUserWallet() {
        try {
            await axios.post(
                `${SITE_NAME}/api/wallet/add`,
                { amount: Number(amount) },
                {
                    headers: {
                        authorization: Cookies.get("authToken"),
                    },
                }
            );

            toast.success("Money deposit successfully!", { id: "deposit-money" });
            setAmount("");
        } catch (error) {
            toast.error("Error while deposit the money");
            console.error(error);
        }
    }

    return (
        <div>
            <Header />
            <main className="grid grid-cols-6">
                <aside>
                    <Sidebar />
                </aside>
                <div className="col-span-5 h-5/6 items-center flex justify-center w-md mx-auto mt-7  ">
                    <div className="gap-10 bg-slate-300/10 w-full p-6 flex flex-col">
                        <h2 className="text-3xl font-semibold text-center">
                            Deposit Money
                        </h2>

                        <div className="w-18 h-18 text-white rounded-full flex items-center justify-center text-4xl  m-auto bg-blue-500/80">
                            {username ? username.slice(0, 1).toUpperCase() : <CiUser />}
                        </div>

                        <div className="flex flex-col gap-5">
                            <InputElement
                                value={amount}
                                setter={setAmount}
                                placeholder="Add Money"
                                type="number"
                            />
                            <Button
                                onClick={addMoneyToUserWallet}
                                text="Add"
                                textColor="text-white"
                                bgColor="bg-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
