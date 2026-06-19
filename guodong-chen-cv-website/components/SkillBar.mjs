import { escapeHtml } from "./utils.mjs";

export function SkillBar({ skill }) {
  const level = Math.max(0, Math.min(100, Number(skill.level) || 0));

  return `
    <div class="skill">
      <div class="skill-label">
        <span data-i18n data-zh="${escapeHtml(skill.name)}" data-en="${escapeHtml(skill.nameEn || skill.name)}">${escapeHtml(skill.name)}</span>
        <strong>${level}%</strong>
      </div>
      <div class="skill-track" aria-hidden="true">
        <span style="width: ${level}%"></span>
      </div>
    </div>
  `;
}
