/** Base class: every UI piece owns one DOM root and a render() method. */
export class Component {
  constructor(selector) {
    this.root = document.querySelector(selector);
  }
  /** Escape text before putting it in innerHTML. */
  static esc(v = "") {
    return String(v).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  /** Reusable pill button markup. */
  static button(label, href, { small = false, ghost = false, arrow = "↗" } = {}) {
    const cls = ["btn", small && "btn--sm", ghost && "btn--ghost"].filter(Boolean).join(" ");
    return `<a class="${cls}" href="${Component.esc(href)}" target="_blank" rel="noopener">${Component.esc(label)}<span class="btn__dot">${arrow}</span></a>`;
  }
  render() { throw new Error("render() must be implemented"); }
  mount() { if (this.root) this.render(); return this; }
}
