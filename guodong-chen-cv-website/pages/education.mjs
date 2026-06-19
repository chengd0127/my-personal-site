import { escapeHtml, listItems } from "../components/utils.mjs";

export const page = {
  path: "/education/",
  output: "education/index.html",
  title: "Campus Experience",
  description: "Education background for Guodong Chen."
};

export function render(profile) {
  const education = profile.education;

  return `
    <section class="page-hero">
      <p class="section-kicker" data-i18n data-zh="校园经历" data-en="Campus Experience">校园经历</p>
      <h1 data-i18n data-zh="校园经历" data-en="Education">校园经历</h1>
      <p data-i18n data-zh="${escapeHtml(education.degreeZh || education.degree)}，${escapeHtml(education.institution)}。" data-en="${escapeHtml(education.degree)} at ${escapeHtml(education.institution)}.">${escapeHtml(education.degreeZh || education.degree)}，${escapeHtml(education.institution)}。</p>
    </section>

    <section class="section split-section">
      <div>
        <h2>${escapeHtml(education.institution)}</h2>
        <p class="muted" data-i18n data-zh="${escapeHtml(education.statusZh || education.status)} | GPA ${escapeHtml(education.gpa)}" data-en="${escapeHtml(education.status)} | GPA ${escapeHtml(education.gpa)}">${escapeHtml(education.statusZh || education.status)} | GPA ${escapeHtml(education.gpa)}</p>
      </div>
      <ul class="clean-list">${listItems(education.focus)}</ul>
    </section>
  `;
}
