import { escapeHtml } from "./utils.mjs";

export function Footer({ profile }) {
  const year = new Date().getFullYear();

  return `
    <footer class="site-footer">
      <p>
        &copy; ${year} ${escapeHtml(profile.name)}.
        <span data-i18n data-zh="轻量静态个人网站。" data-en="Built as a lightweight static CV website.">轻量静态个人网站。</span>
      </p>
    </footer>
  `;
}
