import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const normalized = path.normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  const relative = normalized === "/" ? "index.html" : normalized.replace(/^[/\\]/, "");
  return path.join(distDir, relative.endsWith("/") ? `${relative}index.html` : relative);
}

const server = http.createServer(async (request, response) => {
  try {
    let filePath = safePath(request.url || "/");
    let stat = await fs.stat(filePath).catch(() => null);

    if (stat?.isDirectory()) {
      filePath = path.join(filePath, "index.html");
      stat = await fs.stat(filePath).catch(() => null);
    }

    if (!stat) {
      filePath = path.join(distDir, "404.html");
      response.statusCode = 404;
    }

    const body = await fs.readFile(filePath);
    response.setHeader("Content-Type", mimeTypes[path.extname(filePath)] || "application/octet-stream");
    response.end(body);
  } catch (error) {
    response.statusCode = 500;
    response.end(`Server error: ${error.message}`);
  }
});

server.listen(port, () => {
  console.log(`Serving dist at http://localhost:${port}`);
});
