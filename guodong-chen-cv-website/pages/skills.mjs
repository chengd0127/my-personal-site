import { SkillBar } from "../components/SkillBar.mjs";
import { listItems } from "../components/utils.mjs";

export const page = {
  path: "/skills/",
  output: "skills/index.html",
  title: "Self Evaluation",
  description: "Technical and professional skills for Guodong Chen."
};

export function render(profile) {
  const skills = profile.skills.map((skill) => SkillBar({ skill })).join("");

  return `
    <section class="page-hero">
      <p class="section-kicker" data-i18n data-zh="自我评价" data-en="Self Evaluation">自我评价</p>
      <h1 data-i18n data-zh="自我评价" data-en="Self Evaluation">自我评价</h1>
      <p data-i18n data-zh="围绕电气工程学习、现场执行、维护排查与团队协作持续提升。" data-en="Focused on improving through electrical engineering study, field execution, maintenance troubleshooting, and team collaboration.">围绕电气工程学习、现场执行、维护排查与团队协作持续提升。</p>
    </section>

    <section class="section split-section">
      <div>
        <h2 data-i18n data-zh="个人特点" data-en="Personal Strengths">个人特点</h2>
      </div>
      <ul class="clean-list">${listItems(profile.selfEvaluation)}</ul>
    </section>

    <section class="section skills-panel">
      ${skills}
    </section>
  `;
}
