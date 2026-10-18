(() => {
  const root = document.documentElement;
  root.dataset.theme = localStorage.getItem("dft-theme") || "dark";

  const updateTheme = () => {
    document.querySelectorAll("[data-theme-toggle]").forEach(btn => {
      btn.textContent = root.dataset.theme === "light" ? "☾" : "☀";
    });
  };
  updateTheme();

  document.querySelectorAll("[data-theme-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
      localStorage.setItem("dft-theme", root.dataset.theme);
      updateTheme();
    });
  });

  const nav = document.querySelector(".nav");
  const menu = document.querySelector(".menu");
  if (menu && nav) {
    menu.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  const reveals = [...document.querySelectorAll(".reveal")];
  root.classList.add("motion");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("visible"));
  }
  setTimeout(() => reveals.forEach(el => el.classList.add("visible")), 1800);

  const progress = document.querySelector(".progress");
  const glow = document.querySelector(".cursor-glow");
  const finePointer = matchMedia("(pointer:fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (finePointer) {
    addEventListener("pointermove", e => {
      if (glow) {
        glow.style.opacity = "1";
        glow.style.transform = `translate(${e.clientX - 260}px,${e.clientY - 260}px)`;
      }
    });

    document.querySelectorAll("[data-tilt]").forEach(card => {
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(1050px) rotateX(${-y * 7}deg) rotateY(${x * 8}deg) translateY(-8px) translateZ(18px)`;
        card.style.setProperty("--hx", `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`);
        card.style.setProperty("--hy", `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`);
      });
      card.addEventListener("pointerleave", () => card.style.transform = "");
    });

    const heroMedia = document.querySelector(".hero-media");
    const heroPhoto = document.querySelector(".hero-photo");
    if (heroMedia && heroPhoto) {
      heroMedia.addEventListener("pointermove", e => {
        const r = heroMedia.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        heroPhoto.style.transform = `rotateY(${-5 + x * 8}deg) rotateX(${2 - y * 6}deg) translate3d(${x * 10}px,${y * 8}px,0)`;
      });
      heroMedia.addEventListener("pointerleave", () => {
        heroPhoto.style.transform = "rotateY(-5deg) rotateX(2deg)";
      });
    }
  }

  const parallax = [...document.querySelectorAll("[data-parallax]")];
  let ticking = false;
  const frame = () => {
    const h = innerHeight;
    const max = Math.max(1, document.documentElement.scrollHeight - h);
    const y = scrollY || 0;
    if (progress) progress.style.width = `${y / max * 100}%`;

    parallax.forEach(el => {
      const r = el.getBoundingClientRect();
      const v = (r.top + r.height / 2 - h / 2) / h;
      const amount = Number(el.dataset.parallax || 18);
      el.style.transform = `translate3d(0,${-v * amount}px,0) scale(1.04)`;
    });
    ticking = false;
  };
  addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(frame);
    }
  }, { passive: true });
  frame();

  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  document.querySelectorAll("img[data-fallback]").forEach(img => {
    img.addEventListener("error", () => {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = "1";
      img.src = img.dataset.fallback;
    });
  });

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const fd = new FormData(form);
      const subject = encodeURIComponent("Divine Future Tech project enquiry — " + fd.get("service"));
      const body = encodeURIComponent(
        "Name: " + fd.get("name") +
        "\nEmail: " + fd.get("email") +
        "\nService: " + fd.get("service") +
        "\n\nProject details:\n" + fd.get("message")
      );
      const status = document.querySelector(".status");
      if (status) status.textContent = "Opening your email app with the project enquiry filled in…";
      location.href = "mailto:hello@divinefuturetech.com?subject=" + subject + "&body=" + body;
    });
  }
})();