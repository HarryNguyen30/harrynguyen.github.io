(() => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  const menuLinks = document.querySelectorAll(".menu a");
  const contactForm = document.getElementById("contact-form");
  const statusMessage = document.getElementById("form-status");
  const sectionIds = ["home", "about", "skills", "projects", "contact"];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isExpanded));
      menu.classList.toggle("is-open", !isExpanded);
      document.body.style.overflow = !isExpanded ? "hidden" : "";
    });

    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  const revealNodes = document.querySelectorAll(".reveal");
  if (reduceMotion) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealNodes.forEach((node) => revealObserver.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
  }

  const navByHash = new Map(
    Array.from(menuLinks)
      .filter((link) => link.hash)
      .map((link) => [link.hash.slice(1), link])
  );

  const setActiveNav = (id) => {
    menuLinks.forEach((link) => link.classList.remove("is-active"));
    const active = navByHash.get(id);
    if (active) active.classList.add("is-active");
  };

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveNav(visible.target.id);
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: "-20% 0px -45% 0px" }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
  }

  if (contactForm && statusMessage) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      statusMessage.classList.remove("error");
      statusMessage.textContent = "Sending...";

      const formData = new FormData(contactForm);
      const endpoint = contactForm.getAttribute("action");

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        contactForm.reset();
        statusMessage.textContent = "Thanks! Your message has been sent.";
      } catch (error) {
        statusMessage.textContent =
          "Message failed to send. Please try again or email directly.";
        statusMessage.classList.add("error");
      }
    });
  }
})();
