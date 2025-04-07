import InputElement from "../components/InputElement"
import HeadingText from "../components/HeadingText"
import VenmoLogo from "../components/VenmoLogo"
import Button from "../components/Button"
import { Link, useLocation } from "react-router-dom"

import { useNavigate } from "react-router-dom"
import { SITE_NAME } from "../config/helper"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import toast from "react-hot-toast"

export default function Signup() {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        Cookies.remove("authToken");
        navigate("/signup")
    }, [location.pathname]);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");

    const signUpHandler = async () => {
        if (
            [name, email, password, number].some(field => field.trim() === "")
        ) {
            toast.error("Fill up all inputs form");
            return;
        }

        try {
            const res = await axios.post(`${SITE_NAME}/api/user/signup`, {
                name,
                email,
                password,
                phone: number
            })

            const token = res.data?.token;
            const userData = res.data?.userData;

            Cookies.set("authToken", `Bearer ${token}`, { expires: 1, secure: true, sameSite: "Strict" })
            Cookies.set("userData", JSON.stringify(userData), { expires: 1, secure: true, sameSite: "Strict" });

            toast.success("Sign up successfully!");

            navigate("/");
        } catch (error) {
            console.error("Error while signup: ", error);
            toast.error("Sign up failed. Please try again.");
        }
    }

    return (
        <div className="w-screen flex items-center justify-center h-screen">

            <div className=" max-w-100  flex items-center justify-center w-full p-6 py-8 border-gray-300 border rounded-lg shadow-gray-300">

                <div className="flex items-center justify-between flex-col gap-3 w-full ">

                    <VenmoLogo />

                    <HeadingText text="Register" />

                    <InputElement value={name} setter={setName} type={"text"} placeholder={"name"} />
                    <InputElement value={email} setter={setEmail} type={"text"} placeholder={"email"} />

                    <div className="flex gap-2 mb-3">
                        <InputElement value={password} setter={setPassword} type={"password"} placeholder={"password"} />
                        <InputElement value={number} setter={setNumber} type={"number"} appearance="appearance-none" placeholder={"phone no"} />
                    </div>

                    <Button text="Sign up" onClick={signUpHandler} bgColor={"bg-blue-700"} textColor="text-white" />

                    <Link to={"/signin"} className="w-full">
                        <Button text="Log in" bgColor={"bg-blue-0"} textColor="text-blue-700" />
                    </Link>

                </div>
            </div>
        </div>
    )
}
