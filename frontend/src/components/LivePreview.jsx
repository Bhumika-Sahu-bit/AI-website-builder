// /* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";
// import axios from "axios";
// import BASE_URL from "../service/api";

// const LivePreview = ({ files, projectId, folderId }) => {
//   const [html, setHtml] = useState("");
//   const [cssBlobUrl, setCssBlobUrl] = useState(null);
//   const [jsBlobUrl, setJsBlobUrl] = useState(null);
//   const [isReactProject, setIsReactProject] = useState(false);
//   const [reactPreviewUrl, setReactPreviewUrl] = useState(null);
//   const [error, setError] = useState("");

//   // Detect if project is React + Vite
//   useEffect(() => {
//     if (!files?.length) return;

//     const packageJson = files.find(file => file.name.endsWith("package.json"));

//     if (packageJson) {
//       try {
//         const pkg = JSON.parse(packageJson.content);
//         const isReact = pkg.dependencies?.react || pkg.devDependencies?.react;
//         const isVite = pkg.dependencies?.vite || pkg.devDependencies?.vite;

//         if (isReact && isVite) {
//           setIsReactProject(true);
//           return;
//         }
//       } catch (e) {
//         console.error("Error parsing package.json:", e.message);
//       }
//     }

//     setIsReactProject(false);
//   }, [files]);

//   // Launch React/Vite preview
//   useEffect(() => {
//     if (!isReactProject || !projectId || !folderId || reactPreviewUrl) return;

//     axios.post(`${BASE_URL}/api/preview/${projectId}/${folderId}`)
//       .then(res => {
//         setReactPreviewUrl(res.data.previewUrl);
//         setError("");
//       })
//       .catch(err => {
//         console.error("Error starting React preview server:", err.message);
//         setError("Failed to start React preview server. Please check the console for details.");
//       });
//   }, [isReactProject, projectId, folderId, reactPreviewUrl]);

//   // Static preview (HTML/CSS/JS)
//   useEffect(() => {
//     if (isReactProject || !files?.length) return;

//     const htmlFile = files.find(file => file.name.endsWith(".html"));
//     const cssFile = files.find(file => file.name.endsWith(".css"));
//     const jsFile = files.find(file => file.name.endsWith(".js"));

//     setHtml(htmlFile?.content || "");

//     const cssUrl = cssFile
//       ? URL.createObjectURL(new Blob([cssFile.content], { type: "text/css" }))
//       : null;

//     const jsUrl = jsFile
//       ? URL.createObjectURL(new Blob([jsFile.content], { type: "text/javascript" }))
//       : null;

//     setCssBlobUrl(cssUrl);
//     setJsBlobUrl(jsUrl);

//     return () => {
//       cssUrl && URL.revokeObjectURL(cssUrl);
//       jsUrl && URL.revokeObjectURL(jsUrl);
//     };
//   }, [files, isReactProject]);

//   // Inject CSS/JS blobs into HTML
//   const generatePreview = () => {
//     let modified = html;

//     // CSS injection
//     if (cssBlobUrl) {
//       const cssRegex = /<link[^>]+href=["'][^"']+\.css["'][^>]*>/gi;
//       modified = cssRegex.test(modified)
//         ? modified.replace(cssRegex, `<link rel="stylesheet" href="${cssBlobUrl}">`)
//         : modified.replace(/<\/head>/i, `<link rel="stylesheet" href="${cssBlobUrl}"></head>`);
//     }

//     // JS injection
//     if (jsBlobUrl) {
//       const jsRegex = /<script[^>]+src=["'][^"']+\.js["'][^>]*><\/script>/gi;
//       modified = jsRegex.test(modified)
//         ? modified.replace(jsRegex, `<script src="${jsBlobUrl}"></script>`)
//         : modified.replace(/<\/body>/i, `<script src="${jsBlobUrl}"></script></body>`);
//     }

//     return modified;
//   };

//   return (
//     <div className="mt-6 bg-[#0f172a] p-4 rounded-xl shadow-md border border-gray-800">
//       <h3 className="text-lg font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2">
//         🔍 Live Preview
//       </h3>

//       {error && (
//         <div className="bg-red-800 text-red-200 p-3 rounded-md mb-4 border border-red-600">
//           ⚠️ {error}
//         </div>
//       )}

//       {isReactProject ? (
//         reactPreviewUrl ? (
//           <div className="bg-[#111827] p-4 rounded-lg border border-gray-700">
//             <p className="text-green-400 font-medium mb-2">
//               ✅ React Preview is Ready!
//             </p>
//             <a
//               href={reactPreviewUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow transition duration-200"
//             >
//               🚀 Open Preview in New Tab
//             </a>
//           </div>
//         ) : (
//           <p className="text-yellow-400 font-medium animate-pulse">
//             ⏳ Starting React Preview...
//           </p>
//         )
//       ) : (
//         <div className="rounded-lg overflow-hidden border border-gray-700 bg-black">
//           <iframe
//             srcDoc={generatePreview()}
//             width="100%"
//             height="500px"
//             className="w-full h-[500px] border-none"
//             sandbox="allow-scripts allow-same-origin"
//             title="Static Preview"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default LivePreview;


/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../service/api";

const LivePreview = ({ files, projectId, folderId }) => {
  const [html, setHtml] = useState("");
  const [cssBlobUrl, setCssBlobUrl] = useState(null);
  const [jsBlobUrl, setJsBlobUrl] = useState(null);
  const [isReactProject, setIsReactProject] = useState(false);
  const [reactPreviewUrl, setReactPreviewUrl] = useState(null);
  const [error, setError] = useState("");

  // Detect React + Vite project
  useEffect(() => {
    if (!files?.length) return;

    const packageJson = files.find(file => file.name.endsWith("package.json"));

    if (packageJson) {
      try {
        const pkg = JSON.parse(packageJson.content);
        const isReact = pkg.dependencies?.react || pkg.devDependencies?.react;
        const isVite = pkg.dependencies?.vite || pkg.devDependencies?.vite;

        if (isReact && isVite) {
          setIsReactProject(true);
          return;
        }
      } catch (e) {
        console.error("Error parsing package.json:", e.message);
      }
    }

    setIsReactProject(false);
  }, [files]);

  // Start React preview server
  useEffect(() => {
    if (!isReactProject || !projectId || !folderId || reactPreviewUrl) return;

    axios.post(`${BASE_URL}/api/preview/${projectId}/${folderId}`)
      .then(res => {
        const url = res.data.previewUrl;
        setReactPreviewUrl(url);
        setError("");

        // Try opening in new tab
        const newTab = window.open(url, "_blank");
        if (!newTab) {
          console.warn("Popup blocked. User must click link manually.");
        }
      })
      .catch(err => {
        console.error("Error starting React preview server:", err.message);
        setError("⚠️ Failed to start React preview server. See console.");
      });
  }, [isReactProject, projectId, folderId, reactPreviewUrl]);

  // Static HTML/CSS/JS preview
  useEffect(() => {
    if (isReactProject || !files?.length) return;

    const htmlFile = files.find(file => file.name.endsWith(".html"));
    const cssFile = files.find(file => file.name.endsWith(".css"));
    const jsFile = files.find(file => file.name.endsWith(".js"));

    setHtml(htmlFile?.content || "");

    const cssUrl = cssFile
      ? URL.createObjectURL(new Blob([cssFile.content], { type: "text/css" }))
      : null;

    const jsUrl = jsFile
      ? URL.createObjectURL(new Blob([jsFile.content], { type: "text/javascript" }))
      : null;

    setCssBlobUrl(cssUrl);
    setJsBlobUrl(jsUrl);

    return () => {
      cssUrl && URL.revokeObjectURL(cssUrl);
      jsUrl && URL.revokeObjectURL(jsUrl);
    };
  }, [files, isReactProject]);

  const generatePreview = () => {
    let modified = html;

    if (cssBlobUrl) {
      const cssRegex = /<link[^>]+href=["'][^"']+\.css["'][^>]*>/gi;
      modified = cssRegex.test(modified)
        ? modified.replace(cssRegex, `<link rel="stylesheet" href="${cssBlobUrl}">`)
        : modified.replace(/<\/head>/i, `<link rel="stylesheet" href="${cssBlobUrl}"></head>`);
    }

    if (jsBlobUrl) {
      const jsRegex = /<script[^>]+src=["'][^"']+\.js["'][^>]*><\/script>/gi;
      modified = jsRegex.test(modified)
        ? modified.replace(jsRegex, `<script src="${jsBlobUrl}"></script>`)
        : modified.replace(/<\/body>/i, `<script src="${jsBlobUrl}"></script></body>`);
    }

    return modified;
  };

  return (
    <div className="mt-6 bg-[#0f172a] p-4 rounded-xl shadow-md border border-gray-800">
      <h3 className="text-lg font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2">
        🔍 Live Preview
      </h3>

      {error && (
        <div className="bg-red-800 text-red-200 p-3 rounded-md mb-4 border border-red-600">
          {error}
        </div>
      )}

      {isReactProject ? (
        reactPreviewUrl ? (
          <div className="bg-[#111827] p-4 rounded-lg border border-gray-700">
            <p className="text-green-400 font-medium mb-2">
              ✅ React Preview is Ready!
            </p>
            <a
              href={reactPreviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow transition duration-200"
            >
              🚀 Open Again
            </a>
          </div>
        ) : (
          <p className="text-yellow-400 font-medium animate-pulse">
            ⏳ Starting React Preview...
          </p>
        )
      ) : (
        <div className="rounded-lg overflow-hidden border border-gray-700 bg-black">
          <iframe
            srcDoc={generatePreview()}
            width="100%"
            height="500px"
            className="w-full h-[500px] border-none"
            sandbox="allow-scripts allow-same-origin"
            title="Static Preview"
          />
        </div>
      )}
    </div>
  );
};

export default LivePreview;
