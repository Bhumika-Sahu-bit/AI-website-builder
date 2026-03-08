import fs from 'fs';
import path from 'path';
import { spawn, execSync } from 'child_process';
import File from '../models/File.js';
import Folder from '../models/FolderModel.js';

const activeServers = {};

export async function reconstructProjectFiles(projectId, folderId, basePath) {
    const folder = await Folder.findById(folderId);
    if (!folder) throw new Error('Folder not found');

    const files = await File.find({ projectId, folderId });
    if (!files.length) throw new Error('No files to reconstruct');

    console.log("📂 Reconstructing project files...");

    const rootDir = path.join(basePath, projectId.toString(), folderId.toString());
    if (!fs.existsSync(rootDir)) {
        fs.mkdirSync(rootDir, { recursive: true });
    }

    for (const file of files) {
        let filePath = file.name.startsWith("frontend/") ? file.name.replace("frontend/", "") : file.name;
        const fullPath = path.join(rootDir, filePath);
        const dir = path.dirname(fullPath);

        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        let content = file.content;

        // Auto convert CommonJS → ES Module for Vite-related files
        if (filePath.endsWith('vite.config.js') || filePath.endsWith('postcss.config.js') || filePath.endsWith('tailwind.config.js')) {
            content = content.replace(/module\.exports\s*=\s*/, 'export default ');
        }

        fs.writeFileSync(fullPath, content);
        console.log(`✅ File written: ${filePath}`);
    }

    return rootDir;
}

function findReactRootDir(fullPath) {
    const direct = ['package.json', 'index.html'].some(f => fs.existsSync(path.join(fullPath, f)));
    if (direct) return fullPath;

    const frontendPath = path.join(fullPath, 'frontend');
    const nested = ['package.json', 'index.html'].some(f => fs.existsSync(path.join(frontendPath, f)));

    return nested ? frontendPath : null;
}

function getRandomFreePort(min = 3000, max = 9000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function startReactPreviewServer(projectId, folderId) {
    const basePath = path.resolve('/tmp');
    const fullPath = await reconstructProjectFiles(projectId, folderId, basePath);
    const rootToUse = findReactRootDir(fullPath);
    const key = `${projectId}_${folderId}`;

    if (!rootToUse) {
        throw new Error("❌ Missing package.json or index.html in project folder");
    }

    if (activeServers[key]) {
        console.log("🧹 Cleaning up old preview instance...");
        activeServers[key].kill();
        delete activeServers[key];
    }

    console.log("📦 Installing dependencies...");
    try {
        execSync("npm install --legacy-peer-deps", { cwd: rootToUse, stdio: 'inherit' });
    } catch (e) {
        console.error('⚠️ Dependency install failed:', e.message);
    }

    console.log("🔨 Building project...");
    try {
        execSync("npm run build", { cwd: rootToUse, stdio: 'inherit' });
        console.log("✅ Build successful!");
    } catch (e) {
        console.error('❌ Build failed, retrying with common missing deps...');

        // 👇 Fix for "react-router-hash-link" & similar missing packages
        try {
            execSync("npm install react-router-dom react-router-hash-link --legacy-peer-deps", {
                cwd: rootToUse,
                stdio: 'inherit',
            });

            execSync("npm run build", { cwd: rootToUse, stdio: 'inherit' });
            console.log("✅ Build successful after dependency fix!");
        } catch (retryErr) {
            console.error('🔥 Still failed after retry:', retryErr.message);
            throw new Error('npm run build failed: ' + retryErr.message);
        }
    }

    const port = getRandomFreePort();

    // 🛠️ Ensure vite.config.js exists
    const viteConfigPath = path.join(rootToUse, 'vite.config.js');
    if (!fs.existsSync(viteConfigPath)) {
        console.log("🧠 Creating vite.config.js dynamically...");
        const viteConfigContent = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: ${port},
    strictPort: true
  },
  plugins: [react()]
});`;
        fs.writeFileSync(viteConfigPath, viteConfigContent, 'utf-8');
    }

    console.log(`🚀 Starting Vite preview on port ${port}...`);

    const vite = spawn("npx", ["vite", "preview", "--port", port, "--host"], {
        cwd: rootToUse,
        stdio: "inherit",
        shell: true,
    });

    vite.on('exit', (code) => {
        console.log(`🛑 Vite server exited with code ${code}`);
        delete activeServers[key];
    });

    activeServers[key] = vite;

    return { port };
}
