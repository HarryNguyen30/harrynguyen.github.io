(() => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  const menuLinks = document.querySelectorAll(".menu a");
  const contactForm = document.getElementById("contact-form");
  const statusMessage = document.getElementById("form-status");

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
