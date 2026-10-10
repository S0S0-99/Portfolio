// ---------- Thème clair/sombre ----------
const themeToggle = document.querySelector(".theme-toggle");
const root = document.body;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  if (themeToggle) themeToggle.textContent = theme === "light" ? "🌙" : "☀️";
}

const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(current);
  });
}

// ---------- Menu mobile ----------
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// ---------- Animation d'apparition au scroll ----------
const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => observer.observe(el));


// ---------- Surbrillance navbar ----------

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");
  const currentPath = window.location.pathname.toLowerCase();

  // Fonction pour réinitialiser la classe active sur tous les liens
  function clearActive() {
    navLinks.forEach(link => link.classList.remove("active"));
  }

  // Détection du dossier courant
  const isRealisations = currentPath.includes("realisations");
  const isProcedures = currentPath.includes("procedures");
  const isAlternance = currentPath.includes("alternance");
  const isMainPage = !isRealisations && !isProcedures && !isAlternance;

  if (isMainPage) {
    // --- PAGE D'ACCUEIL RACINE : ScrollSpy au défilement ---
    const sections = document.querySelectorAll("section[id]");

    if (sections.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            clearActive();
            const id = entry.target.getAttribute("id");
            navLinks.forEach(link => {
              const href = link.getAttribute("href");
              if (href && href.includes("#" + id)) {
                link.classList.add("active");
              }
            });
          }
        });
      }, { rootMargin: "-20% 0px -60% 0px" });

      sections.forEach(section => observer.observe(section));
    }
  } else {
    // --- PAGES SECONDAIRES (Procédures, Réalisations, Alternance) ---
    clearActive();

    navLinks.forEach(link => {
      const text = link.textContent.trim().toLowerCase();
      const href = link.getAttribute("href") ? link.getAttribute("href").toLowerCase() : "";

      // Détection basée sur le TEXTE du lien ou le HREF
      if (isProcedures && (text.includes("procédure") || text.includes("procedure") || href.includes("procedure"))) {
        link.classList.add("active");
      } else if (isRealisations && (text.includes("réalisation") || text.includes("realisation") || href.includes("realisation"))) {
        link.classList.add("active");
      } else if (isAlternance && (text.includes("alternance") || href.includes("alternance"))) {
        link.classList.add("active");
      }
    });
  }
});