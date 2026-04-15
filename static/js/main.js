(() => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  const menuLinks = document.querySelectorAll(".menu a");
  const binaryBg = document.querySelector(".binary-bg");
  const contactForm = document.getElementById("contact-form");
  const statusMessage = document.getElementById("form-status");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isExpanded));
      menu.classList.toggle("is-open", !isExpanded);
    });

    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
      });
    });
  }

  const buildBinaryBackground = () => {
    if (!binaryBg || prefersReducedMotion.matches) {
      return;
    }

    const columnCount = window.innerWidth < 780 ? 14 : 24;
    binaryBg.textContent = "";

    for (let index = 0; index < columnCount; index += 1) {
      const column = document.createElement("div");
      column.className = "binary-column";
      column.style.left = `${(index / columnCount) * 100}%`;
      column.style.animationDuration = `${7 + Math.random() * 6}s`;
      column.style.animationDelay = `${Math.random() * 2}s`;
      column.textContent = Array.from({ length: 18 }, () => Math.round(Math.random())).join("\n");
      binaryBg.appendChild(column);
    }
  };

  buildBinaryBackground();
  window.addEventListener("resize", buildBinaryBackground);

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
          headers: { Accept: "application/json" }
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        contactForm.reset();
        statusMessage.textContent = "Thanks! Your message has been sent.";
      } catch (error) {
        statusMessage.textContent = "Message failed to send. Please try again or email directly.";
        statusMessage.classList.add("error");
      }
    });
  }
})();
