// Toggle navbar shadow based on scroll position
const toggleNavbarShadow = () => {
  document
    .querySelector(".navbar")
    ?.classList.toggle("navbar-sticky", window.scrollY > 50);
};

// Collapse the navbar
const collapseNavbar = () => {
  const collapseElement = document.querySelector(".navbar-collapse");
  const bsCollapse =
    bootstrap.Collapse.getInstance(collapseElement) ||
    new bootstrap.Collapse(collapseElement, { toggle: false });
  bsCollapse.hide();
};

// Update hover effect based on scroll position
const updateHoverEffect = () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const sections = document.querySelectorAll(".section");
  const links = document.querySelectorAll(".nav-link");

  links.forEach((link) => link.classList.remove("hover-effect"));

  sections.forEach((section, index) => {
    const { offsetTop: sectionTop, offsetHeight: sectionHeight } = section;
    const sectionBottom = sectionTop + sectionHeight;

    if (scrollPosition > sectionTop && scrollPosition < sectionBottom) {
      links[index]?.classList.add("hover-effect");
    }
  });
};

// Apply initial hover effect to the first section if in view
const initialHighlight = () => {
  const [firstSection] = document.querySelectorAll(".section");
  const [firstLink] = document.querySelectorAll(".nav-link");

  if (firstSection && firstLink) {
    const { offsetTop: sectionTop, offsetHeight: sectionHeight } = firstSection;
    const sectionBottom = sectionTop + sectionHeight;
    firstLink.classList.toggle(
      "hover-effect",
      window.scrollY + window.innerHeight > sectionTop &&
        window.scrollY + window.innerHeight < sectionBottom
    );
  }
};

// Attach event listeners
window.addEventListener("scroll", () => {
  toggleNavbarShadow();
  updateHoverEffect();
});
document
  .querySelectorAll(".navbar-nav .nav-link, .navbar .btn")
  .forEach((element) => element.addEventListener("click", collapseNavbar));
window.addEventListener("load", initialHighlight);
window.addEventListener("resize", initialHighlight);

// Initial highlight update
initialHighlight();

// script.js
document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopBtn = document.getElementById("scrollToTop");

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      // Adjust the scroll threshold as needed
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  scrollToTopBtn.addEventListener("click", scrollToTop);
  window.addEventListener("scroll", toggleVisibility);

  // Initial visibility check
  toggleVisibility();
});
