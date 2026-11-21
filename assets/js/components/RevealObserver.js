/** Fades in any .reveal element when it enters the viewport. */
export class RevealObserver {
  constructor() {
    this.io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); this.io.unobserve(e.target); }
    }), { threshold: .12 });
  }
  /** Observes new .reveal elements; siblings get a staggered delay. */
  scan() {
    document.querySelectorAll(".reveal:not(.is-in)").forEach(el => {
      const i = [...el.parentElement.children].indexOf(el);
      el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`;
      this.io.observe(el);
    });
  }
}
