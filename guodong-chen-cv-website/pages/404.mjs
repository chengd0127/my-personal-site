import { escapeHtml } from "../components/utils.mjs";

export const page = {
  path: "/404.html",
  output: "404.html",
  title: "Page Not Found",
  description: "Page not found."
};

export function render(profile, site = { path: (value) => value }) {
  return `
    <section class="page-hero not-found">
      <p class="section-kicker">404</p>
      <h1 data-i18n data-zh="页面不存在" data-en="Page not found">页面不存在</h1>
      <p data-i18n data-zh="你访问的页面不存在，返回首页继续浏览。" data-en="The page you are looking for does not exist. Return home to continue browsing.">你访问的页面不存在，返回首页继续浏览。</p>
      <a class="button primary" href="${escapeHtml(site.path("/"))}" data-i18n data-zh="返回首页" data-en="Back to Home">返回首页</a>
    </section>
  `;
}
