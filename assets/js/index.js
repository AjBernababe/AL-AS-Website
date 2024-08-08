// Toggle the shadow class based on scroll position
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("navbar-sticky", window.scrollY > 50);
});

// Collapse the navbar
function collapseNavbar() {
  const collapseElement = document.querySelector(".navbar-collapse");
  const bsCollapse =
    bootstrap.Collapse.getInstance(collapseElement) ||
    new bootstrap.Collapse(collapseElement, {
      toggle: false,
    });
  bsCollapse.hide(); // Collapse the navbar
}

// Attach event listeners to nav links and button
document
  .querySelectorAll(".navbar-nav .nav-link, .navbar .btn")
  .forEach((element) => {
    element.addEventListener("click", collapseNavbar);
  });
