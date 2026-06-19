export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function localizedText(zh = "", en = zh) {
  return `<span data-i18n data-zh="${escapeHtml(zh)}" data-en="${escapeHtml(en)}">${escapeHtml(zh)}</span>`;
}

export function listItems(items = []) {
  return items
    .map((item) => {
      if (item && typeof item === "object") {
        const zh = item.zh ?? item.en ?? "";
        const en = item.en ?? item.zh ?? "";
        return `<li data-i18n data-zh="${escapeHtml(zh)}" data-en="${escapeHtml(en)}">${escapeHtml(zh)}</li>`;
      }

      return `<li>${escapeHtml(item)}</li>`;
    })
    .join("");
}

export function tagList(tags = []) {
  return tags
    .map((tag) => {
      if (tag && typeof tag === "object") {
        const zh = tag.zh ?? tag.en ?? "";
        const en = tag.en ?? tag.zh ?? "";
        return `<span class="tag" data-i18n data-zh="${escapeHtml(zh)}" data-en="${escapeHtml(en)}">${escapeHtml(zh)}</span>`;
      }

      return `<span class="tag">${escapeHtml(tag)}</span>`;
    })
    .join("");
}
