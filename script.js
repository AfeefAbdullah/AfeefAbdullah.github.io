// Games shown in the "Games I've built" section.
// To use the real Play Store icon, save it as assets/games/<slug>.png
// (512x512 works best). Without it a gradient tile with the emoji is shown.
const PLAY = "https://play.google.com/store/apps/details?id=";

const games = [
  {
    slug: "cat-customs-simulator",
    title: "Cat Customs Security Simulator",
    id: "com.gss.cat.custom.simulator",
    genre: "Role Playing",
    latest: true,
    emoji: "🐱",
    colors: ["#ff9a5a", "#ff4f8b"],
    blurb: "A cozy border-inspection sim: check cat travelers' passports, scan their luggage for contraband and decide who gets through. My latest release, built from scratch in Unity.",
    tags: ["Unity", "C#", "Ads Mediation", "Firebase"],
  },
  {
    slug: "dig-hole-cleaning",
    title: "Dig Hole: Cleaning Game",
    id: "com.legion.dig.hole.cleaning.game",
    genre: "Simulation",
    emoji: "⛏️",
    colors: ["#c8894a", "#6b4bff"],
    blurb: "A satisfying digging game: unearth buried junk and treasure, spray each find clean, collect rare items and upgrade your tools. Built from scratch in Unity.",
    tags: ["Unity", "C#", "GameAnalytics"],
  },
  {
    slug: "scrap-mechanic",
    title: "ScrapCraft: Machine Builder",
    id: "com.giochi.scrap.mechanic",
    genre: "Adventure",
    emoji: "🔧",
    colors: ["#5ee0c2", "#2f6bff"],
    blurb: "A physics-based building adventure: collect scrap, build machines and vehicles, explore scrapyards and battle hostile robots. Built from scratch in Unity.",
    tags: ["Unity", "C#", "Remote Config"],
  },
  {
    slug: "ant-colony-puzzle",
    title: "Ant Colony: Food Puzzle",
    id: "com.dss.ant.colony.puzzle",
    genre: "Puzzle",
    emoji: "🐜",
    colors: ["#b6f05a", "#1fa37a"],
    blurb: "A relaxing color-sorting puzzle where worker ants carry cubes to matching holes; plan each move, manage limited slots and unlock pixel art. Built from scratch in Unity.",
    tags: ["Unity", "C#", "Level Design"],
  },
  {
    slug: "hero-fighting-demons",
    title: "Soul Heroes Robot Fighting",
    id: "com.yfp.hero.fighting.demons.game",
    genre: "Action",
    emoji: "⚔️",
    colors: ["#ff5a5a", "#7a2bff"],
    blurb: "An action fighting game, built from scratch in Unity.",
    tags: ["Unity", "C#", "Combat Systems"],
  },
];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function renderGames() {
  const grid = document.getElementById("games-grid");
  grid.innerHTML = games
    .map(
      (g, i) => `
      <a class="game tilt${g.latest ? " game--latest" : ""}" style="--i:${i}" href="${PLAY}${g.id}" target="_blank" rel="noopener">
        <div class="game__art" style="--c1:${g.colors[0]};--c2:${g.colors[1]};--img:url('assets/games/${g.slug}.png')">
          <span class="game__emoji" aria-hidden="true">${g.emoji}</span>
          <img src="assets/games/${g.slug}.png" alt="${g.title} icon" loading="lazy" onerror="this.remove()" />
          ${g.latest ? '<span class="badge">Latest</span>' : ""}
          <span class="game__play" aria-hidden="true">▶</span>
        </div>
        <div class="game__body">
          <p class="game__genre">${g.genre}</p>
          <h3>${g.title}</h3>
          <p>${g.blurb}</p>
          <ul class="chips chips--sm">${g.tags.map((t) => `<li>${t}</li>`).join("")}</ul>
          <span class="game__cta">Get it on Google Play <span class="arrow">→</span></span>
        </div>
        <span class="glare" aria-hidden="true"></span>
      </a>`
    )
    .join("");
}

/* ---------- Navigation ---------- */
function toggleMenu() {
  const links = document.getElementById("nav-links");
  const btn = document.querySelector(".nav__toggle");
  const open = links.classList.toggle("open");
  btn.classList.toggle("open", open);
  btn.setAttribute("aria-expanded", String(open));
}

function closeMenu() {
  document.getElementById("nav-links").classList.remove("open");
  const btn = document.querySelector(".nav__toggle");
  btn.classList.remove("open");
  btn.setAttribute("aria-expanded", "false");
}

// Highlight the nav link of the section in view.
function activeNav() {
  const links = [...document.querySelectorAll(".nav__links a[href^='#']")];
  const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.remove("active"));
        byId.get(e.target.id)?.classList.add("active");
      }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  byId.forEach((_, id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
}

/* ---------- Scroll: progress bar, hide-on-scroll nav, back-to-top, timeline fill ---------- */
function onScroll() {
  const nav = document.querySelector(".nav");
  const bar = document.querySelector(".progress");
  const toTop = document.querySelector(".to-top");
  const timeline = document.querySelector(".timeline");
  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    const menuOpen = document.getElementById("nav-links").classList.contains("open");
    nav.classList.toggle("nav--hidden", y > lastY && y > 300 && !menuOpen);
    nav.classList.toggle("nav--scrolled", y > 10);
    toTop.classList.toggle("show", y > 700);
    if (timeline) {
      const r = timeline.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
      timeline.style.setProperty("--fill", p.toFixed(3));
    }
    lastY = y;
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();
}

/* ---------- Reveal on scroll (staggered) ---------- */
function revealOnScroll() {
  const els = document.querySelectorAll(
    ".section__head, .game, .timeline__item, .skill-card, .ai-card, .contact, .chips li"
  );
  if (!("IntersectionObserver" in window) || reduceMotion) return;
  els.forEach((el) => {
    el.classList.add("reveal");
    // stagger siblings of the same kind
    const sibs = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    el.style.setProperty("--d", `${Math.min(sibs.indexOf(el), 10) * 70}ms`);
  });
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- Typewriter ---------- */
function typewriter() {
  const el = document.getElementById("typer");
  if (!el || reduceMotion) return;
  const words = [
    "Unity Game Developer",
    "Gameplay Programmer",
    "Monetization & Live Ops",
    "Firebase · GameAnalytics",
    "AI-Assisted Builder",
  ];
  let w = 0, c = words[0].length, deleting = true;
  const tick = () => {
    const word = words[w];
    c += deleting ? -1 : 1;
    el.textContent = word.slice(0, c);
    let delay = deleting ? 35 : 70;
    if (!deleting && c === word.length) { deleting = true; delay = 1800; }
    else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
    setTimeout(tick, delay);
  };
  setTimeout(tick, 2200);
}

/* ---------- Count-up stats ---------- */
function countUp() {
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = +el.dataset.count;
    if (reduceMotion) return;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / 1200);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    el.textContent = "0";
    setTimeout(() => requestAnimationFrame(step), 400);
  });
}

/* ---------- 3D tilt + glare on cards (mouse only) ---------- */
function tiltCards() {
  if (!finePointer || reduceMotion) return;
  document.querySelectorAll(".tilt").forEach((card) => {
    const max = card.classList.contains("game--latest") ? 4 : 8;
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty("--rx", `${(0.5 - y) * max}deg`);
      card.style.setProperty("--ry", `${(x - 0.5) * max}deg`);
      card.style.setProperty("--gx", `${x * 100}%`);
      card.style.setProperty("--gy", `${y * 100}%`);
      card.classList.add("tilting");
    });
    card.addEventListener("pointerleave", () => {
      card.classList.remove("tilting");
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
}

/* ---------- Magnetic buttons + cursor glow (mouse only) ---------- */
function pointerFx() {
  if (!finePointer || reduceMotion) return;
  const glow = document.querySelector(".cursor-glow");
  window.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    glow.classList.add("on");
  }, { passive: true });
  document.addEventListener("pointerleave", () => glow.classList.remove("on"));

  document.querySelectorAll(".btn, .socials a").forEach((b) => {
    b.addEventListener("pointermove", (e) => {
      const r = b.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      b.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
    });
    b.addEventListener("pointerleave", () => (b.style.transform = ""));
  });
}

/* ---------- Hero particle field (reacts to the pointer) ---------- */
function heroParticles() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext("2d");
  const hero = canvas.parentElement;
  const mouse = { x: -9999, y: -9999 };
  let w, h, dpr, pts = [], running = true;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = hero.clientWidth;
    h = hero.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(90, (w * h) / 14000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6,
    }));
  };

  const draw = () => {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < 120) { p.x += (dx / d) * 1.2; p.y += (dy / d) * 1.2; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(170, 160, 255, 0.7)";
      ctx.fill();
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 110) {
          ctx.strokeStyle = `rgba(34, 211, 238, ${0.18 * (1 - d / 110)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  };

  hero.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  hero.addEventListener("pointerleave", () => (mouse.x = mouse.y = -9999));
  window.addEventListener("resize", resize);

  // Pause when the hero is off screen to save battery.
  new IntersectionObserver(([e]) => {
    const was = running;
    running = e.isIntersecting;
    if (running && !was) requestAnimationFrame(draw);
  }).observe(hero);

  resize();
  requestAnimationFrame(draw);
}

/* ---------- Easter egg: Konami code ---------- */
function konami() {
  const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let pos = 0;
  window.addEventListener("keydown", (e) => {
    pos = e.key === seq[pos] ? pos + 1 : e.key === seq[0] ? 1 : 0;
    if (pos < seq.length) return;
    pos = 0;
    showToast("🎮 Cheat code unlocked: +30 lives. Thanks for playing!");
    burst();
  });
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 3500);
}

function burst() {
  if (reduceMotion) return;
  const colors = ["#7c5cff", "#22d3ee", "#ff4f8b", "#b6f05a", "#ffb35a"];
  for (let i = 0; i < 80; i++) {
    const s = document.createElement("span");
    s.className = "confetti";
    s.style.left = `${Math.random() * 100}vw`;
    s.style.background = colors[i % colors.length];
    s.style.setProperty("--dx", `${(Math.random() - 0.5) * 200}px`);
    s.style.animationDelay = `${Math.random() * 300}ms`;
    s.style.animationDuration = `${1600 + Math.random() * 1200}ms`;
    document.body.appendChild(s);
    s.addEventListener("animationend", () => s.remove());
  }
}

renderGames();
activeNav();
onScroll();
revealOnScroll();
typewriter();
countUp();
tiltCards();
pointerFx();
heroParticles();
konami();
document.getElementById("year").textContent = new Date().getFullYear();
