// // // import dotenv from 'dotenv';
// // // import axios from 'axios';

// // // dotenv.config();

// // // // Gemini 2.0 Flash API
// // // const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
// // // const API_KEY = process.env.GEMINI_API_KEY;

// // // const SYSTEM_INSTRUCTION = `
// // // You are an expert full-stack developer and AI-powered code generator.
// // // Your task is to generate **complete project structures** with proper files, folders, and production-ready code based on the user's prompt.

// // // ### ✅ File & Folder Structure Rules:
// // // - Return a **JSON array** where each object represents a file.
// // // - Each file must include:
// // //   - **name**: File path with correct extension.
// // //   - **content**: Well-formatted code.
// // //   - **type**: File type (e.g., html, css, js, backend).
// // // - Folder structures must be inferred from file paths.

// // // ### ✅ Project Structure Guidelines:
// // // #### 🔹 **Frontend (React-Vite)**
// // // frontend/src/main.jsx
// // // frontend/src/index.css
// // // frontend/src/App.jsx
// // // frontend/src/components/ComponentName.jsx
// // // frontend/src/assets/
// // // frontend/src/styles/global.css
// // // frontend/package.json
// // // frontend/vite.config.js
// // // frontend/index.html
// // // frontend/eslint.config.js

// // // #### 🔹 **Backend (Node.js + Express)**
// // // backend/server.js
// // // backend/routes/index.js
// // // backend/controllers/controller.js
// // // backend/models/model.js
// // // backend/config/db.js
// // // backend/middleware/auth.js
// // // backend/package.json

// // // ### 📌 **STRICT RULES:**
// // // 1️⃣ Return **JSON array only** (no explanations).  
// // // 2️⃣ Use **correct folder structure** in "name".  
// // // 3️⃣ Provide valid, well-formatted, production-ready code.  
// // // 4️⃣ Follow best practices for each stack.

// // // Include Tailwind setup for React + Vite projects:
// // // - tailwind.config.js
// // // - postcss.config.js
// // // - index.css with Tailwind directives
// // // - Proper import in main.jsx
// // // `;

// // // // ✅ Helper to clean markdown or stray language hints
// // // const cleanAIResponse = (text) => {
// // //     if (!text || typeof text !== 'string') return text;

// // //     text = text.replace(/```[a-z]*\n?/gi, '').replace(/```/g, '').trim();

// // //     const lines = text.split('\n');
// // //     if (/^(javascript|js|jsx|ts|tsx|html|css|json|backend)$/i.test(lines[0]?.trim())) {
// // //         lines.shift();
// // //     }

// // //     return lines.join('\n').trim();
// // // };

// // // // ✅ Generate Project Code
// // // export const generateCodeWithGemini = async (prompt) => {
// // //     try {
// // //         const fullPrompt = `${SYSTEM_INSTRUCTION}\n\nUser prompt: ${prompt}`;

// // //         const response = await axios.post(
// // //             `${GEMINI_API_URL}?key=${API_KEY}`,
// // //             { contents: [{ parts: [{ text: fullPrompt }] }] },
// // //             { headers: { 'Content-Type': 'application/json' } }
// // //         );

// // //         let generated = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
// // //         if (!generated) throw new Error('No code generated.');

// // //         // 🧹 Clean if string
// // //         if (typeof generated === 'string') generated = cleanAIResponse(generated);

// // //         // 🧩 Try JSON parse
// // //         try {
// // //             const parsed = typeof generated === 'string' ? JSON.parse(generated) : generated;
// // //             if (Array.isArray(parsed)) {
// // //                 console.log('✅ Parsed JSON array received from Gemini.');
// // //                 return parsed;
// // //             }
// // //         } catch {
// // //             console.warn('⚠️ Gemini output is not valid JSON. Returning cleaned string.');
// // //         }

// // //         return typeof generated === 'string' ? generated : JSON.stringify(generated, null, 2);
// // //     } catch (error) {
// // //         console.error('❌ Error generating code:', error.response?.data || error.message);
// // //         throw new Error(error.response?.data?.error?.message || error.message);
// // //     }
// // // };

// // // // ✅ Update File Content
// // // export const updateFileWithPrompt = async (filename, existingContent, prompt) => {
// // //     const fullPrompt = `
// // // You are an expert developer AI assistant.

// // // Your task is to update only the content of the file "${filename}" shown below.
// // // Do not change or generate any other files.

// // // 🧾 Original File Content:
// // // -----
// // // ${existingContent}
// // // -----

// // // 💡 Instruction:
// // // ${prompt}

// // // ✅ Rules:
// // // - Return only the updated content of this file.
// // // - Do not wrap output in markdown or explanations.
// // // - Keep the original structure intact unless necessary.
// // // `;

// // //     try {
// // //         console.log("🔵 Sending update prompt for:", filename);

// // //         const response = await axios.post(
// // //             `${GEMINI_API_URL}?key=${API_KEY}`,
// // //             { contents: [{ parts: [{ text: fullPrompt }] }] },
// // //             { headers: { 'Content-Type': 'application/json' } }
// // //         );

// // //         let updated = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
// // //         if (!updated) throw new Error('No updated code generated.');

// // //         if (typeof updated === 'string') updated = cleanAIResponse(updated);

// // //         console.log(`🟢 Updated code received for: ${filename}`);
// // //         return typeof updated === 'string' ? updated : JSON.stringify(updated, null, 2);
// // //     } catch (error) {
// // //         console.error('❌ Error updating file:', error.response?.data || error.message);
// // //         throw new Error(error.response?.data?.error?.message || error.message);
// // //     }
// // // };

// // import dotenv from "dotenv";
// // import axios from "axios";

// // dotenv.config();

// // const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
// // const API_KEY = process.env.OPENROUTER_API_KEY;

// // // better free coding model
// // const MODELS = [
// //   "google/gemma-3-4b-it:free",
// //   "meta-llama/llama-3.2-3b-instruct:free",
// //   "google/gemma-3n-4b-it:free",
// //   "openrouter/free"
// // ];

// // const SYSTEM_INSTRUCTION = `
// // You are an expert full-stack developer and AI-powered code generator.

// // Your task is to generate complete project structures with proper files, folders, and production-ready code based on the user's prompt.

// // IMPORTANT:
// // Return ONLY a JSON array. Do NOT include explanations, notes, headings, or markdown.

// // Output must start with [ and end with ].

// // ### File Rules
// // Each file object must contain:

// // {
// // "name": "file path with extension",
// // "type": "file type",
// // "content": "complete working code"
// // }

// // ### React + Vite Structure

// // frontend/src/main.jsx
// // frontend/src/App.jsx
// // frontend/src/index.css
// // frontend/src/components/ComponentName.jsx
// // frontend/src/assets/
// // frontend/src/styles/global.css
// // frontend/package.json
// // frontend/vite.config.js
// // frontend/index.html
// // frontend/eslint.config.js

// // ### Tailwind Setup Required

// // tailwind.config.js
// // postcss.config.js
// // index.css with tailwind directives
// // tailwind imported in main.jsx

// // ### STRICT RULES

// // 1. Return JSON array only.
// // 2. Do NOT include explanations.
// // 3. Do NOT include markdown.
// // 4. Do NOT include text before or after JSON.
// // 5. Each file must contain valid code.
// // `;


// // // clean markdown and garbage text
// // const cleanAIResponse = (text) => {

// //   if (!text || typeof text !== "string") return text;

// //   // remove markdown
// //   text = text
// //     .replace(/```[a-z]*\n?/gi, "")
// //     .replace(/```/g, "")
// //     .trim();

// //   // remove text before JSON
// //   const firstBracket = text.indexOf("[");
// //   if (firstBracket !== -1) {
// //     text = text.slice(firstBracket);
// //   }

// //   // remove text after JSON
// //   const lastBracket = text.lastIndexOf("]");
// //   if (lastBracket !== -1) {
// //     text = text.slice(0, lastBracket + 1);
// //   }

// //   return text.trim();
// // };


// // // Generate project
// // export const generateCodeWithGemini = async (prompt) => {

// //   try {

// //     const response = await axios.post(
// //       OPENROUTER_API_URL,
// //       {
// //         model: MODEL,

// //         messages: [
// //           {
// //             role: "system",
// //             content: SYSTEM_INSTRUCTION
// //           },
// //           {
// //             role: "user",
// //             content: prompt
// //           }
// //         ],

// //         temperature: 0.2,
// //         max_tokens: 7000
// //       },
// //       {
// //         headers: {
// //           Authorization: `Bearer ${API_KEY}`,
// //           "Content-Type": "application/json"
// //         }
// //       }
// //     );

// //     let generated =
// //       response?.data?.choices?.[0]?.message?.content;

// //     if (!generated) {
// //       throw new Error("No code generated from AI");
// //     }

// //     generated = cleanAIResponse(generated);

// //     try {

// //       const parsed = JSON.parse(generated);

// //       if (Array.isArray(parsed)) {
// //         console.log("✅ JSON project generated successfully");
// //         return parsed;
// //       }

// //       throw new Error("AI response is not an array");

// //     } catch (parseError) {

// //       console.warn("⚠️ JSON parsing failed");
// //       console.warn(generated);

// //       throw new Error("Invalid JSON response from AI");
// //     }

// //   } catch (error) {

// //     console.error(
// //       "❌ Error generating code:",
// //       error.response?.data || error.message
// //     );

// //     throw new Error(
// //       error.response?.data?.error?.message || error.message
// //     );
// //   }
// // };


// // // update file
// // export const updateFileWithPrompt = async (
// //   filename,
// //   existingContent,
// //   prompt
// // ) => {

// //   const fullPrompt = `
// // You are an expert developer AI assistant.

// // Update ONLY the file "${filename}".

// // Return only the updated code.

// // No explanations.

// // Original code:
// // ${existingContent}

// // Instruction:
// // ${prompt}
// // `;

// //   try {

// //     const response = await axios.post(
// //       OPENROUTER_API_URL,
// //       {
// //         model: MODEL,

// //         messages: [
// //           {
// //             role: "system",
// //             content: "You are an expert software engineer."
// //           },
// //           {
// //             role: "user",
// //             content: fullPrompt
// //           }
// //         ],

// //         temperature: 0.2,
// //         max_tokens: 4000
// //       },
// //       {
// //         headers: {
// //           Authorization: `Bearer ${API_KEY}`,
// //           "Content-Type": "application/json"
// //         }
// //       }
// //     );

// //     let updated =
// //       response?.data?.choices?.[0]?.message?.content;

// //     if (!updated) {
// //       throw new Error("No updated code generated.");
// //     }

// //     updated = cleanAIResponse(updated);

// //     console.log(`🟢 Updated file received: ${filename}`);

// //     return updated;

// //   } catch (error) {

// //     console.error(
// //       "❌ Error updating file:",
// //       error.response?.data || error.message
// //     );

// //     throw new Error(
// //       error.response?.data?.error?.message || error.message
// //     );
// //   }
// // };


// import dotenv from "dotenv";
// import axios from "axios";

// dotenv.config();

// const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
// const API_KEY = process.env.OPENROUTER_API_KEY;

// // Free models with fallback
// const MODELS = [
//   "google/gemma-3-4b-it:free",
//   "meta-llama/llama-3.2-3b-instruct:free",
//   "google/gemma-3n-4b-it:free",
//   "openrouter/free"
// ];

// // Minimal system instruction for essential frontend files only
// const SYSTEM_INSTRUCTION = `
// You are an expert React + Vite + Tailwind frontend developer.

// Generate only the essential files to run a React frontend project:

// - frontend/package.json
// - frontend/vite.config.js
// - frontend/tailwind.config.js
// - frontend/postcss.config.js
// - frontend/index.html
// - frontend/src/main.jsx
// - frontend/src/App.jsx
// - frontend/src/index.css
// - frontend/src/components/ComponentName.jsx

// Return ONLY a JSON array of file objects:

// {
//   "name": "file path",
//   "type": "file extension",
//   "content": "complete working code"
// }

// Do NOT add explanations or markdown.
// Return working files only.
// `;

// // Clean AI response
// const cleanAIResponse = (text) => {
//   if (!text || typeof text !== "string") return "";
//   text = text.replace(/```[a-z]*\n?/gi, "").replace(/```/g, "").trim();
//   const start = text.indexOf("[");
//   const end = text.lastIndexOf("]");
//   if (start !== -1 && end !== -1) text = text.substring(start, end + 1);
//   return text.trim();
// };

// // Safe JSON parse
// const safeJSONParse = (text) => {
//   try {
//     const parsed = JSON.parse(text);
//     return Array.isArray(parsed) ? parsed : null;
//   } catch {
//     return null;
//   }
// };

// // Validate files
// const validateFiles = (files) => {
//   return files.filter(f => f && f.name && f.type && f.content?.trim().length > 0);
// };

// // Call AI with fallback
// const callAI = async (prompt) => {
//   let lastError = null;

//   for (const model of MODELS) {
//     for (let retry = 0; retry < 2; retry++) {
//       try {
//         console.log("🤖 Trying model:", model);

//         const response = await axios.post(
//           OPENROUTER_API_URL,
//           {
//             model,
//             messages: [
//               { role: "system", content: SYSTEM_INSTRUCTION },
//               { role: "user", content: prompt }
//             ],
//             temperature: 0.2,
//             max_tokens: 4000
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${API_KEY}`,
//               "Content-Type": "application/json"
//             },
//             timeout: 60000
//           }
//         );

//         let generated = response?.data?.choices?.[0]?.message?.content;
//         if (!generated) throw new Error("Empty AI response");

//         generated = cleanAIResponse(generated);
//         const parsed = safeJSONParse(generated);
//         if (!parsed) throw new Error("Invalid JSON from AI");

//         const validFiles = validateFiles(parsed);
//         if (!validFiles.length) throw new Error("No valid files returned");

//         console.log("✅ Success with model:", model);
//         return validFiles;

//       } catch (error) {
//         console.warn("⚠️ Model failed:", model);
//         lastError = error;
//       }
//     }
//   }

//   throw new Error(lastError?.message || "All AI models failed");
// };

// // Generate project
// export const generateCodeWithGemini = async (prompt) => {
//   try {
//     const files = await callAI(prompt);
//     console.log("🚀 Project generated successfully");
//     return files;
//   } catch (error) {
//     console.error("❌ Error generating code:", error.message);
//     throw error;
//   }
// };

// // Update file with AI
// export const updateFileWithPrompt = async (filename, existingContent, prompt) => {
//   const fullPrompt = `
// Update ONLY this file:

// File: ${filename}

// Return JSON array with one file object.

// Original code:
// ${existingContent}

// Instruction:
// ${prompt}
// `;

//   try {
//     const files = await callAI(fullPrompt);
//     if (Array.isArray(files) && files[0]?.content) return files[0].content;
//     throw new Error("AI did not return updated content");
//   } catch (error) {
//     console.error("❌ Error updating file:", error.message);
//     throw error;
//   }
// };





import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = process.env.GROQ_API_KEY;
const MODEL = "llama-3.3-70b-versatile";

// ✅ System prompt for HTML + CSS + JS projects
const HTML_SYSTEM_INSTRUCTION = `
You are an expert frontend developer and AI-powered code generator.
Your task is to generate a COMPLETE HTML + CSS + JavaScript website with ALL required files.

CRITICAL RULE:
Return ONLY a valid JSON array. No explanations. No markdown. No text before or after JSON.
Output MUST start with [ and end with ].

FILE OBJECT STRUCTURE:
{
  "name": "exact/file/path/with/extension",
  "type": "file extension without dot (e.g. html, css, js)",
  "content": "complete working code"
}

REQUIRED FILE STRUCTURE for HTML/CSS/JS:
index.html         → complete HTML file linking all CSS and JS files
styles/style.css   → complete CSS with all styles, animations, responsive design
js/main.js         → all JavaScript logic, DOM manipulation, interactivity

HTML/CSS/JS CODE RULES:
1. index.html must link stylesheet with <link rel="stylesheet" href="styles/style.css">
2. index.html must include script at bottom <script src="js/main.js"></script>
3. Use vanilla JavaScript only — no frameworks
4. CSS must include responsive design with media queries
5. Use CSS variables for colors and fonts
6. Add smooth animations and hover effects
7. Make it visually stunning and production-ready
8. NO React, NO Vue, NO Angular — pure HTML/CSS/JS only
9. All files must be complete — no TODO or placeholder code

JSON ESCAPING RULES — STRICTLY FOLLOW:
- Escape ALL backslashes as \\
- Escape ALL double quotes inside content as \\"
- Use \\n for newlines inside content strings
- Do NOT use raw newlines inside JSON string values
- Do NOT use unescaped special characters

STRICT OUTPUT RULES:
1. Return JSON array ONLY
2. NO markdown code blocks (no \`\`\`json or \`\`\`)
3. NO text before [ or after ]
4. ALL files must have complete working code
`;

// ✅ System prompt for React + Vite + Tailwind projects
const REACT_SYSTEM_INSTRUCTION = `
You are an expert React developer and AI-powered code generator.
Your task is to generate a COMPLETE React + Vite + Tailwind CSS project with ALL required files.

CRITICAL RULE:
Return ONLY a valid JSON array. No explanations. No markdown. No text before or after JSON.
Output MUST start with [ and end with ].

FILE OBJECT STRUCTURE:
{
  "name": "exact/file/path/with/extension",
  "type": "file extension without dot (e.g. jsx, css, js, json)",
  "content": "complete working code"
}

REQUIRED FILE STRUCTURE for React + Vite + Tailwind:
frontend/index.html
frontend/package.json
frontend/vite.config.js
frontend/tailwind.config.js
frontend/postcss.config.js
frontend/src/main.jsx
frontend/src/App.jsx
frontend/src/index.css
frontend/src/components/[ComponentName].jsx
frontend/src/context/[ContextName].jsx     ← context files MUST be .jsx not .js
frontend/src/hooks/[hookName].js           ← hooks can be .js
frontend/src/utils/[utilName].js           ← utils can be .js

EXTENSION RULES — VERY IMPORTANT:
- ANY file containing JSX code (<div>, <Component>, HTML tags) MUST use .jsx extension
- context files with JSX → MUST be .jsx (e.g. CartContext.jsx NOT CartContext.js)
- component files → MUST be .jsx
- App file → MUST be App.jsx
- main file → MUST be main.jsx
- Only use .js for files that have NO JSX (pure JS logic, utils, hooks without JSX)

VERY IMPORTANT — package.json MUST be exactly:
{
  "name": "project",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.27",
    "tailwindcss": "^3.3.3",
    "vite": "^4.4.5"
  }
}

VERY IMPORTANT — postcss.config.js MUST use CommonJS (NOT export default):
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}

VERY IMPORTANT — tailwind.config.js MUST use CommonJS (NOT export default):
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: []
}

VERY IMPORTANT — vite.config.js MUST be:
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()] })

VERY IMPORTANT — src/index.css MUST have exactly these 3 lines:
@tailwind base;
@tailwind components;
@tailwind utilities;

VERY IMPORTANT — src/main.jsx MUST have:
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
)

VERY IMPORTANT — index.html MUST have:
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

REACT CODE RULES:
1. Every component must be a proper functional React component with export default
2. Use React hooks (useState, useEffect etc.) wherever needed
3. Use Tailwind CSS classes for ALL styling — no inline styles unless necessary
4. All imports must be correct — import from correct .jsx or .js paths
5. No placeholder text like "// add code here" or "TODO"
6. If using Context API — context file MUST be .jsx extension
7. Make it visually stunning and production-ready

JSON ESCAPING RULES — STRICTLY FOLLOW:
- Escape ALL backslashes as \\
- Escape ALL double quotes inside content as \\"
- Use \\n for newlines inside content strings
- Do NOT use raw newlines inside JSON string values
- Template literals backticks must be escaped as \\\`

STRICT OUTPUT RULES:
1. Return JSON array ONLY
2. NO markdown code blocks (no \`\`\`json or \`\`\`)
3. NO text before [ or after ]
4. ALL files must have complete working code
`;

// ✅ Detect project type from user prompt
const detectProjectType = (prompt) => {
  const lower = prompt.toLowerCase();
  const reactKeywords = ["react", "vite", "tailwind", "component", "jsx", "tsx"];
  const htmlKeywords = ["html", "css", "javascript", "vanilla", "plain", "static", "html/css", "html, css", "html css", "js"];
  const isReact = reactKeywords.some((kw) => lower.includes(kw));
  const isHTML = htmlKeywords.some((kw) => lower.includes(kw));
  if (isReact) return "react";
  if (isHTML) return "html";
  return "html";
};

// ✅ Clean AI response
const cleanAIResponse = (text) => {
  if (!text || typeof text !== "string") return "";
  text = text.replace(/```json\n?/gi, "").replace(/```\n?/gi, "").trim();
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start !== -1 && end !== -1 && end > start) {
    text = text.substring(start, end + 1);
  }
  return text.trim();
};

// ✅ Extract content blocks manually (handles bad escaped characters)
const extractContentBlocks = (text) => {
  const blocks = [];
  let searchFrom = 0;

  while (true) {
    const contentKey = text.indexOf('"content"', searchFrom);
    if (contentKey === -1) break;

    const colonPos = text.indexOf(":", contentKey + 9);
    if (colonPos === -1) break;

    let openQuote = colonPos + 1;
    while (openQuote < text.length && text[openQuote] !== '"') openQuote++;
    if (openQuote >= text.length) break;

    openQuote++;
    let closeQuote = openQuote;
    let contentChars = [];

    while (closeQuote < text.length) {
      const ch = text[closeQuote];
      if (ch === "\\") {
        const next = text[closeQuote + 1];
        if (next === '"') { contentChars.push('"'); closeQuote += 2; }
        else if (next === "n") { contentChars.push("\n"); closeQuote += 2; }
        else if (next === "t") { contentChars.push("\t"); closeQuote += 2; }
        else if (next === "\\") { contentChars.push("\\"); closeQuote += 2; }
        else if (next === "r") { contentChars.push("\r"); closeQuote += 2; }
        else { contentChars.push(next || ""); closeQuote += 2; }
      } else if (ch === '"') {
        break;
      } else {
        contentChars.push(ch);
        closeQuote++;
      }
    }

    blocks.push(contentChars.join(""));
    searchFrom = closeQuote + 1;
  }

  return blocks;
};

// ✅ Auto fix .js → .jsx for files containing JSX
const fixFileExtensions = (files) => {
  return files.map((f) => {
    if (
      f.name.endsWith(".js") &&
      !f.name.includes("config") &&
      !f.name.includes("vite") &&
      !f.name.includes("package") &&
      !f.name.includes("eslint") &&
      f.content &&
      (f.content.includes("</") || f.content.includes("/>") || f.content.includes("return ("))
    ) {
      console.log(`🔧 Auto-fixed extension: ${f.name} → ${f.name.replace(".js", ".jsx")}`);
      return {
        ...f,
        name: f.name.replace(".js", ".jsx"),
        type: "jsx",
      };
    }
    return f;
  });
};

// ✅ Repair broken JSON
const repairJSON = (text) => {
  try {
    JSON.parse(text);
    return text;
  } catch {}

  try {
    const nameRegex = /"name"\s*:\s*"([^"]+)"/g;
    const typeRegex = /"type"\s*:\s*"([^"]+)"/g;
    const names = [];
    const types = [];
    let match;

    while ((match = nameRegex.exec(text)) !== null) names.push(match[1]);
    while ((match = typeRegex.exec(text)) !== null) types.push(match[1]);

    const contentBlocks = extractContentBlocks(text);

    if (
      names.length === 0 ||
      names.length !== types.length ||
      names.length !== contentBlocks.length
    ) {
      console.warn("⚠️ Repair mismatch — names:", names.length, "types:", types.length, "contents:", contentBlocks.length);
      return null;
    }

    const fileObjects = names.map((name, i) => ({
      name,
      type: types[i],
      content: contentBlocks[i],
    }));

    console.log(`🔧 JSON repaired — ${fileObjects.length} files extracted`);
    return JSON.stringify(fileObjects);
  } catch (e) {
    console.error("❌ JSON repair failed:", e.message);
    return null;
  }
};

// ✅ Safe JSON parse with repair fallback
const safeJSONParse = (text) => {
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      console.log("✅ Direct JSON parse successful");
      return parsed;
    }
  } catch (e) {
    console.warn("⚠️ Direct parse failed:", e.message);
  }

  console.log("🔧 Attempting JSON repair...");
  const repaired = repairJSON(text);
  if (!repaired) return null;

  try {
    const parsed = JSON.parse(repaired);
    if (Array.isArray(parsed)) {
      console.log("✅ Repaired JSON parse successful");
      return parsed;
    }
  } catch (e) {
    console.warn("⚠️ Repaired parse also failed:", e.message);
  }

  return null;
};

// ✅ Validate each file
const validateFiles = (files) => {
  return files.filter((f) => {
    if (!f || typeof f !== "object") return false;
    if (!f.name || typeof f.name !== "string") return false;
    if (!f.type || typeof f.type !== "string") return false;
    if (!f.content || typeof f.content !== "string") return false;
    if (f.content.trim().length < 5) return false;
    return true;
  });
};

// ✅ Core Groq API caller
const callGroq = async (userPrompt, systemPrompt = REACT_SYSTEM_INSTRUCTION, maxTokens = 8000) => {
  if (!API_KEY) throw new Error("GROQ_API_KEY is missing in .env file");

  try {
    console.log("🤖 Calling Groq API with model:", MODEL);

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.2,
        max_tokens: maxTokens,
        top_p: 0.9,
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 120000,
      }
    );

    const content = response?.data?.choices?.[0]?.message?.content;
    if (!content) throw new Error("Empty response from Groq");

    console.log("📦 Raw response length:", content.length);
    return content;
  } catch (error) {
    const status = error.response?.status;
    const errMsg = error.response?.data?.error?.message || error.message;
    if (status === 429) throw new Error("Groq rate limit reached. Please wait and try again.");
    if (status === 401) throw new Error("Invalid GROQ_API_KEY. Please check your .env file.");
    console.error("❌ Groq API Error:", errMsg);
    throw new Error(errMsg);
  }
};

// ✅ Generate full project
export const generateCodeWithGemini = async (prompt) => {
  try {
    console.log("🚀 Generating project for prompt:", prompt);

    const projectType = detectProjectType(prompt);
    console.log("🔍 Detected project type:", projectType);

    const systemPrompt = projectType === "react" ? REACT_SYSTEM_INSTRUCTION : HTML_SYSTEM_INSTRUCTION;

    const raw = await callGroq(prompt, systemPrompt, 8000);
    const cleaned = cleanAIResponse(raw);
    console.log("🧹 Cleaned response length:", cleaned.length);

    const parsed = safeJSONParse(cleaned);
    if (!parsed) {
      console.error("❌ Sample of failed output:\n", cleaned.substring(0, 500));
      throw new Error("Could not parse AI response as JSON. Please try again.");
    }

    // ✅ Auto fix .js → .jsx for files with JSX content
    const fixedFiles = fixFileExtensions(parsed);
    const validFiles = validateFiles(fixedFiles);

    if (!validFiles.length) throw new Error("No valid files in AI response.");

    console.log(`✅ Project generated — ${validFiles.length} files:`);
    validFiles.forEach((f) => console.log("  📄", f.name));

    return validFiles;
  } catch (error) {
    console.error("❌ Error generating project:", error.message);
    throw error;
  }
};

// ✅ Update single file
export const updateFileWithPrompt = async (filename, existingContent, prompt) => {
  const systemPrompt = `
You are an expert software engineer.
Update ONLY the file provided. Return ONLY the raw updated code.
No explanations. No markdown. No backtick code blocks.
Return complete file content only.
`;

  const userPrompt = `
Update this file: ${filename}

Instruction:
${prompt}

Original code:
${existingContent}
`;

  try {
    console.log(`🔵 Updating file: ${filename}`);
    const raw = await callGroq(userPrompt, systemPrompt, 4000);
    const cleaned = raw.replace(/```[a-z]*\n?/gi, "").replace(/```/g, "").trim();
    console.log(`🟢 File updated: ${filename}`);
    return cleaned;
  } catch (error) {
    console.error("❌ Error updating file:", error.message);
    throw error;
  }
};