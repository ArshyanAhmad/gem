import InputElement from "../components/InputElement";
import { useLocation, useNavigate } from "react-router-dom";
import { HiBadgeCheck } from "react-icons/hi";
import { SITE_NAME } from "../config/helper";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import { CiUser } from "react-icons/ci";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function TransferMoney() {
    const navigate = useNavigate();

    const token = Cookies.get("authToken");
    const [balance, setBalance] = useState(Number);
    const [amount, setAmount] = useState<Number | String>("");
    const [receiverPhone, setReceiverPhone] = useState(Number);
    const [receiverName, setReceiverName] = useState(String);

    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);

    const receiverId = queryParam.get("userId");

    useEffect(() => {
        if (!receiverId) {
            navigate("/transfer");
        }
        return;
    }, [receiverId, navigate]);

    let senderId: string;

    interface jwtParam {
        id: string;
    }

    if (token) {
        const decoded = jwtDecode<jwtParam>(token);
        senderId = decoded?.id;
    }

    async function getReceiverData() {
        try {
            const res = await axios.get(
                `${SITE_NAME}/api/wallet/balance/${receiverId}`,
                {
                    headers: {
                        Authorization: Cookies.get("authToken"),
                    },
                }
            );

            const data = res.data;

            setReceiverName(data?.name);
            setReceiverPhone(data?.phone);
        } catch (error: any) {
            console.error("Error while fetching receiver data", error.message);
            toast.error("Internal server error or Invalid Id");
            navigate("/transfer");
        }
    }

    async function getSenderData() {
        try {
            const res = await axios.get(
                `${SITE_NAME}/api/wallet/balance/${senderId}`,
                {
                    headers: {
                        Authorization: Cookies.get("authToken"),
                    },
                }
            );

            const blnc = res.data?.balance;
            setBalance(blnc);
        } catch (error: any) {
            console.error("Error while fetching balance", error.message);
            toast.error("Internal server error");
        }
    }

    useEffect(() => {
        getSenderData();
        getReceiverData();
    }, [receiverId]);

    async function sendMoney() {
        if (!Number(amount) || Number(amount) <= 0) {
            toast.error("Amount must be provided");
            return;
        }

        try {
            await axios.post(
                `${SITE_NAME}/api/wallet/transfer`,
                {
                    phone: receiverPhone,
                    amount: amount,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            getSenderData();

            toast.success("Money transfer successfully");
            setAmount("");
        } catch (error: any) {
            const errorMessage = error.response.data?.message;
            console.error("Error while transfer the money", errorMessage);
            toast.error(`Money transfer failed`);
        }
    }

    return (
        <div>
            <Header />
            <main className="grid grid-cols-6">
                <aside>
                    <Sidebar />
                </aside>
                <div className="col-span-5 p-9 h-66 gap-5 flex flex-col justify-between">
                    <div className="flex justify-between">
                        <div>
                            <h4 className="text-slate-500 pb-3">Current Balance</h4>
                            <span className="text-3xl font-semibold pl-3">
                                ${" "}
                                {Number(balance).toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                        </div>

                        <div className="flex gap-3">
                            <h4 className="text-slate-600 text-lg  font-semibold">
                                Send Money to
                            </h4>
                            <span className="text-3xl font-semibold text-slate-800">
                                {" "}
                                {receiverName.slice(0, 1).toUpperCase() +
                                    receiverName.slice(1)}
                            </span>
                        </div>
                    </div>

                    <div>
                        <div className="gap-7  w-full flex flex-col">
                            <div className="w-18 h-18 text-white rounded-full flex items-center justify-center text-4xl  m-auto bg-blue-500/80">
                                {receiverName ? (
                                    receiverName.slice(0, 1).toUpperCase()
                                ) : (
                                    <CiUser />
                                )}
                            </div>

                            <div className="flex item-center justify-center gap-2">
                                <span className="text-sm text-slate-600">
                                    Receiver's No
                                </span>

                                <h2 className=" flex gap-2 text-xl font-semibold ">
                                    +91 {receiverPhone}{" "}
                                    <HiBadgeCheck
                                        style={{
                                            backgroundColor: "#D1FAE5",
                                            color: "#047857",
                                            padding: "2px",
                                            borderRadius: "9999px",
                                        }}
                                    />
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-baseline items-center gap-4">
                        <InputElement
                            value={String(amount)}
                            setter={setAmount}
                            type="number"
                            placeholder="Amount"
                        />

                        <Button
                            onClick={sendMoney}
                            bgColor="bg-blue-500"
                            textColor="text-white"
                            text="Send"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
