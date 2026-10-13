// =========================================================
// script.js: interactivity ng portfolio
// Bawat feature ay naka-hiwalay na block para madaling aralin.
// =========================================================

// ---------- 1. Dark mode toggle ----------
// Bootstrap 5.3 ay may built-in dark mode gamit ang data-bs-theme="dark" sa <html>.
const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
  html.setAttribute("data-bs-theme", theme);
  themeToggle.innerHTML = theme === "dark"
    ? '<i class="bi bi-sun"></i>'
    : '<i class="bi bi-moon-stars"></i>';
  try { localStorage.setItem("theme", theme); } catch (e) { /* ok lang kung blocked */ }
}

// Pag-load ng page: gamitin ang na-save na theme, kung meron
let savedTheme = null;
try { savedTheme = localStorage.getItem("theme"); } catch (e) {}
setTheme(savedTheme || "dark");

themeToggle.addEventListener("click", function () {
  const current = html.getAttribute("data-bs-theme");
  setTheme(current === "dark" ? "light" : "dark");
});


// ---------- 2. Isara ang mobile menu kapag may kinlick na link ----------
const navCollapse = document.getElementById("navLinks");
document.querySelectorAll("#navLinks .nav-link").forEach(function (link) {
  link.addEventListener("click", function () {
    if (navCollapse.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
    }
  });
});


// ---------- 3. Skills filter ----------
// Bawat button ay may data-filter; bawat row ay may data-category.
const filterButtons = document.querySelectorAll("[data-filter]");
const skillRows = document.querySelectorAll("#skillsTable tbody tr");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const filter = button.dataset.filter;

    filterButtons.forEach(function (b) { b.classList.remove("active"); });
    button.classList.add("active");

    skillRows.forEach(function (row) {
      const match = filter === "all" || row.dataset.category === filter;
      row.style.display = match ? "" : "none";
    });
  });
});


// ---------- 4. Certificate modal ----------
// Kapag kinlick ang certificate, kinukuha natin ang data-img at data-title nito.
const certModal = document.getElementById("certModal");
certModal.addEventListener("show.bs.modal", function (event) {
  const item = event.relatedTarget;          // ang figure na kinlick
  const img = document.getElementById("certModalImg");
  img.src = item.dataset.img;
  img.alt = item.dataset.title;
  document.getElementById("certModalTitle").textContent = item.dataset.title;
});


// ---------- 5. Contact form (validation + mailto) ----------
// Walang backend ang GitHub Pages, kaya bubuksan natin ang email app ng user.
const contactForm = document.getElementById("contactForm");
const MY_EMAIL = "floressherrymae01@gmail.com";

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();                    // huwag i-reload ang page

  if (!contactForm.checkValidity()) {        // gumagamit ng required at minlength sa HTML
    contactForm.classList.add("was-validated");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();
  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(message);

  window.location.href = "mailto:" + MY_EMAIL + "?subject=" + subject + "&body=" + body;
  contactForm.reset();
  contactForm.classList.remove("was-validated");
});


// ---------- 6. Back to top button ----------
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", function () {
  backToTop.classList.toggle("show", window.scrollY > 400);
});


// ---------- 7. Current year sa footer ----------
document.getElementById("year").textContent = new Date().getFullYear();