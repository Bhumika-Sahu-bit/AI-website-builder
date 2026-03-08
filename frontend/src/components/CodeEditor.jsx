/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ file, onCodeChange }) => {
  const [editorContent, setEditorContent] = useState("");

  // 🟡 Load file content when selected
  useEffect(() => {
    if (file?.name && file?.content !== undefined) {
      console.log("📝 Selected File:", file); // Debug
      setEditorContent(file.content || "");
    }
  }, [file?.name, file?.content]);

  // 🟡 Update on type
  const handleEditorChange = (value) => {
    setEditorContent(value);
    if (file?.name) {
      onCodeChange(file.name, value);
    }
  };

  return (
    <div className="h-full w-full border border-gray-800 rounded-xl overflow-hidden shadow-md bg-[#0f172a]">
      <div className="px-4 py-2 border-b border-gray-800 bg-[#111827] text-gray-300 font-mono text-sm tracking-wide">
        {file?.name || "No file selected"}
      </div>
      <div className="h-[calc(100%-40px)]">
        <Editor
          height="100%"
          theme="vs-dark"
        //   defaultLanguage="javascript"
          value={editorContent}
          onChange={handleEditorChange}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            fontLigatures: true,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
