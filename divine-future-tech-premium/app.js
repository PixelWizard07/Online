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

  // Site-wide 3D interaction system
  if (finePointer) {
    const depthSelectors = [
      ".bento-card",".work-card",".step",".trust-card",".feature",".panel",
      ".faq details",".method",".cta-box",".editorial-image",".page-photo"
    ];
    const depthElements = [...document.querySelectorAll(depthSelectors.join(","))];

    depthElements.forEach(el => {
      el.dataset.depthCard = "1";
      el.addEventListener("pointermove", e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const x = px - 0.5;
        const y = py - 0.5;

        el.style.setProperty("--hx", (px * 100).toFixed(1) + "%");
        el.style.setProperty("--hy", (py * 100).toFixed(1) + "%");

        // Cards with data-tilt already have their own stronger transform.
        if (!el.hasAttribute("data-tilt")) {
          const strength = el.matches(".editorial-image,.page-photo,.cta-box") ? 4.2 : 5.5;
          el.style.transform =
            "perspective(1050px) rotateX(" + (-y * strength) + "deg) rotateY(" + (x * strength) +
            "deg) translateY(-7px) translateZ(14px)";
        }
      });
      el.addEventListener("pointerleave", () => {
        if (!el.hasAttribute("data-tilt")) el.style.transform = "";
      });
    });

    // Magnetic buttons
    document.querySelectorAll(".btn").forEach(btn => {
      btn.addEventListener("pointermove", e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform =
          "perspective(650px) translate3d(" + (x * 0.10) + "px," + (y * 0.13) +
          "px,22px) rotateX(" + (-y * 0.05) + "deg) rotateY(" + (x * 0.05) + "deg) scale(1.025)";
      });
      btn.addEventListener("pointerleave", () => btn.style.transform = "");
    });

    // Layered image movement within cards
    document.querySelectorAll(".bento-card,.work-card").forEach(card => {
      const img = card.querySelector("img");
      if (!img) return;
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        img.style.transform =
          "scale(1.075) translate3d(" + (x * -10) + "px," + (y * -8) + "px,14px)";
      });
      card.addEventListener("pointerleave", () => img.style.transform = "");
    });
  }


  // Service cards open their dedicated pages.
  document.querySelectorAll(".service-link-card[data-service-url]").forEach(card => {
    const open = () => location.href = card.dataset.serviceUrl;
    card.addEventListener("click", e => {
      if (e.target.closest("a,button")) return;
      open();
    });
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });

  if (finePointer) {
    document.querySelectorAll(".deliverable-card,.service-nav-card").forEach(card => {
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--hx", (((e.clientX-r.left)/r.width)*100).toFixed(1) + "%");
        card.style.setProperty("--hy", (((e.clientY-r.top)/r.height)*100).toFixed(1) + "%");
      });
    });
  }


  // Extra service-page motion: image parallax inside editorial service rows.
  if (finePointer) {
    document.querySelectorAll(".service-editorial-row").forEach(row => {
      const image = row.querySelector(".service-editorial-media img");
      if (!image) return;
      row.addEventListener("pointermove", e => {
        const r = row.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        row.style.setProperty("--hx", (px * 100).toFixed(1) + "%");
        row.style.setProperty("--hy", (py * 100).toFixed(1) + "%");
        const x = px - .5;
        const y = py - .5;
        image.style.transform =
          "scale(1.075) translate3d(" + (x * -12) + "px," + (y * -9) + "px,16px)";
      });
      row.addEventListener("pointerleave", () => {
        image.style.transform = "";
      });
    });
  }

})();