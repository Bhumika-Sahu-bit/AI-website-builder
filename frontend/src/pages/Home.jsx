// import { useState } from "react"
// import { generateCode, saveProject } from "../utils/api";
// import CodeBlock from "../components/CodeBlock";


// const Home = () => {
//   const [prompt , setPrompt ] = useState("");
//   const [loading , setLoading] = useState(false);
//   const [code, setCode] = useState('');

//   const handleGenerate = async () => {
//     if(!prompt.trim())return;
//     setLoading(true);
//     try {
//       const response = await generateCode(prompt);
//       setCode(response.data.code);
//     } catch (error) {
//       console.error('Error generating code:', error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const handleSave = async () => {
//     if(!prompt || !code) return;
//     try {
//       await saveProject(prompt , code);
//       alert('Project saved successfully!');
//     } catch (error) {
//       console.error('Error saving project:', error);
//     }
//   }
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//         Generate Code with AI ✨
//         </h1>

//         <textarea className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500" 
//         rows="5"
//         placeholder="Describe what code you want to generate..."
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         >
//        </textarea>

//        <div className="flex justify-center gap-4 mt-4">
//         <button 
//         className={ `px-6 py-3 bg-blue-600 text-white rounded-lg ${
//           loading ? 'opacity-50 cursor-not-allowed': 'hover:bg-blue-700'
//         }` }
//           onClick={handleGenerate}
//           disabled={loading}
//         >
//           {loading ? 'Generating...' : 'Generate Code'}
//         </button>
//         <button
//           className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
//           onClick={handleSave}
//           disabled={!code}
//           >
//             Save Project
//           </button>
//        </div>

//        {code && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold mb-4">Generated Code:</h2>
//           <CodeBlock code={code} />
//         </div>
//        )}
//       </div>
//     </div>
//   )
// }

// export default Home;