import { escapeHtml, tagList } from "./utils.mjs";

export function ProjectCard({ project }) {
  return `
    <article class="project-card">
      <p class="section-kicker" data-i18n data-zh="${escapeHtml(project.type)}" data-en="${escapeHtml(project.typeEn || project.type)}">${escapeHtml(project.type)}</p>
      <h3 data-i18n data-zh="${escapeHtml(project.title)}" data-en="${escapeHtml(project.titleEn || project.title)}">${escapeHtml(project.title)}</h3>
      <p data-i18n data-zh="${escapeHtml(project.description)}" data-en="${escapeHtml(project.descriptionEn || project.description)}">${escapeHtml(project.description)}</p>
      <div class="tag-row">${tagList(project.tags)}</div>
    </article>
  `;
}
