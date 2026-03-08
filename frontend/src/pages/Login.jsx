import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaEnvelope, FaLock } from "react-icons/fa";
import BASE_URL from "../service/api.js";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("⚠️ Please fill all fields!", toastStyle.error);
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, formData);
      const { token, user } = res.data;

      localStorage.setItem("user", JSON.stringify(user));
      login(user, token);

      toast.success("✅ Login successful!", toastStyle.success);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "🚫 Invalid credentials!", toastStyle.error);
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const toastStyle = {
    success: {
      position: "top-center",
      icon: "✅",
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
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] text-white px-4">
      <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#2a2a2a]">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold">
            <span className="text-white">AI</span><span className="text-blue-500">CodeGen</span> 🤖
          </h2>
          <p className="mt-2 text-xl text-purple-400 font-semibold">Login to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
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
              onClick={togglePassword}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-2 rounded-md font-semibold text-white transition duration-300 transform hover:scale-105 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <span
            className="text-green-400 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
