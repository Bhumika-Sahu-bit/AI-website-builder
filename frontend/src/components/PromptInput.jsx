import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BASE_URL from "../service/api";
import {toast} from "react-toastify";

const PromptInput = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGenerateCode = async () => {
    if (!user) {
      toast.error("You have to login first 🔐");
      return;
    }

    if (!prompt.trim()) {
      toast.error("Please enter a prompt.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/ai/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, userId: user.id }),
      });

      if (!res.ok) throw new Error("Generation failed");

      const data = await res.json();
      setLoading(false);

      if (data?.files?.length > 0) {
        navigate(`/edit/${data.projectId}/folder/${data.folderId || "root"}`, {
          state: { prompt },
        });
      } else {
        // alert("No files returned. Try refining your prompt.");
        toast.error("No code generated. Try a different prompt.");
      }
    } catch (err) {
      console.error("Error generating code:", err);
      toast.error("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 sm:p-10 w-full max-w-2xl text-white shadow-xl border border-white/10">
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2">
        🧠 Build Your Website with AI
      </h2>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows="5"
        className="w-full p-4 bg-black/30 text-white placeholder-gray-400 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        placeholder="Describe the project or feature you want to build..."
      />

      <p className="mt-2 text-sm text-gray-400">
        ⚡ Example: Create a personal portfolio site with about, skills, and contact sections
      </p>

      {loading && (
        <p className="text-center text-cyan-400 mt-4 animate-pulse">
          🚀 Generating your website...
        </p>
      )}

      <button
        onClick={handleGenerateCode}
        disabled={loading || !prompt.trim()}
        className={`mt-6 w-full py-3 text-white font-semibold rounded-lg 
        bg-gradient-to-r from-blue-600 to-purple-600 
        hover:from-blue-500 hover:to-purple-500 
        transition-transform duration-300 transform hover:scale-105 
        ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? "Generating..." : "⚡ Generate Code"}
      </button>
    </div>
    
  );
};

export default PromptInput;
