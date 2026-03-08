import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../service/api";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const SignIn = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;
    if (!name || !email || !password) {
      toast.error("⚠️ Please fill all the fields!", toastStyle.error);
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/auth/signup`, formData);
      toast.success("✅ Account created successfully!", toastStyle.success);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "🚫 Something went wrong!", toastStyle.error);
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const toastStyle = {
    success: {
      position: "top-center",
      style: {
        background: "#1a1a1a",
        color: "#ffffff",
        border: "1px solid #22c55e",
        borderRadius: "8px",
        padding: "12px 16px",
        fontSize: "14px",
      },
    },
    error: {
      position: "top-center",
      icon: "⚠️",
      style: {
        background: "#1a1a1a",
        color: "#ffffff",
        border: "1px solid #f87171",
        borderRadius: "8px",
        padding: "12px 16px",
        fontSize: "14px",
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] px-4 text-white">
      <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#2a2a2a]">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold">
            <span className="text-white">AI</span><span className="text-blue-500">CodeGen</span> 🤖
          </h1>
          <p className="mt-2 text-xl text-purple-400 font-semibold">Create Your Account</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="flex items-center bg-[#2a2a2a] px-4 py-2 rounded focus-within:ring-2 focus-within:ring-blue-500">
            <FaUser className="text-purple-300 mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="bg-transparent w-full outline-none text-white placeholder-gray-400"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center bg-[#2a2a2a] px-4 py-2 rounded focus-within:ring-2 focus-within:ring-blue-500">
            <FaEnvelope className="text-blue-300 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="bg-transparent w-full outline-none text-white placeholder-gray-400"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center bg-[#2a2a2a] px-4 py-2 rounded focus-within:ring-2 focus-within:ring-blue-500 relative">
            <FaLock className="text-yellow-300 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="bg-transparent w-full outline-none text-white placeholder-gray-400"
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-3 text-xl text-gray-400 hover:text-white cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-2 rounded-md font-semibold text-white transition duration-300 transform hover:scale-105 shadow-md"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <span
            className="text-green-400 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

