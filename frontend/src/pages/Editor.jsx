/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FileExplorer from "../components/FileExplorer";
import CodeEditor from "../components/CodeEditor";
import LivePreview from "../components/LivePreview";
import UpdatePrompt from "../components/UpdatePrompt";
import TopBar from "../components/TopBar";
import ViewToggle from "../components/ViewToggle";
import axios from "axios";
import BASE_URL from "../service/api";

const Editor = () => {
    const { projectId, folderId } = useParams();
    const [prompt, setPrompt] = useState("Your initial prompt...");
    const [files, setFiles] = useState([]);
    const [activeFile, setActiveFile] = useState(null);
    const [activeTab, setActiveTab] = useState("code");
    // const [projectType, setProjectType] = useState(""); // Store project type (HTML, React, Backend)

    // Fetch project files
    const fetchProjectFiles = async () => {
        if (!projectId || !folderId) return;

        try {
            const response = await axios.get(`${BASE_URL}/api/files/${projectId}/folder/${folderId}`);

            if (response.data.length > 0) {
                setFiles(response.data);
                fetchFileContent(response.data[0].name);
            } else {
                setFiles([]);
            }

            
        } catch (error) {
            console.error("Error fetching file content:", error.message);
        }
    };

    // Fetch specific file content
    const fetchFileContent = async (filename) => {
        if (!filename) return;

        try {
            const encodedFilename = encodeURIComponent(filename);
            const response = await axios.get(`${BASE_URL}/api/files/${projectId}/folder/${folderId}/${encodedFilename}`);

            const fileData = response.data;
            if (typeof fileData.content !== "string") {
                fileData.content = JSON.stringify(fileData.content, null, 2);
            }
            setActiveFile({ name: filename, content: fileData.content });
        } catch (error) {
            console.error("Error fetching file content:", error.message);
        }
    };

    // Handle file content updates
    const handleFileChange = (fileName, newContent) => {
        setFiles((prevFiles) =>
            prevFiles.map((file) =>
                file.name === fileName ? { ...file, content: newContent } : file
            )
        );
    };

    useEffect(() => {
        if (projectId && folderId) {
            fetchProjectFiles();
        }
    }, [projectId, folderId]);

    return (
        <div className="flex flex-col h-screen bg-gray-950 text-white">
            <TopBar projectId={projectId} />

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar (File Explorer + Update Prompt) */}
                <div className="w-1/5 min-w-[250px] border-r border-gray-900 flex flex-col">
                    <div className="flex-1">
                        <FileExplorer 
                            onFileSelect={fetchFileContent} 
                            files={files} 
                            projectId={projectId} 
                            folderId={folderId} 
                        />
                    </div>

                    <div className="border-t border-gray-900 p-3">
                        <UpdatePrompt 
                            prompt={prompt} 
                            setPrompt={setPrompt} 
                            projectId={projectId} 
                            folderId={folderId}
                        />
                    </div>
                </div>

                {/* Right Section (Code Editor / Live Preview) */}
                <div className="flex flex-col flex-1 overflow-hidden">
                    <div className="p-3 border-b border-gray-900 flex justify-between">
                        <ViewToggle activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>

                    <div className="flex-1 overflow-auto p-4">
                        {activeTab === "code" ? (
                            <CodeEditor 
                                file={activeFile}  
                                projectId={projectId} 
                                folderId={folderId} 
                                onCodeChange={handleFileChange} 
                                
                            />
                        ) : (
                            <LivePreview files={files} projectId={projectId} folderId={folderId} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editor;
