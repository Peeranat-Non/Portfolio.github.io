import { Component } from "../core/Component.js";

/** Renders GitHub projects as a bordered grid with language filters. */
export class ProjectGallery extends Component {
  constructor(service, githubUrl, images = {}) {
    super("#projectGrid");
    this.service = service;
    this.githubUrl = githubUrl;
    this.images = images;
    this.filtersRoot = document.querySelector("#filters");
    this.projects = [];
    this.active = "All";
  }

  async render() {
    this.root.innerHTML = Array(3).fill('<div class="card skeleton"></div>').join("");
    try {
      this.projects = await this.service.fetchProjects();
    } catch (e) {
      console.warn(e);
      this.projects = [];
    }
    this.#renderFilters();
    this.#renderCards();
  }

  #languages() {
    return ["All", ...new Set(this.projects.map(p => p.language).filter(Boolean))];
  }

  #renderFilters() {
    this.filtersRoot.innerHTML = this.projects.length ? this.#languages()
      .map(l => `<button class="chip ${l === this.active ? "is-on" : ""}" data-lang="${Component.esc(l)}">${Component.esc(l)}</button>`).join("") : "";
    this.filtersRoot.onclick = e => {
      const b = e.target.closest(".chip"); if (!b) return;
      this.active = b.dataset.lang;
      this.#renderFilters(); this.#renderCards();
    };
  }

  #renderCards() {
    const list = this.projects.filter(p => this.active === "All" || p.language === this.active);
    if (!list.length) {
      this.root.innerHTML = `<div class="empty">ยังโหลดโปรเจกต์ไม่ได้ในตอนนี้ — ดูทั้งหมดได้ที่ <a href="${this.githubUrl}" target="_blank" rel="noopener"><u>GitHub</u></a></div>`;
      return;
    }
    const tags = (arr, cls = "") => arr.map(t => `<span class="tag ${cls}">${Component.esc(t)}</span>`).join("") || "—";
    this.root.innerHTML = list.map((p, i) => `
      <article class="proj reveal">
        <div class="proj__media">
          <div class="proj__ph">${Component.esc(p.name[0].toUpperCase())}</div>
          <img data-srcs="${Component.esc(JSON.stringify(this.#imageCandidates(p)))}" alt="" loading="lazy" decoding="async">
        </div>
        <div class="proj__body">
          <div class="proj__top"><span class="label">${String(i + 1).padStart(2, "0")}</span><span class="label">${p.year}</span></div>
          <h3>${Component.esc(p.title)}</h3>
          <p>${Component.esc(p.summary)}</p>
          <dl class="meta">
            <dt class="label">ภาษา</dt><dd>${tags([].concat(p.language || []), "tag--lang")}</dd>
            <dt class="label">เครื่องมือ</dt><dd>${tags(p.tools)}</dd>
          </dl>
          <div class="proj__actions">
            ${Component.button("Source Code", p.url, { small: true })}
            ${p.homepage ? Component.button("Live Demo", p.homepage, { small: true, ghost: true }) : ""}
          </div>
        </div>
      </article>`).join("");
    this.#bindImages();
    document.dispatchEvent(new CustomEvent("rendered"));
  }

  /** Priority: images{} in content.js -> assets/img/projects/<repo>.(jpg|png|webp) -> GitHub preview. */
  #imageCandidates(p) {
    const base = `assets/img/projects/${encodeURIComponent(p.name)}`;
    return [this.images[p.name], `${base}.jpg`, `${base}.png`, `${base}.webp`, p.image].filter(Boolean);
  }

  /** Tries each candidate in order; removes the <img> (showing the letter placeholder) if all fail. */
  #bindImages() {
    this.root.querySelectorAll("img[data-srcs]").forEach(img => {
      const list = JSON.parse(img.dataset.srcs);
      let i = 0;
      img.addEventListener("error", () => { i += 1; i < list.length ? (img.src = list[i]) : img.remove(); });
      img.src = list[0];
    });
  }
}
