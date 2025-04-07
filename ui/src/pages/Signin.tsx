import InputElement from "../components/InputElement"
import HeadingText from "../components/HeadingText"
import VenmoLogo from "../components/VenmoLogo"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Button from "../components/Button"

import toast from "react-hot-toast"

import { SITE_NAME } from "../config/helper"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import axios from "axios"
import { useLocation } from "react-router-dom"


export default function Signin() {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        Cookies.remove("authToken");
        Cookies.remove("userData");
        navigate("/signin")
    }, [location.pathname]);


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signInHandler = async () => {
        if (email === "" || password === "") {
            toast.error("Fill up all inputs form");
            return;
        }

        try {
            const res = await axios.post(`${SITE_NAME}/api/user/signin`, {
                email,
                password,
            });

            const token = res.data?.token;
            const userData = res.data?.userData;

            Cookies.set("authToken", `Bearer ${token}`, { expires: 1, secure: true, sameSite: "Strict" });
            Cookies.set("userData", JSON.stringify(userData), { expires: 1, secure: true, sameSite: "Strict" });

            toast.success("Login successfully!");
            navigate("/");

        } catch (error) {
            console.error("Error signing in:", error);
            toast.error("Sign in failed. Please try again.");
        }
    };


    return (
        <div className="w-screen flex items-center justify-center h-screen">

            <div className=" max-w-93  flex items-center justify-center w-full p-6 py-12 border-gray-300 border rounded-lg shadow-gray-300">

                <div className="flex items-center justify-between flex-col gap-3 w-full ">

                    <VenmoLogo />

                    <HeadingText text="Log in" />

                    <div className="mb-5 flex flex-col gap-3 w-full">
                        <InputElement setter={setEmail} value={email} type={"text"} placeholder={"Enter email or phone"} />
                        <InputElement value={password} setter={setPassword} type={"password"} placeholder={"password"} />
                    </div>

                    <Button onClick={signInHandler} text="Log in" bgColor={"bg-blue-700"} textColor="text-white" />

                    <Link to={"/signup"} className="w-full">
                        <Button text="Sign up" bgColor={"bg-blue-0"} textColor="text-blue-700" />
                    </Link>

                </div>
            </div>

        </div>
    )
}
