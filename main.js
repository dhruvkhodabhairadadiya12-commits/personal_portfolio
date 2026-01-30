const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => navMenu.classList.add("show-menu"));
}
if (navClose && navMenu) {
  navClose.addEventListener("click", () => navMenu.classList.remove("show-menu"));
}

const navLinks = document.querySelectorAll(".nav__link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => navMenu.classList.remove("show-menu"));
});

const header = document.getElementById("header");
function blurHeader() {
  if (!header) return;
  if (window.scrollY >= 50) header.classList.add("blur-header");
  else header.classList.remove("blur-header");
}
window.addEventListener("scroll", blurHeader);

const scrollUp = document.getElementById("scroll-up");
function showScrollUp() {
  if (!scrollUp) return;
  if (window.scrollY >= 350) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", showScrollUp);

const sections = document.querySelectorAll("section[id]");
function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 110;
    const sectionId = current.getAttribute("id");

    const link = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);
    if (!link) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add("active-link");
    } else {
      link.classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

function setError(input, message) {
  const field = input.closest(".contact__field");
  const small = field ? field.querySelector(".form__error") : null;
  if (small) small.textContent = message;
  input.setAttribute("aria-invalid", message ? "true" : "false");
}

function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const message = form.querySelector("#message");

    let ok = true;

    [name, email, message].forEach((el) => setError(el, ""));

    if (!name.value.trim()) {
      setError(name, "Please enter your name.");
      ok = false;
    }

    if (!email.value.trim()) {
      setError(email, "Please enter your email.");
      ok = false;
    } else if (!isEmail(email.value.trim())) {
      setError(email, "Please enter a valid email address.");
      ok = false;
    }

    if (!message.value.trim()) {
      setError(message, "Please write a message.");
      ok = false;
    } else if (message.value.trim().length < 10) {
      setError(message, "Message should be at least 10 characters.");
      ok = false;
    }

    if (!ok) {
      if (statusEl) statusEl.textContent = "Please fix the highlighted fields.";
      return;
    }

    const payload = {
      name: name.value.trim(),
      email: email.value.trim(),
      message: message.value.trim(),
      time: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("portfolio_messages") || "[]");
    existing.unshift(payload);
    localStorage.setItem("portfolio_messages", JSON.stringify(existing));

    form.reset();
    if (statusEl) statusEl.textContent = "Message saved locally (demo). I’ll get back to you soon!";
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

