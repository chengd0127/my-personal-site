import { ProjectCard } from "../components/ProjectCard.mjs";
import { escapeHtml, listItems } from "../components/utils.mjs";

export const page = {
  path: "/projects/",
  output: "projects/index.html",
  title: "Internship Experience",
  description: "Project and internship experience for Guodong Chen."
};

export function render(profile) {
  const cards = profile.projects.map((project) => ProjectCard({ project })).join("");
  const experience = profile.experience[0];

  return `
    <section class="page-hero">
      <p class="section-kicker" data-i18n data-zh="实习经历" data-en="Internship Experience">实习经历</p>
      <h1 data-i18n data-zh="实习经历" data-en="Internship">实习经历</h1>
      <p data-i18n data-zh="${escapeHtml(experience.descriptionZh || experience.description)}" data-en="${escapeHtml(experience.description)}">${escapeHtml(experience.descriptionZh || experience.description)}</p>
    </section>

    <section class="section split-section">
      <div>
        <h2 data-i18n data-zh="${escapeHtml(experience.roleZh || experience.role)}" data-en="${escapeHtml(experience.role)}">${escapeHtml(experience.roleZh || experience.role)}</h2>
        <p class="muted" data-i18n data-zh="${escapeHtml(experience.organization)} | ${escapeHtml(experience.periodZh || experience.period)} | ${escapeHtml(experience.projectZh || experience.project)}" data-en="${escapeHtml(experience.organization)} | ${escapeHtml(experience.period)} | ${escapeHtml(experience.project)}">${escapeHtml(experience.organization)} | ${escapeHtml(experience.periodZh || experience.period)} | ${escapeHtml(experience.projectZh || experience.project)}</p>
      </div>
      <ul class="clean-list">${listItems(experience.highlights)}</ul>
    </section>

    <section class="section">
      <div class="section-row">
        <div>
          <p class="section-kicker" data-i18n data-zh="项目片段" data-en="Selected Work">项目片段</p>
          <h2 data-i18n data-zh="项目片段" data-en="Selected Work">项目片段</h2>
        </div>
      </div>
      <div class="card-grid">${cards}</div>
    </section>
  `;
}
