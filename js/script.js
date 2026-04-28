const menuButton = document.querySelector("#menu-icon");
const menuIcon = menuButton?.querySelector("i");
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("header nav a");
const header = document.querySelector(".header");

if (menuButton && navbar && menuIcon) {
  menuButton.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("active");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuIcon.classList.toggle("bx-menu", !isOpen);
    menuIcon.classList.toggle("bx-x", isOpen);
  });
}

const closeMenu = () => {
  if (!menuButton || !navbar || !menuIcon) {
    return;
  }

  navbar.classList.remove("active");
  menuButton.setAttribute("aria-expanded", "false");
  menuIcon.classList.add("bx-menu");
  menuIcon.classList.remove("bx-x");
};

const setActiveSection = () => {
  const scrollPosition = window.scrollY + 180;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPosition >= top && scrollPosition < bottom) {
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("active", active);
      });
    }
  });
};

window.addEventListener("scroll", () => {
  header?.classList.toggle("sticky", window.scrollY > 20);
  setActiveSection();
  closeMenu();
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Simple reveal animation without third-party dependencies.
const revealElements = document.querySelectorAll(
  ".hero-copy, .hero-visual, .section-heading, .about-card, .journey-card, .services-box, .stack-panel, .portfolio-box, .contact-card, .contact-form"
);

revealElements.forEach((element) => {
  element.setAttribute("data-reveal", "");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealElements.forEach((element) => observer.observe(element));
setActiveSection();
