import { ProjectCard } from "../components/ProjectCard.mjs";
import { SkillBar } from "../components/SkillBar.mjs";
import { escapeHtml, listItems } from "../components/utils.mjs";

export const page = {
  path: "/",
  output: "index.html",
  title: "Home",
  description: "Guodong Chen CV portfolio homepage."
};

function infoGrid(items = []) {
  return items
    .map(
      (item) => `
        <article class="info-item">
          <span class="chevron">›</span>
          <div>
            <p data-i18n data-zh="${escapeHtml(item.label)}" data-en="${escapeHtml(item.labelEn || item.label)}">${escapeHtml(item.label)}</p>
            <strong data-i18n data-zh="${escapeHtml(item.value)}" data-en="${escapeHtml(item.valueEn || item.value)}">${escapeHtml(item.value)}</strong>
          </div>
        </article>
      `
    )
    .join("");
}

export function render(profile) {
  const experience = profile.experience[0];
  const projectCards = profile.projects.slice(0, 2).map((project) => ProjectCard({ project })).join("");
  const skills = profile.skills.slice(0, 4).map((skill) => SkillBar({ skill })).join("");

  return `
    <section class="hero">
      <img class="hero-avatar" src="${escapeHtml(profile.avatar)}" alt="${escapeHtml(profile.name)} avatar" width="340" height="340">
      <h1>${escapeHtml(profile.displayName || profile.name)}</h1>
      <h2 data-i18n data-zh="${escapeHtml(profile.titleZh || profile.title)}" data-en="${escapeHtml(profile.title)}">${escapeHtml(profile.titleZh || profile.title)}</h2>
      <p data-i18n data-zh="${escapeHtml(profile.taglineZh || profile.tagline)}" data-en="${escapeHtml(profile.tagline)}">${escapeHtml(profile.taglineZh || profile.tagline)}</p>
      <div class="hero-actions">
        <a class="button primary" href="#about" data-i18n data-zh="关于我" data-en="About">关于我</a>
        <a class="button secondary" href="/projects/" data-i18n data-zh="实习经历" data-en="Experience">实习经历</a>
      </div>
    </section>

    <section class="section about-section" id="about">
      <div class="section-title">
        <h2 data-i18n data-zh="关于我" data-en="About Me">关于我</h2>
      </div>
      <div class="about-layout">
        <img class="about-photo" src="${escapeHtml(profile.portrait || profile.avatar)}" alt="${escapeHtml(profile.name)} portrait" width="560" height="520">
        <div class="about-content">
          <h3 class="about-subtitle">
            <span class="accent-word" data-i18n data-zh="电气工程" data-en="Engineering">电气工程</span>
            <span data-i18n data-zh="学习与现场系统支持" data-en="Study and Practical System Support">学习与现场系统支持</span>
          </h3>
          <p class="muted" data-i18n data-zh="${escapeHtml(profile.aboutLead)}" data-en="${escapeHtml(profile.aboutLeadEn || profile.aboutLead)}">${escapeHtml(profile.aboutLead)}</p>
          <div class="info-grid">${infoGrid(profile.personalInfo)}</div>
        </div>
      </div>
    </section>

    <section class="section split-section" id="education">
      <div>
        <p class="section-kicker" data-i18n data-zh="校园经历" data-en="Campus Experience">校园经历</p>
        <h2 data-i18n data-zh="校园经历" data-en="Education">校园经历</h2>
        <p class="muted" data-i18n data-zh="${escapeHtml(profile.education.statusZh || profile.education.status)}，${escapeHtml(profile.education.institution)}，GPA ${escapeHtml(profile.education.gpa)}。" data-en="${escapeHtml(profile.education.status)} at ${escapeHtml(profile.education.institution)}. GPA ${escapeHtml(profile.education.gpa)}.">${escapeHtml(profile.education.statusZh || profile.education.status)}，${escapeHtml(profile.education.institution)}，GPA ${escapeHtml(profile.education.gpa)}。</p>
      </div>
      <ul class="clean-list">${listItems(profile.education.focus)}</ul>
    </section>

    <section class="section split-section" id="internship">
      <div>
        <p class="section-kicker" data-i18n data-zh="实习经历" data-en="Internship Experience">实习经历</p>
        <h2 data-i18n data-zh="实习经历" data-en="Internship">实习经历</h2>
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
        <a class="text-link" href="/projects/" data-i18n data-zh="查看全部" data-en="View all">查看全部</a>
      </div>
      <div class="card-grid">${projectCards}</div>
    </section>

    <section class="section split-section" id="evaluation">
      <div>
        <p class="section-kicker" data-i18n data-zh="自我评价" data-en="Self Evaluation">自我评价</p>
        <h2 data-i18n data-zh="自我评价" data-en="Self Evaluation">自我评价</h2>
      </div>
      <div class="skills-panel">${skills}</div>
    </section>

    <section class="section opportunity-section">
      <p class="section-kicker" data-i18n data-zh="开放机会" data-en="Open Opportunities">开放机会</p>
      <h2 class="opportunity-title" data-i18n data-zh="${escapeHtml(profile.aboutCallout)}" data-en="${escapeHtml(profile.aboutCalloutEn || profile.aboutCallout)}">${escapeHtml(profile.aboutCallout)}</h2>
      <div class="opportunity-actions">
        <a class="button primary" href="/contact/" data-i18n data-zh="联系我" data-en="Contact Me">联系我</a>
        <a class="button secondary" href="mailto:davchen66@gmail.com">davchen66@gmail.com</a>
      </div>
    </section>
  `;
}
