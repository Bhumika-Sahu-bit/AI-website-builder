import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BASE_URL from '../service/api';
import { IoClose } from 'react-icons/io5';

const RecentProjects = ({ onClose }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.token || !user.id) return;

    const fetchRecentProjects = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/recent/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch recent projects');

        const data = await response.json();
        const sorted = Array.isArray(data)
          ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6)
          : [];
        setProjects(sorted);
      } catch (err) {
              // setError(err.message);
        console.error('Error fetching recent projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentProjects();
  }, [user]);

  const handleProjectClick = (projectId, folderId) => {
    navigate(`/edit/${projectId}/folder/${folderId}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-opacity-50">
      <div className="w-[400px] max-w-full h-full bg-[#111827] p-6 shadow-2xl rounded-l-2xl flex flex-col animate-slide-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white text-2xl"
        >
          <IoClose />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-green-400 mb-4 text-center tracking-wide">
          Your Recent Projects
        </h2>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-1">
          {loading ? (
            <p className="text-white text-center">⏳ Loading...</p>
          )  : projects.length === 0 ? (
            <p className="text-gray-400 text-center">📭 No recent projects found!</p>
          ) : (
            projects.map((project) => {
              const projectId = project?.projectId?._id;
              const folderId = project?.folderId?._id || 'root';
              if (!projectId) return null;

              return (
                <div
                  key={project._id}
                  onClick={() => handleProjectClick(projectId, folderId)}
                  className="cursor-pointer bg-[#1f2937] hover:bg-[#374151] p-4 rounded-xl transition duration-300 border border-gray-700"
                >
                  <p className="text-lg font-medium text-white truncate">
                    {project?.projectId?.prompt || 'Untitled Project'}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentProjects;
