import InputElement from "../components/InputElement"
import VenmoLogo from "../components/VenmoLogo"
import Button from "../components/Button"
import HeadingText from "../components/HeadingText"
import { Link } from "react-router-dom"

export default function Signup() {
    return (
        <div className="w-screen flex items-center justify-center h-screen">

            <div className=" max-w-100  flex items-center justify-center w-full p-6 py-8 border-gray-300 border rounded-lg shadow-gray-300">

                <div className="flex items-center justify-between flex-col gap-3 w-full ">

                    <VenmoLogo />

                    <HeadingText text="Register" />

                    <InputElement type={"text"} placeholder={"name"} />
                    <InputElement type={"text"} placeholder={"email"} />

                    <div className="flex gap-2 mb-3">
                        <InputElement type={"password"} placeholder={"password"} />
                        <InputElement type={"number"} appearance="appearance-none" placeholder={"phone no"} />
                    </div>

                    <Button text="Sign up" bgColor={"bg-blue-700"} textColor="text-white" />

                    <Link to={"/signin"} className="w-full">
                        <Button text="Log in" bgColor={"bg-blue-0"} textColor="text-blue-700" />
                    </Link>

                </div>
            </div>
        </div>
    )
}
