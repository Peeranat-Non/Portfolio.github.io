/** Thin progress bar showing how far the page is scrolled. */
export class ScrollProgress {
  mount() {
    const bar = document.querySelector("#progress");
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    addEventListener("scroll", update, { passive: true }); update();
  }
}

/** Moves [data-parallax] elements at a fraction of the scroll speed. */
export class Parallax {
  mount() {
    this.items = [...document.querySelectorAll("[data-parallax]")];
    let ticking = false;
    addEventListener("scroll", () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        this.items.forEach(el => { el.style.transform = `translateY(${scrollY * Number(el.dataset.parallax)}px)`; });
        ticking = false;
      });
    }, { passive: true });
  }
}

/** Buttons gently follow the cursor (desktop pointers only). */
export class MagneticButtons {
  mount() {
    if (!matchMedia("(pointer:fine)").matches) return;
    document.addEventListener("pointermove", e => {
      const b = e.target.closest?.(".btn"); if (!b) return;
      const r = b.getBoundingClientRect();
      b.classList.add("is-magnet");
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px, ${(e.clientY - r.top - r.height / 2) * .3}px)`;
    });
    document.addEventListener("pointerout", e => {
      const b = e.target.closest?.(".btn"); if (b) b.style.transform = "";
    });
  }
}

/** Counts [data-count] numbers up when they scroll into view. */
export class CountUp {
  mount() {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return; io.unobserve(e.target); this.#run(e.target);
    }), { threshold: .6 });
    document.querySelectorAll("[data-count]").forEach(el => io.observe(el));
  }
  #run(el) {
    const to = Number(el.dataset.count), dec = Number(el.dataset.dec || 0), t0 = performance.now(), dur = 1500;
    const tick = t => {
      const k = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - k, 4);
      el.textContent = (to * eased).toFixed(dec);
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}
