import { Component } from "../core/Component.js";

/** Small data-driven sections. Each class fills one part of the page. */
export class AboutSection extends Component {
  constructor(profile) { super("#about"); this.p = profile; }
  render() {
    document.querySelector("#heroSub").textContent = this.p.tagline;
    document.querySelector("#aboutLead").textContent = this.p.about;
    document.querySelector("#facts").innerHTML = this.p.facts.map(([k, v]) => `<dt>${Component.esc(k)}</dt><dd>${Component.esc(v)}</dd>`).join("");
    document.querySelector("#stats").innerHTML = this.p.stats.map(([n, label, dec = 0]) =>
      `<div class="stat reveal"><b data-count="${n}" data-dec="${dec}">0</b><span class="label">${Component.esc(label)}</span></div>`).join("");
    const words = this.p.skills.map(s => `<span>${Component.esc(s)}</span>`).join("");
    document.querySelector("#marquee").innerHTML = words + words;
    document.querySelector("#skills").innerHTML = this.p.skills.map(s => `<li>${Component.esc(s)}</li>`).join("");
  }
}

export class ActivitySection extends Component {
  constructor(items) { super("#activities"); this.items = items; }
  render() {
    this.root.innerHTML = this.items.map(a => `
      <li class="reveal"><h3>${Component.esc(a.title)}</h3><p>${Component.esc(a.text)}</p>
        <img src="${Component.esc(a.img)}" alt="" loading="lazy"></li>`).join("");
  }
}

export class EducationSection extends Component {
  constructor(items) { super("#education-list"); this.items = items; }
  render() {
    this.root.innerHTML = this.items.map(e => `
      <li class="reveal"><span class="label">${Component.esc(e.years)}</span>
        <h3>${Component.esc(e.school)}</h3><p>${Component.esc(e.text)}</p></li>`).join("");
  }
}

export class CertificateSection extends Component {
  constructor(items) { super("#certs"); this.items = items; }
  render() {
    this.root.innerHTML = this.items.map(c => `
      <a class="cert reveal" href="${Component.esc(c.img)}" data-title="${Component.esc(c.title)}">
        <div class="cert__img"><img src="${Component.esc(c.img)}" alt="" loading="lazy"></div>
        <h3>${Component.esc(c.title)}</h3></a>`).join("");
    this.root.addEventListener("click", e => {
      const a = e.target.closest(".cert"); if (!a) return;
      e.preventDefault(); this.#open(a.getAttribute("href"), a.dataset.title);
    });
  }
  /** Simple lightbox overlay (closes on click or Esc). */
  #open(src, title) {
    const box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML = `<img src="${src}" alt=""><p class="label">${Component.esc(title)} · คลิกเพื่อปิด</p>`;
    const close = () => { box.remove(); removeEventListener("keydown", onKey); };
    const onKey = e => e.key === "Escape" && close();
    box.onclick = close; addEventListener("keydown", onKey);
    document.body.append(box);
  }
}

export class ContactSection extends Component {
  constructor(profile) { super("#mail"); this.p = profile; }
  render() {
    this.root.textContent = this.p.email; this.root.href = `mailto:${this.p.email}`;
    document.querySelector("#phone").textContent = this.p.phone;
    document.querySelector("#addr").textContent = this.p.address;
    document.querySelector("#socials").innerHTML = this.p.socials.map(s => Component.button(s.label, s.url, { small: true, ghost: true })).join("");
  }
}
