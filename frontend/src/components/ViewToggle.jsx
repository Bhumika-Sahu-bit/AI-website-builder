/* eslint-disable react/prop-types */
const ViewToggle = ({ activeTab , setActiveTab }) => {
    return (
      <div className="flex justify-center space-x-4 bg-gray-800 p-2 rounded mb-2">
        <button
          className={`px-4 py-1 rounded ${
            activeTab === "code" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("code")}
        >
          Code
        </button>
        <button
          className={`px-4 py-1 rounded ${
            activeTab === "preview" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </button>
      </div>
    );
  };
  
  export default ViewToggle;
  