/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../service/api.js";

const UpdatePrompt = ({ prompt, setPrompt, projectId }) => {
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch the prompt when the component loads
  useEffect(() => {

    const fetchPrompt = async () => {
      
      if (!projectId) {
        console.error("❌ Error fetching project prompt: Project ID is required");
        return;
    }
      try {
        console.log("📌 Fetching prompt for projectId:", projectId);
        const response = await axios.get(`${BASE_URL}/api/ai/${projectId}`);

        console.log("API Response:", response.data); // Debugging  
        if (response.status === 200) {
          setPrompt(response.data.prompt);
          console.log("✅ Prompt fetched:", response.data.prompt);
        } else {
          console.warn("⚠️ No prompt found in API response:", response.data);
        }
      } catch (error) {
        console.error("❌ Error fetching project prompt:", error.response?.data?.message || error.message);
      }
    };

    if (projectId) {
      fetchPrompt();
    }
  }, [projectId]);

  // 🔹 Handle prompt update request
  const handleUpdatePrompt = async () => {
    if (!prompt.trim()) {
      alert("⚠️ Prompt cannot be empty!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/ai/update/${projectId}`, { prompt });

      if (response.status === 200) {
        
        alert("🎉 Project updated successfully!")
          setPrompt(response.data.updatedPrompt || prompt);
        }
    } catch (error) {
      console.error("❌ Error updating prompt:", error.response?.data?.message || error.message);
      alert("❌ Error updating project.");
    }

    setLoading(false);
  };

  return (
    <div className=" p-4 rounded-lg shadow-md">
      <textarea
        className="w-full h-24 p-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-blue-500"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Update your prompt..."
      />

      <button
        onClick={handleUpdatePrompt}
        disabled={loading}
        className={`mt-2 px-4 py-2 rounded-lg text-white font-semibold ${
          loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Updating..." : "Update Project"}
      </button>
    </div>
  );
};

export default UpdatePrompt;
