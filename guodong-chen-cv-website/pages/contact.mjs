import { ContactCard } from "../components/ContactCard.mjs";

export const page = {
  path: "/contact/",
  output: "contact/index.html",
  title: "Contact",
  description: "Contact information for Guodong Chen."
};

export function render(profile) {
  const cards = profile.contact.map((item) => ContactCard({ item })).join("");

  return `
    <section class="page-hero">
      <p class="section-kicker">Contact</p>
      <h1 data-i18n data-zh="联系方式" data-en="Contact">联系方式</h1>
      <p data-i18n data-zh="如果需要完整联系方式，可以在 data/profile.json 中补充邮箱、电话或 LinkedIn。" data-en="Add an email, phone number, or LinkedIn in data/profile.json when you want full contact details shown.">如果需要完整联系方式，可以在 data/profile.json 中补充邮箱、电话或 LinkedIn。</p>
    </section>

    <section class="section">
      <div class="info-grid">${cards}</div>
    </section>
  `;
}
