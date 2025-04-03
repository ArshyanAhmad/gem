import InputElement from "../components/InputElement"
import VenmoLogo from "../components/VenmoLogo"
import Button from "../components/Button"
import HeadingText from "../components/HeadingText"
import { Link } from "react-router-dom"

export default function Signin() {
    return (
        <div className="w-screen flex items-center justify-center h-screen">

            <div className=" max-w-93  flex items-center justify-center w-full p-6 py-12 border-gray-300 border rounded-lg shadow-gray-300">

                <div className="flex items-center justify-between flex-col gap-3 w-full ">

                    <VenmoLogo />

                    <HeadingText text="Log in" />

                    <div className="mb-5 w-full">
                        <InputElement type={"text"} placeholder={"Enter email or phone"} />
                    </div>

                    <Button text="Next" bgColor={"bg-blue-700"} textColor="text-white" />

                    <Link to={"/signup"} className="w-full">
                        <Button text="Sign up" bgColor={"bg-blue-0"} textColor="text-blue-700" />
                    </Link>

                </div>
            </div>
        </div>
    )
}
