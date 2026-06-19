import { escapeHtml } from "./utils.mjs";

const navItems = [
  { href: "/", zh: "个人信息", en: "Profile" },
  { href: "/education/", zh: "校园经历", en: "Education" },
  { href: "/projects/", zh: "实习经历", en: "Internship" },
  { href: "/skills/", zh: "自我评价", en: "Evaluation" }
];

export function Navbar({ profile, currentPath }) {
  const links = navItems
    .map((item) => {
      const isActive = item.href === currentPath;
      return `<a class="nav-link${isActive ? " active" : ""}" href="${item.href}"${
        isActive ? ' aria-current="page"' : ""
      } data-i18n data-zh="${escapeHtml(item.zh)}" data-en="${escapeHtml(item.en)}">${escapeHtml(item.zh)}</a>`;
    })
    .join("");

  return `
    <header class="site-header">
      <a class="brand" href="/" aria-label="${escapeHtml(profile.name)} home">
        <span>${escapeHtml(profile.displayName || profile.name)}</span>
      </a>
      <nav class="nav" aria-label="Primary navigation">${links}</nav>
      <div class="header-controls" aria-label="Display controls">
        <button class="control-button language-toggle" type="button" data-language-toggle aria-label="Switch language">EN</button>
        <button class="control-button theme-toggle" type="button" data-theme-toggle aria-label="Switch dark theme">☾</button>
      </div>
    </header>
  `;
}
