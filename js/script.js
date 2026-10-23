// =========================================================
// script.js: interactivity ng portfolio
// Bawat feature ay naka-hiwalay na block para madaling aralin.
// =========================================================

// ---------- 1. Dark mode toggle ----------
// Bootstrap 5.3 ay may built-in dark mode gamit ang data-bs-theme="dark" sa <html>.
const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function setTheme(theme, remember) {
  html.setAttribute("data-bs-theme", theme);
  themeToggle.innerHTML = theme === "dark"
    ? '<i class="bi bi-sun"></i>'
    : '<i class="bi bi-moon-stars"></i>';
  if (remember) {                  // ise-save lang kapag ang bisita mismo ang pumili
    try { localStorage.setItem("sm-theme-choice", theme); } catch (e) { /* ok lang kung blocked */ }
  }
}

// Pag-load ng page: gamitin ang na-save na theme, kung meron
let savedTheme = null;
try { savedTheme = localStorage.getItem("sm-theme-choice"); } catch (e) {}
setTheme(savedTheme || "dark", false);   // dark ang default, dahil madilim na lila ang background

themeToggle.addEventListener("click", function () {
  const current = html.getAttribute("data-bs-theme");
  setTheme(current === "dark" ? "light" : "dark", true);
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


// ---------- 8. Gumagalaw na particles sa background ----------
// Maliliit na kumikinang na tuldok na dahan-dahang lumulutang pataas,
// parang ang mga ningning sa larawan. Gumagamit ng <canvas> sa likod ng content.
(function () {
  const canvas = document.createElement("canvas");
  canvas.id = "bgParticles";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const COLORS = ["255,214,128", "255,236,180", "255,255,255", "216,180,254"];   // gintong alikabok, bagay sa gintong linya
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0, height = 0, dpr = 1, particles = [];

  function makeParticle(startAnywhere) {
    return {
      x: Math.random() * width,
      y: startAnywhere ? Math.random() * height : height + 10,
      r: 0.6 + Math.random() * 1.9,                 // laki ng tuldok
      speed: 5 + Math.random() * 14,                // bilis pataas (pixels bawat segundo)
      sway: 6 + Math.random() * 18,                 // lapad ng kaliwa-kanang galaw
      phase: Math.random() * Math.PI * 2,
      twinkle: 0.4 + Math.random() * 1.2,           // bilis ng pagkislap
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 0.25 + Math.random() * 0.55
    };
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(36, Math.round((width * height) / 30000));
    particles = [];
    for (let i = 0; i < count; i++) particles.push(makeParticle(true));
  }

  // Isang beses lang ginagawa ang glow ng bawat kulay, tapos kinokopya na lang
  // (mas magaan kaysa ang shadowBlur sa bawat frame).
  const sprites = {};
  function sprite(color) {
    if (sprites[color]) return sprites[color];
    const s = document.createElement("canvas");
    s.width = s.height = 64;
    const g = s.getContext("2d");
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(" + color + ",1)");
    grad.addColorStop(0.25, "rgba(" + color + ",0.55)");
    grad.addColorStop(1, "rgba(" + color + ",0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    sprites[color] = s;
    return s;
  }

  function draw(time, delta) {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.y -= p.speed * delta;
      if (p.y < -10) Object.assign(p, makeParticle(false));
      const x = p.x + Math.sin(time * 0.0004 + p.phase) * p.sway;
      const size = p.r * 7;
      ctx.globalAlpha = p.alpha * (0.55 + 0.45 * Math.sin(time * 0.001 * p.twinkle + p.phase));
      ctx.drawImage(sprite(p.color), x - size / 2, p.y - size / 2, size, size);
    }
    ctx.globalAlpha = 1;
  }

  let last = 0;
  function loop(now) {
    const delta = Math.min((now - last) / 1000, 0.1);
    last = now;
    if (!document.hidden) draw(now, delta);
    requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener("resize", resize);
  if (reduceMotion) {
    draw(0, 0);                                     // isang larawan lang, walang galaw
  } else {
    requestAnimationFrame(function (t) { last = t; loop(t); });
  }
})();


// ---------- 9. Video background ----------
// Ang video sa assets/bg-video.mp4 ang gumagalaw na background. Kapag naka-on ang
// "reduce motion" sa device, hihinto ito at ang static na larawan lang ang makikita.
// Humihinto rin ito kapag nakatago ang tab para makatipid sa baterya.
(function () {
  var video = document.getElementById("bgVideo");
  if (!video) return;
  video.muted = true;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.remove();
    return;
  }
  var play = function () { var p = video.play(); if (p && p.catch) p.catch(function () {}); };
  video.addEventListener("error", function () { video.remove(); });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) video.pause(); else play();
  });
  play();
})();


// ---------- 10. Link mula sa project card papunta sa Problem-Solving case ----------
// Kapag pinindot ang "Problem-solving: Case ..." sa project, bubuksan ang case at pupunta roon.
document.querySelectorAll("[data-case]").forEach(function (link) {
  link.addEventListener("click", function (event) {
    var panel = document.getElementById(link.dataset.case);
    if (!panel) return;
    event.preventDefault();
    bootstrap.Collapse.getOrCreateInstance(panel, { toggle: false }).show();
    document.getElementById(link.dataset.case + "-item").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});