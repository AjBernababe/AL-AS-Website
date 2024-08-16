document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    once: true, // Animation will only happen once
  });

  const navbar = document.querySelector(".navbar");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const scrollToTopBtn = document.getElementById("scrollToTop");
  const form = document.getElementById("contactForm");
  const loading = document.getElementById("loading");
  const errorMessage = document.getElementById("errorMessage");
  const sentMessage = document.getElementById("sentMessage");

  const toggleNavbarShadow = () => {
    if (navbar) {
      navbar.classList.toggle("navbar-sticky", window.scrollY > 100);
    }
  };

  const collapseNavbar = () => {
    const bsCollapse =
      bootstrap.Collapse.getInstance(navbarCollapse) ||
      new bootstrap.Collapse(navbarCollapse, { toggle: false });
    bsCollapse.hide();
  };

  const updateHoverEffect = () => {
    const scrollPosition = window.scrollY + 100;
    const sections = document.querySelectorAll(".section");
    const links = document.querySelectorAll(".nav-link");

    links.forEach((link) => link.classList.remove("hover-effect"));

    sections.forEach((section, index) => {
      const { offsetTop: sectionTop, offsetHeight: sectionHeight } = section;
      const sectionBottom = sectionTop + sectionHeight;

      console.log(sections, index, section, sectionTop, sectionHeight);

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        links[index]?.classList.add("hover-effect");
      }
    });
  };

  const initialHighlight = () => {
    updateHoverEffect(); // Call the update function to set the initial highlight
  };

  // Run the initialHighlight function when the page loads
  window.addEventListener("load", initialHighlight);

  // Update the hover effect as the user scrolls
  window.addEventListener("scroll", updateHoverEffect);

  const toggleScrollToTopButton = () => {
    scrollToTopBtn.classList.toggle("show", window.scrollY > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add("was-validated");
    } else {
      event.preventDefault();
      const formData = new FormData(form);

      loading.classList.remove("d-none");
      errorMessage.classList.add("d-none");
      sentMessage.classList.add("d-none");

      fetch("/", { method: "POST", body: formData })
        .then((response) => {
          if (response.ok) {
            form.reset();
            loading.classList.add("d-none");
            sentMessage.classList.remove("d-none");
            form.classList.remove("was-validated");
          } else {
            throw new Error("Form submission failed.");
          }
        })
        .catch(() => {
          loading.classList.add("d-none");
          errorMessage.textContent =
            "There was an error submitting your form. Please try again.";
          errorMessage.classList.remove("d-none");
        });
    }
  });

  window.addEventListener("scroll", () => {
    toggleNavbarShadow();
    updateHoverEffect();
    toggleScrollToTopButton();
  });

  document
    .querySelectorAll(".navbar-nav .nav-link, .navbar .btn")
    .forEach((element) => element.addEventListener("click", collapseNavbar));

  window.addEventListener("load", initialHighlight);
  window.addEventListener("resize", initialHighlight);

  scrollToTopBtn.addEventListener("click", scrollToTop);

  // Initial visibility check for scroll-to-top button
  toggleScrollToTopButton();

  for (let i = 1; i < 16; i++) {
    const imageSrc = "/assets/images/products/" + i + ".png";
    const altText = "Slide " + i;

    const indicator = document.createElement("button");
    indicator.type = "button";
    indicator.setAttribute("data-bs-target", "#carouselExampleCaptions");
    indicator.setAttribute("data-bs-slide-to", i);
    indicator.setAttribute("aria-label", `Slide ${i + 1}`);

    const carouselItem = document.createElement("div");
    carouselItem.className = "carousel-item";

    // Create an image element
    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = altText;

    // Append image to the carousel item
    carouselItem.appendChild(img);

    // Append carousel item to the carousel-inner
    document.querySelector(".carousel-indicators").appendChild(indicator);
    document.querySelector(".carousel-inner").appendChild(carouselItem);
  }
});
