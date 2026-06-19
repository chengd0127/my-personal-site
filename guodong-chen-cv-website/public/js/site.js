(() => {
  const root = document.documentElement;
  const languageToggle = document.querySelector("[data-language-toggle]");
  const themeToggle = document.querySelector("[data-theme-toggle]");

  const getStoredValue = (key, fallback) => {
    try {
      return localStorage.getItem(key) || fallback;
    } catch (_) {
      return fallback;
    }
  };

  const storeValue = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (_) {}
  };

  const applyLanguage = (lang) => {
    const safeLang = lang === "en" ? "en" : "zh";
    root.dataset.lang = safeLang;
    root.lang = safeLang === "zh" ? "zh-CN" : "en";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = element.dataset[safeLang];
      if (typeof value === "string") element.textContent = value;
    });

    if (languageToggle) {
      languageToggle.textContent = safeLang === "zh" ? "EN" : "中";
      languageToggle.setAttribute(
        "aria-label",
        safeLang === "zh" ? "Switch to English" : "切换到中文"
      );
    }

    storeValue("cv-lang", safeLang);
  };

  const applyTheme = (theme) => {
    const safeTheme = theme === "dark" ? "dark" : "light";
    root.dataset.theme = safeTheme;

    if (themeToggle) {
      themeToggle.textContent = safeTheme === "dark" ? "☼" : "☾";
      themeToggle.setAttribute(
        "aria-label",
        safeTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
      themeToggle.setAttribute("aria-pressed", String(safeTheme === "dark"));
    }

    storeValue("cv-theme", safeTheme);
  };

  languageToggle?.addEventListener("click", () => {
    applyLanguage(root.dataset.lang === "en" ? "zh" : "en");
  });

  themeToggle?.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  applyLanguage(getStoredValue("cv-lang", root.dataset.lang || "zh"));
  applyTheme(getStoredValue("cv-theme", root.dataset.theme || "light"));
})();
