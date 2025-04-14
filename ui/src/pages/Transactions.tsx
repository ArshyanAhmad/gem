import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { RiExchangeDollarLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { SITE_NAME } from "../config/helper";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"
import axios from "axios";


export default function Transactions() {

    const token = Cookies.get("authToken");
    const [data, setData] = useState([]);
    const [balance, setBalance] = useState("");

    let userId: any;
    interface jwtParam {
        id: string;
    }

    if (token) {
        const decoded = jwtDecode<jwtParam>(token);
        userId = decoded?.id;
    }

    async function getAllTransactions() {
        try {
            const res = await axios.get(`${SITE_NAME}/api/wallet/transactions/${userId}`, {
                headers: {
                    Authorization: token
                }
            })

            const data = res?.data?.transactions;
            setData(data);
            getSenderBalance()

        } catch (error: any) {
            console.error("Error while getting all transaction", error.message);
        }
    }

    async function getSenderBalance() {
        try {
            const res = await axios.get(`${SITE_NAME}/api/wallet/balance/${userId}`, {
                headers: {
                    Authorization: token
                }
            })

            const balance = res?.data?.balance;
            setBalance(balance);

        } catch (error: any) {
            console.error("Error while getting all transaction", error.message);
        }
    }

    useEffect(() => {
        getAllTransactions();
    }, [])


    const formatISOToReadable = (isoString: string): string => {
        const date = new Date(isoString);

        return date.toLocaleString("en-US", {
            month: "short",     // Feb
            day: "2-digit",     // 19
            year: "numeric",    // 2024
            hour: "2-digit",    // 03
            minute: "2-digit",  // 18
            hour12: false       // 24-hour format (set to true if you want AM/PM)
        });
    };

    return (
        <div>
            <Header />
            <main className="grid grid-cols-6">
                <aside>
                    <Sidebar />
                </aside>
                <section className="bg-gray-200/10 p-3 rounded-full  col-span-5">
                    <div>
                        <h4 className="p-3 text-3xl font-bold text-blue-600 ">
                            Transactions
                        </h4>
                    </div>

                    <div className="pl-5 pt-3">
                        <h4 className="text-slate-500 pb-3">Current Balance</h4>
                        <span className="text-2xl font-semibold pl-3">
                            ${" "}
                            {Number(balance).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </span>
                    </div>

                    <div className="mt-5 px-5 pb-12 overflow-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300">

                        {data.map((transaction: any) => {
                            return (
                                <div key={transaction._id} className="mt-3 flex item-center flex-col my-3">

                                    <div className="flex items-center justify-between py-2 px-3  rounded">

                                        <div className="flex items-center gap-4 w-md  " >
                                            <span>
                                                <RiExchangeDollarLine
                                                    size={35}
                                                    style={{
                                                        color: "blue",
                                                        background: "white",
                                                        borderRadius: "100%",
                                                    }}
                                                />
                                            </span>

                                            <div>
                                                <h4 className="text-[17px] font-semibold text-slate-900 flex gap-2">
                                                    {transaction.transactionType === "Send" ? "Transferred" : "Received"}  {" "}
                                                    <span className={`${transaction.transactionType === "Send" ? "text-blue-500" : "text-fuchsia-500"}  text-xs`}> {transaction.transactionType === "Send" ? "Money sent" : "Money received"} </span>
                                                </h4>
                                                <p className="text-slate-600 text-sm ">
                                                    {formatISOToReadable(transaction.createdAt)}
                                                </p>
                                            </div>

                                        </div>

                                        <div className={`font-semibold ${transaction.status === "Success" ? "text-green-500" : "text-red-500"} flex items-center justify-center gap-2 w-md `}>
                                            <h4>{transaction.status}</h4>
                                            <span className="pt-1">
                                                {transaction.status === "Success" ? <HiCheckCircle size={20} /> : <HiXCircle size={20} />}
                                            </span>
                                        </div>

                                        <div className="pr-5 text-right w-md" >
                                            <h4 className="text-slate-800 font-semibold">
                                                {transaction.transactionType === "Send" ? "-" : "+"} {transaction.status === "Success" ? Number(transaction.amount).toLocaleString("en-US", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                }) : "0.00"}{" "}
                                                <span className="text-slate-700 font-normal">
                                                    USDC
                                                </span>
                                            </h4>
                                            <span className="text-slate-700 text-[13px] ">
                                                {transaction.transactionType === "Send" ? "To" : "From"} +91  {transaction.transactionType === "Send" ? transaction.receiverPhone : transaction.senderPhone}
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            )
                        })}

                    </div>

                </section>
            </main>
        </div>
    );
}

