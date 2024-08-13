// Toggle navbar shadow based on scroll position
const toggleNavbarShadow = () => {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.classList.toggle("navbar-sticky", window.scrollY > 100);
  }
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
  const firstSection = document.querySelector(".section");
  const firstLink = document.querySelector(".nav-link");

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

// Scroll to Top Button functionality
document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopBtn = document.getElementById("scrollToTop");

  const toggleVisibility = () => {
    scrollToTopBtn.classList.toggle("show", window.scrollY > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  scrollToTopBtn.addEventListener("click", scrollToTop);
  window.addEventListener("scroll", toggleVisibility);

  // Initial visibility check
  toggleVisibility();
});

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    var form = event.target;
    var formData = new FormData(form);
    var loading = document.getElementById("loading");
    var errorMessage = document.getElementById("errorMessage");
    var sentMessage = document.getElementById("sentMessage");

    // Reset messages
    loading.classList.remove("d-none");
    errorMessage.classList.add("d-none");
    sentMessage.classList.add("d-none");

    fetch("/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          form.reset(); // Reset form fields
          loading.classList.add("d-none"); // Hide loading indicator
          sentMessage.classList.remove("d-none"); // Show success message
        } else {
          throw new Error("Form submission failed.");
        }
      })
      .catch((error) => {
        loading.classList.add("d-none"); // Hide loading indicator
        errorMessage.textContent =
          "There was an error submitting your form. Please try again.";
        errorMessage.classList.remove("d-none"); // Show error message
      });
  });

(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
