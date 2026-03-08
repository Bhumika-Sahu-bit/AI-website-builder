/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { buildFileTree } from "../service/fileTree";
import { Folder, FolderOpen, FileText } from "lucide-react"; // ✅ lucide-react for clean icons

const FileExplorer = ({ files, onFileSelect }) => {
    const [openFolders, setOpenFolders] = useState({});

    const fileTree = buildFileTree(files.map(file => file.name));

    const toggleFolder = (folderPath) => {
        setOpenFolders((prev) => ({
            ...prev,
            [folderPath]: !prev[folderPath]
        }));
    };

    return (
        <div className="p-3">
            <h3 className="text-gray-400 text-lg font-semibold mb-3 tracking-wide">📁 File Explorer</h3>
            <ul className="text-sm text-gray-300 space-y-1">
                {Object.entries(fileTree).map(([name, children]) => (
                    <FolderOrFile
                        key={name}
                        name={name}
                        children={children}
                        onFileSelect={onFileSelect}
                        openFolders={openFolders}
                        toggleFolder={toggleFolder}
                        path={name}
                    />
                ))}
            </ul>
        </div>
    );
};

const FolderOrFile = ({ name, children, onFileSelect, openFolders, toggleFolder, path }) => {
    const isFolder = children !== null && typeof children === "object";
    const isOpen = openFolders[path] || false;

    return (
        <div>
            <div
                onClick={() => (isFolder ? toggleFolder(path) : onFileSelect(path))}
                className="px-2 py-1 flex items-center gap-2 cursor-pointer rounded-md hover:bg-gray-800 transition-all"
            >
                {isFolder ? (
                    isOpen ? <FolderOpen className="w-4 h-4 text-yellow-400" /> : <Folder className="w-4 h-4 text-yellow-500" />
                ) : (
                    <FileText className="w-4 h-4 text-blue-400" />
                )}
                <span className="truncate">{name}</span>
            </div>

            {isFolder && isOpen && (
                <ul className="ml-4 border-l border-gray-700 pl-3">
                    {Object.entries(children).map(([childName, grandChildren]) => (
                        <FolderOrFile
                            key={childName}
                            name={childName}
                            children={grandChildren}
                            onFileSelect={onFileSelect}
                            openFolders={openFolders}
                            toggleFolder={toggleFolder}
                            path={`${path}/${childName}`}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FileExplorer;
