import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const token = Cookies.get("authToken");

    if (!token) {
        toast.error("User not authorized", { id: "not-authorized" });
        return <Navigate to="/signin" />;
    }

    return <>{children}</>
}