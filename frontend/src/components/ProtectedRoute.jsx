/* eslint-disable react/prop-types */
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useEffect } from "react"

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    const token = localStorage.getItem("token");

    useEffect(() => {
     if(!user) {
        toast.error("🚫 Please login to continue!", {
            position: "top-center",
            style:{
                backgroundColor: "#fff",
                color: "#000",
                fontWeight: "bold",
            },
            icon: "🔒"
        });
     }
    }, [user])

    if(!token) {
        return <Navigate to="/" replace={true} />
    }
    
  return children;
}

export default ProtectedRoute