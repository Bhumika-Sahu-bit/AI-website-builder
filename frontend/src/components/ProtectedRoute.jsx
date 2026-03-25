/* eslint-disable react/prop-types */
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useEffect , useRef } from "react"

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;

    const toastShown = useRef(false);

    useEffect(() => {
     if(!token && !toastShown.current) {
        toast.error("🚫 Please login to continue!", {
            position: "top-center",
            style:{
                backgroundColor: "#fff",
                color: "#000",
                fontWeight: "bold",
            },
            icon: "🔒"
        });

        toastShown.current = true
     }
    }, [token])

    if(!user?.token) {
        return <Navigate to="/login" replace />
    }
    
  return children;
}

export default ProtectedRoute