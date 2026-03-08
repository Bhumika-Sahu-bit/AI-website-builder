// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const generateCodeFromAI = async (prompt) => {
//     try {
//         const apiKey = process.env.GEMINI_API_KEY;

//         if (!apiKey) {
//             throw new Error("API key is missing. Please set GEMINI_API_KEY in your .env file.");
//         }

//         const genAI = new GoogleGenerativeAI(apiKey);
//         const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//         const result = await model.generateContent(prompt);

//         if (result && result.response && result.response.text) {
//             return result.response.text();
//         } else {
//             throw new Error("Invalid response from Gemini AI.");
//         }
//     } catch (error) {
//         console.error("AI API Error:", error.message);
//         return `Error generating code: ${error.message}`;
//     }
// };

// module.exports = { generateCodeFromAI };