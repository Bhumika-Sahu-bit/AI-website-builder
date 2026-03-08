/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import BASE_URL from "../service/api";

const TopBar = ({ projectId }) => {
  const navigate = useNavigate();

  const handleDownload = async (projectId) => {
    window.open(`${BASE_URL}/api/projects/${projectId}/download`);
  };

  return (
    <div className="flex justify-center items-center gap-2 bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 px-6 py-3 border-b border-gray-800 h-16 shadow-sm">
      {/* Go Back Button */}
      <button
        onClick={() => navigate("/")}
        className="text-white px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition duration-200"
      >
        ⬅ Go Back
      </button>

      {/* Action Buttons */}
      <div className="space-x-3">
        <button
          onClick={() => handleDownload(projectId)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition duration-200"
        >
          📂 Download Project
        </button>

        
      </div>
    </div>
  );
};

export default TopBar;
