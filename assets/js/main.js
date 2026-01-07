(() => {
  "use strict";

  const status = document.querySelector("[data-form-status]");
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Dark mode toggle (opcional, suma como tendencia)
  const themeBtn = document.querySelector("[data-theme-toggle]");
  const root = document.documentElement;

  const applyTheme = (theme) => {
    root.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  };

  try {
    const saved = localStorage.getItem("theme");
    if (saved) applyTheme(saved);
  } catch {}

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = root.classList.contains("dark") ? "light" : "dark";
      applyTheme(next);
    });
  }

  // Form UX (sin backend)
  const form = document.querySelector("form");
  if (form && status) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      status.textContent =
        "Formulario listo. Conecta Formspree para producción.";
    });
  }

  // GSAP animations
  const prefersReduced = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)"
  )?.matches;
  if (prefersReduced) return; // Respeta accesibilidad

  if (!window.gsap) return;
  gsap.registerPlugin(window.ScrollTrigger);

  // Hero intro
  gsap.from(".hero__title-big", {
    y: 18,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  gsap.from(".hero__media", {
    y: 18,
    opacity: 0,
    duration: 0.9,
    delay: 0.1,
    ease: "power2.out",
  });

  gsap.from(".hero__lead", {
    y: 10,
    opacity: 0,
    duration: 0.7,
    delay: 0.2,
    ease: "power2.out",
  });

  // Scroll reveal sections
  const revealTargets = [
    "#about .row",
    ".mosaic__item",
    "#works .feature",
    "#works .cardx",
    "#projects .project",
    "#contact .row",
    "#contact .formx",
    "#contact .contact__bar",
  ];

  revealTargets.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });
    });
  });

  // Parallax suave en el featured
  const parallax = document.querySelector("[data-parallax]");
  if (parallax) {
    gsap.to(parallax, {
      scrollTrigger: {
        trigger: parallax,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
      y: -30,
      ease: "none",
    });
  }
})();
