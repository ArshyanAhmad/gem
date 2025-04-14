import { useEffect, useState } from "react";
import { SITE_NAME } from "../config/helper";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import Header from "../components/Header";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Transfer() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [data, setData] = useState([]);

    async function handleSearch() {
        try {
            const res = await axios.post(
                `${SITE_NAME}/api/user/search`,
                { name: name },
                {
                    headers: {
                        Authorization: Cookies.get("authToken"),
                    },
                }
            );

            const data = res?.data;

            if (data.length === 0) {
                toast.error("User not found with this name", {
                    id: "user-not-found",
                });
            }

            setData(data);
        } catch (error: any) {
            console.error("Error while fetching users: ", error.message);
            toast.error("Internal server error");
        }
    }

    useEffect(() => {
        handleSearch();
    }, [name]);

    return (
        <div>
            <Header />
            <main className="grid grid-cols-6">
                <aside>
                    <Sidebar />
                </aside>
                <section className="bg-gray-200/10  col-span-5 p-6 px-10">
                    <div>
                        <input
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            className="rounded-full border border-slate-300 pl-7 text-lg w-full text-gray-500  outline-0  h-13"
                            placeholder="Name"
                            type="text"
                        />
                    </div>

                    <div className="bg-purple-100/20 pt-4 mt-10 overflow-auto max-h-[70vh] ">
                        {data.map((user: any, index) => {
                            return (
                                <div
                                    key={index}
                                    className=" flex item-center flex-col my-3 "
                                >
                                    <div className="flex items-center justify-between py-2 px-3 rounded">
                                        <div className="flex items-center gap-5">
                                            <span className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
                                                {user?.name.slice(0, 1)}
                                            </span>
                                            <h4 className="text-slate-700 font-semibold capitalize text-[16px]">{user?.name}</h4>
                                        </div>
                                        <div className="w-25 h-10">
                                            <Button
                                                onClick={() => {
                                                    navigate(
                                                        `/transfer-money?userId=${user._id}`
                                                    );
                                                }}
                                                text="Send"
                                                bgColor="bg-blue-500"
                                                textColor="text-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>
        </div>
    );
}
