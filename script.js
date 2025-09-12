const themeToggle = document.getElementById("theme-toggle");

const emailIcon = document.getElementById("icon-email");
const githubIcon = document.getElementById("icon-github");
const linkedinIcon = document.getElementById("icon-linkedin");
const xIcon = document.getElementById("icon-x");
const contactForm = document.getElementById("contact-form");

const savedTheme = localStorage.getItem("theme") || "dark";
document.body.classList.add(savedTheme);
themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
updateIcons(savedTheme);

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");

  const newTheme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", newTheme);
  themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
  updateIcons(newTheme);
});

function updateIcons(theme) {
  if (theme === "dark") {
    emailIcon.src = "icons/email-light.png";
    githubIcon.src = "icons/github-light.png";
    linkedinIcon.src = "icons/linkedin-light.png";
    xIcon.src = "icons/x-light.png";
  } else {
    emailIcon.src = "icons/email-dark.png";
    githubIcon.src = "icons/github-dark.png";
    linkedinIcon.src = "icons/linkedin-dark.png";
    xIcon.src = "icons/x-dark.png";
  }
}

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const action = contactForm.getAttribute("action");

    try {
      const response = await fetch(action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        alert("✅ Thanks! Your message has been sent.");
        contactForm.reset();
      } else {
        alert("❌ Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("⚠️ Network error. Please check your connection.");
    }
  });
}

const toggleBtn = document.getElementById("toggle-layout");
const cardLayout = document.getElementById("experience-cards");
const timelineLayout = document.getElementById("experience-timeline");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    cardLayout.classList.toggle("active");
    timelineLayout.classList.toggle("active");

    if (timelineLayout.classList.contains("active")) {
      toggleBtn.textContent = "Switch to Card View";
    } else {
      toggleBtn.textContent = "Switch to Timeline View";
    }
  });
}

// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = navLinks.querySelectorAll("a");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    if (navLinks.classList.contains("show")) {
      menuToggle.textContent = "✖";
      menuToggle.classList.add("open");
    } else {
      menuToggle.textContent = "☰";
      menuToggle.classList.remove("open");
    }
  });

  navItems.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      menuToggle.textContent = "☰";
      menuToggle.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (
      navLinks.classList.contains("show") &&
      !navLinks.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      navLinks.classList.remove("show");
      menuToggle.textContent = "☰";
      menuToggle.classList.remove("open");
    }
  });
}
