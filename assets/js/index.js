document.addEventListener("DOMContentLoaded", () => {
  AOS.init({ once: true });

  const navbar = document.querySelector(".navbar");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const scrollToTopBtn = document.getElementById("scrollToTop");
  const form = document.getElementById("contactForm");
  const loading = document.getElementById("loading");
  const errorMessage = document.getElementById("errorMessage");
  const sentMessage = document.getElementById("sentMessage");

  // Toggle navbar shadow based on scroll position
  const toggleNavbarShadow = () => {
    if (navbar) {
      navbar.classList.toggle("navbar-sticky", window.scrollY > 100);
    }
  };

  // Collapse the navbar when clicking a nav link or button
  const collapseNavbar = () => {
    const bsCollapse =
      bootstrap.Collapse.getInstance(navbarCollapse) ||
      new bootstrap.Collapse(navbarCollapse, { toggle: false });
    bsCollapse.hide();
  };

  // Update hover effect on nav links based on scroll position
  const updateHoverEffect = () => {
    const scrollPosition = window.scrollY + 100;
    const sections = document.querySelectorAll(".section");
    const links = document.querySelectorAll(".nav-link");

    links.forEach((link) => link.classList.remove("hover-effect"));

    sections.forEach((section, index) => {
      const { offsetTop, offsetHeight } = section;
      const sectionBottom = offsetTop + offsetHeight;

      if (scrollPosition >= offsetTop && scrollPosition < sectionBottom) {
        links[index]?.classList.add("hover-effect");
      }
    });
  };

  // Initial setup for hover effect
  const initialHighlight = () => updateHoverEffect();

  // Handle form submission
  const handleFormSubmit = (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

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
  };

  // Toggle visibility of scroll-to-top button
  const toggleScrollToTopButton = () => {
    scrollToTopBtn.classList.toggle("show", window.scrollY > 100);
  };

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Event listeners
  window.addEventListener("scroll", () => {
    toggleNavbarShadow();
    updateHoverEffect();
    toggleScrollToTopButton();
  });

  window.addEventListener("load", () => {
    initialHighlight();
    toggleScrollToTopButton(); // Initial check for scroll-to-top button visibility
  });

  window.addEventListener("resize", initialHighlight);

  scrollToTopBtn.addEventListener("click", scrollToTop);

  document
    .querySelectorAll(".navbar-nav .nav-link, .navbar .btn")
    .forEach((element) => element.addEventListener("click", collapseNavbar));

  // Navbar background color on collapse
  const navbarElement = document.getElementById("navbar");
  const collapseElement = document.getElementById("navbarText");

  collapseElement.addEventListener("shown.bs.collapse", () =>
    navbarElement.classList.add("bg-black")
  );
  collapseElement.addEventListener("hidden.bs.collapse", () =>
    navbarElement.classList.remove("bg-black")
  );

  // Handle form submission
  form.addEventListener("submit", handleFormSubmit);
});
