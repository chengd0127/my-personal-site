import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Navbar } from "../components/Navbar.mjs";
import { Footer } from "../components/Footer.mjs";
import { escapeHtml } from "../components/utils.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const pageModules = [
  "../pages/index.mjs",
  "../pages/education.mjs",
  "../pages/projects.mjs",
  "../pages/skills.mjs",
  "../pages/contact.mjs",
  "../pages/404.mjs"
];

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

function documentTemplate({ profile, page, content }) {
  const title = page.title === "Home" ? profile.name : `${page.title} | ${profile.name}`;

  return `<!doctype html>
<html lang="zh-CN" data-theme="light" data-lang="zh">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${escapeHtml(page.description)}">
    <title>${escapeHtml(title)}</title>
    <script>
      (() => {
        try {
          const theme = localStorage.getItem("cv-theme");
          const lang = localStorage.getItem("cv-lang");
          if (theme === "dark" || theme === "light") document.documentElement.dataset.theme = theme;
          if (lang === "en" || lang === "zh") {
            document.documentElement.dataset.lang = lang;
            document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
          }
        } catch (_) {}
      })();
    </script>
    <link rel="stylesheet" href="/styles/globals.css">
    <link rel="stylesheet" href="/styles/animations.css">
    <script src="/js/site.js" defer></script>
  </head>
  <body>
    <div class="site-shell">
      ${Navbar({ profile, currentPath: page.path })}
      <main>
        ${content}
      </main>
      ${Footer({ profile })}
    </div>
  </body>
</html>
`;
}

async function copyIfExists(from, to) {
  try {
    await fs.cp(from, to, { recursive: true });
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

async function build() {
  const profile = await readJson(path.join(rootDir, "data", "profile.json"));
  await fs.rm(distDir, { recursive: true, force: true });
  await fs.mkdir(distDir, { recursive: true });

  await copyIfExists(path.join(rootDir, "styles"), path.join(distDir, "styles"));
  await copyIfExists(path.join(rootDir, "public"), distDir);

  for (const modulePath of pageModules) {
    const module = await import(modulePath);
    const outputFile = path.join(distDir, module.page.output);
    await fs.mkdir(path.dirname(outputFile), { recursive: true });
    await fs.writeFile(
      outputFile,
      documentTemplate({
        profile,
        page: module.page,
        content: module.render(profile)
      })
    );
    console.log(`Built ${module.page.path} -> dist/${module.page.output}`);
  }
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
