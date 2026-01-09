// ===== Helpers =====
const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// ===== Cursor (solo desktop) =====
const cursor = document.querySelector(".cursor");
if (!prefersReduced && cursor && window.matchMedia("(hover: hover)").matches) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.top = `${e.pageY - 15}px`;
    cursor.style.left = `${e.pageX - 15}px`;
  });
} else if (cursor) {
  cursor.style.display = "none";
}

// ===== Sticky header =====
const header = document.querySelector(".site-header");
const onScrollHeader = () => {
  if (!header) return;
  header.classList.toggle("sticky", window.scrollY > 60);
};
window.addEventListener("scroll", onScrollHeader, { passive: true });
onScrollHeader();

// ===== Back to top =====
const toTopBtn = document.querySelector(".ir-arriba");
const onScrollTopBtn = () => {
  if (!toTopBtn) return;
  toTopBtn.classList.toggle("is-visible", window.scrollY > 400);
};
window.addEventListener("scroll", onScrollTopBtn, { passive: true });
onScrollTopBtn();

toTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
});

// ===== Año en footer =====
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

// ===== Cerrar menú (Bootstrap collapse) al hacer click en un link =====
const mainNav = document.getElementById("mainNav");
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (!mainNav?.classList.contains("show")) return;
    const collapse = bootstrap.Collapse.getOrCreateInstance(mainNav);
    collapse.hide();
  });
});

// ===== GSAP: animación sencilla (ScrollTrigger) + reduce motion =====
(() => {
  if (prefersReduced) return;
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  const targets = [".behind-gems__wrap", ".section-history", "#footer"];

  targets.forEach((selector) => {
    gsap.utils.toArray(selector).forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 18,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });
  });
})();
