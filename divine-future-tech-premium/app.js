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


  // Entire service row toggles its deep details; technologies remain visible.
  document.querySelectorAll(".service-link-card[data-service-url]").forEach(card => {
    card.setAttribute("aria-expanded", card.classList.contains("open") ? "true" : "false");

    const setOpen = open => {
      card.classList.toggle("open", open);
      card.setAttribute("aria-expanded", String(open));
    };
    const toggle = () => setOpen(!card.classList.contains("open"));

    card.addEventListener("click", e => {
      // Explicit Explore links still navigate to the dedicated service page.
      if (e.target.closest("a")) return;
      toggle();
    });
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        if (e.target.closest("a")) return;
        e.preventDefault();
        toggle();
      }
    });
  });

  // Re-play service animations when cards enter from either scroll direction.
  const serviceRows = [...document.querySelectorAll(".service-editorial-row")];
  let previousScrollY = scrollY;
  let scrollDirection = "down";

  addEventListener("scroll", () => {
    const current = scrollY;
    scrollDirection = current >= previousScrollY ? "down" : "up";
    previousScrollY = current;

    const vh = innerHeight || document.documentElement.clientHeight;
    serviceRows.forEach(row => {
      const r = row.getBoundingClientRect();
      const center = r.top + r.height / 2;
      const progress = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
      row.style.setProperty("--scroll-progress", progress.toFixed(3));

      // Lightweight depth/parallax based on distance from viewport center.
      if (finePointer && !reduceMotion && r.bottom > 0 && r.top < vh) {
        const offset = (center - vh / 2) / vh;
        row.style.setProperty("--service-scroll-y", (offset * -10).toFixed(2) + "px");
      }
    });
  }, { passive:true });

  if ("IntersectionObserver" in window && !reduceMotion) {
    const serviceObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const row = entry.target;
        if (entry.isIntersecting) {
          row.classList.remove("service-scroll-out");
          // Re-trigger animation every time it re-enters, including reverse scroll.
          row.classList.remove("service-scroll-in");
          void row.offsetWidth;
          row.classList.add("service-scroll-in");
          row.dataset.lastScrollDirection = scrollDirection;
        } else {
          row.classList.remove("service-scroll-in");
          row.classList.add("service-scroll-out");
        }
      });
    }, { threshold:.16, rootMargin:"-4% 0px -8% 0px" });
    serviceRows.forEach(row => serviceObserver.observe(row));
  } else {
    serviceRows.forEach(row => row.classList.add("service-scroll-in"));
  }

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


  // Cohesive site motion orchestration
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Ambient lighting layer
  if (!document.querySelector(".site-ambient")) {
    const ambient = document.createElement("div");
    ambient.className = "site-ambient";
    ambient.innerHTML = '<span class="ambient-a"></span><span class="ambient-b"></span><span class="ambient-c"></span>';
    document.body.prepend(ambient);
  }

  // Entry / exit page transition
  if (!reduceMotion && !document.querySelector(".site-transition")) {
    const transition = document.createElement("div");
    transition.className = "site-transition entry";
    document.body.appendChild(transition);
    setTimeout(() => transition.classList.remove("entry"), 900);

    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return;
      if (/^https?:\/\//i.test(href) && !href.includes(location.host)) return;
      link.addEventListener("click", e => {
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || link.target === "_blank") return;
        e.preventDefault();
        transition.classList.add("leaving");
        setTimeout(() => { location.href = href; }, 520);
      });
    });
  }

  // Main entrance timing
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add("site-ready")));

  // Header scroll state
  const header = document.querySelector(".header");
  const updateHeader = () => header?.classList.toggle("scrolled", scrollY > 18);
  addEventListener("scroll", updateHeader, { passive:true });
  updateHeader();

  // Add image-mask reveals to major visual containers.
  const imageContainers = document.querySelectorAll(
    ".hero-photo,.page-photo,.editorial-image,.work-media,.bento-media,.service-editorial-media,.service-hero-photo"
  );
  imageContainers.forEach(el => el.classList.add("image-reveal"));

  if ("IntersectionObserver" in window && !reduceMotion) {
    const imageObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("image-visible");
          imageObserver.unobserve(entry.target);
        }
      });
    }, { threshold:.12, rootMargin:"0px 0px -4% 0px" });
    imageContainers.forEach(el => imageObserver.observe(el));
  } else {
    imageContainers.forEach(el => el.classList.add("image-visible"));
  }

  // Stagger children inside important groups.
  const staggerGroups = document.querySelectorAll(
    ".bento,.work-grid,.process,.faq,.service-editorial-list,.service-scope-grid,.deliverables-grid,.service-nav-grid,.feature-list,.trust-grid,.methods"
  );
  const staggerItems = [];
  staggerGroups.forEach(group => {
    [...group.children].forEach((child,index) => {
      child.setAttribute("data-stagger-item","");
      child.style.setProperty("--stagger", Math.min(index * 75, 450) + "ms");
      staggerItems.push(child);
    });
  });

  if ("IntersectionObserver" in window && !reduceMotion) {
    const staggerObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("stagger-visible");
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold:.09, rootMargin:"0px 0px -4% 0px" });
    staggerItems.forEach(el => staggerObserver.observe(el));
  } else {
    staggerItems.forEach(el => el.classList.add("stagger-visible"));
  }

  // Ambient follows pointer subtly on large screens.
  if (finePointer && !reduceMotion) {
    const ambient = document.querySelector(".site-ambient");
    addEventListener("pointermove", e => {
      if (!ambient) return;
      const x = (e.clientX / innerWidth - .5) * 12;
      const y = (e.clientY / innerHeight - .5) * 10;
      ambient.style.transform = "translate3d(" + x + "px," + y + "px,0)";
    }, { passive:true });
  }


  // Premium homepage hero depth
  const premiumHero = document.querySelector("[data-hero-premium]");
  if (premiumHero && finePointer && !reduceMotion) {
    const browser = premiumHero.querySelector(".hero-browser");
    const floats = premiumHero.querySelectorAll(".hero-float-card");
    premiumHero.addEventListener("pointermove", e => {
      const r = premiumHero.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-.5;
      const y = (e.clientY-r.top)/r.height-.5;
      if (browser) browser.style.transform =
        "rotateY(" + (-6 + x*8) + "deg) rotateX(" + (2-y*6) + "deg) translate3d(" + (x*11) + "px," + (y*9) + "px,18px)";
      floats.forEach((el,i) => {
        const depth = 9 + i*4;
        el.style.translate = (x*depth) + "px " + (y*depth*.7) + "px";
      });
    });
    premiumHero.addEventListener("pointerleave", () => {
      if (browser) browser.style.transform = "";
      floats.forEach(el => el.style.translate = "");
    });
  }

})();