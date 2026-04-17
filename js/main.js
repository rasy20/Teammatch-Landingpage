const slamTargets = document.querySelectorAll(".slam-target");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

slamTargets.forEach((el) => observer.observe(el));

const dot = document.getElementById("cursor-dot");

if (dot && window.matchMedia("(pointer: fine)").matches) {
  let mouseX = 0;
  let mouseY = 0;
  let dotX = 0;
  let dotY = 0;
  const speed = 0.18;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const interactives = document.querySelectorAll(
    "a, .btn, button, summary, details",
  );
  interactives.forEach((el) => {
    el.addEventListener("mouseenter", () =>
      document.body.classList.add("cursor-on-link"),
    );
    el.addEventListener("mouseleave", () =>
      document.body.classList.remove("cursor-on-link"),
    );
  });

  function animateDot() {
    dotX += (mouseX - dotX) * speed;
    dotY += (mouseY - dotY) * speed;
    dot.style.left = dotX + "px";
    dot.style.top = dotY + "px";
    requestAnimationFrame(animateDot);
  }

  animateDot();
} else if (dot) {
  dot.style.display = "none";
}

const navToggleBtn = document.getElementById("nav-toggle-btn");
const navbar = document.querySelector(".navbar");

if (navToggleBtn && navbar) {
  navToggleBtn.addEventListener("click", () => {
    navbar.classList.toggle("nav-open");
  });

  const navLinks = document.querySelectorAll(".nav-links a, .nav-cta a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("nav-open");
    });
  });
}
