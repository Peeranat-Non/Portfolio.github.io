import { Component } from "../core/Component.js";

export class Navbar extends Component {
  constructor(links, brand) { super("#navbar"); this.links = links; this.brand = brand; }
  render() {
    this.root.innerHTML = `<a class="nav__logo" href="#hero">${Component.esc(this.brand)}</a>
      <ul>${this.links.map(l => `<li><a href="#${l.id}">${Component.esc(l.label)}</a></li>`).join("")}</ul>`;
    let last = 0;
    addEventListener("scroll", () => {
      const y = scrollY;
      this.root.classList.toggle("is-solid", y > 40);
      this.root.classList.toggle("is-hidden", y > last && y > 320); // hide on scroll down, show on scroll up
      last = y;
    }, { passive: true });
    this.#trackActive();
  }
  #trackActive() {
    const anchors = [...this.root.querySelectorAll("li a")];
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) anchors.forEach(a => a.classList.toggle("is-active", a.hash === `#${e.target.id}`));
    }), { rootMargin: "-45% 0px -50% 0px" });
    this.links.forEach(l => { const s = document.getElementById(l.id); s && io.observe(s); });
  }
}
