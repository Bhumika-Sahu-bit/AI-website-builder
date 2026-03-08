import { useState } from "react";
import PromptInput from "../components/PromptInput";
import RecentProjects from "../components/RecentProjects";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LandingPage = () => {
  const [showProjects, setShowProjects] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleProjects = () => setShowProjects(prev => !prev);
  const handleAuthClick = () => user ? logout() : navigate("/signup");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white flex flex-col justify-between">
      {/* Navbar */}
      <nav className="w-full p-5 fixed top-0 bg-gray-950 z-20 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="text-3xl font-bold text-blue-500 tracking-wide flex items-center space-x-2">
            <span>🤖</span>
            <span className="text-white">AI</span>
            <span className="text-blue-500">CodeGen</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={toggleProjects}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-sm sm:text-base 
                         hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              📁 <span>Recent Projects</span>
            </button>
            <button
              onClick={handleAuthClick}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-sm sm:text-base
                         hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              {user ? "🚪 Logout" : "🔐 Login"}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <main className="flex-grow flex items-center justify-center px-4 pt-32 pb-20">
        <PromptInput />
      </main>

      {/* Recent Projects Modal */}
      {showProjects && <RecentProjects onClose={toggleProjects} />}

      {/* Footer */}
      <footer className="w-full border-t border-white/10 bg-gray-950 py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400 gap-2">
          <p>
            © 2025 AICodeGen. Your AI-powered web assistant for rapid website creation.
          </p>
          <button
  onClick={() => {
    toast.success("AICodeGen helps you generate beautiful websites using AI in seconds.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: "#333",
        color: "#fff",
      },
    });
  }}
  className="text-gray-300 hover:text-white transition duration-300"
>
  Made with Bhumi 💙
</button>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
