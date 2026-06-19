import { escapeHtml } from "./utils.mjs";

export function ContactCard({ item }) {
  const labelEn = item.labelEn || item.label;
  const valueEn = item.valueEn || item.value;
  const value = item.href
    ? `<a href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer" data-i18n data-zh="${escapeHtml(item.value)}" data-en="${escapeHtml(valueEn)}">${escapeHtml(item.value)}</a>`
    : `<span data-i18n data-zh="${escapeHtml(item.value)}" data-en="${escapeHtml(valueEn)}">${escapeHtml(item.value)}</span>`;

  return `
    <article class="info-item contact-card">
      <span class="chevron">›</span>
      <div>
        <p data-i18n data-zh="${escapeHtml(item.label)}" data-en="${escapeHtml(labelEn)}">${escapeHtml(item.label)}</p>
        <strong>${value}</strong>
      </div>
    </article>
  `;
}
