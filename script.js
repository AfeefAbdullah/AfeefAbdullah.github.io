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

/* ---------- Skills "loadout" (game HUD style) ---------- */
// Brand logos from Simple Icons (CC0). `logo` = filled brand path, `glyph` = stroked icon, `text` = lettermark.
const LOGOS = {
  unity: "m12.9288 4.2939 3.7997 2.1929c.1366.077.1415.2905 0 .3675l-4.515 2.6076a.4192.4192 0 0 1-.4246 0L7.274 6.8543c-.139-.0745-.1415-.293 0-.3675l3.7972-2.193V0L1.3758 5.5977V16.793l3.7177-2.1456v-4.3858c-.0025-.1565.1813-.2682.318-.1838l4.5148 2.6076a.4252.4252 0 0 1 .2136.3676v5.2127c.0025.1565-.1813.2682-.3179.1838l-3.7996-2.1929-3.7178 2.1457L12 24l9.6954-5.5977-3.7178-2.1457-3.7996 2.1929c-.1341.082-.3229-.0248-.3179-.1838V13.053c0-.1565.087-.2956.2136-.3676l4.5149-2.6076c.134-.082.3228.0224.3179.1838v4.3858l3.7177 2.1456V5.5977L12.9288 0Z",
  unreal: "M12 0a12 12 0 1012 12A12 12 0 0012 0zm0 23.52A11.52 11.52 0 1123.52 12 11.52 11.52 0 0112 23.52zm7.13-9.791c-.206.997-1.126 3.557-4.06 4.942l-1.179-1.325-1.988 2a7.338 7.338 0 01-5.804-2.978 2.859 2.859 0 00.65.123c.326.006.678-.114.678-.66v-5.394a.89.89 0 00-1.116-.89c-.92.212-1.656 2.509-1.656 2.509a7.304 7.304 0 012.528-5.597 7.408 7.408 0 013.73-1.721c-1.006.573-1.57 1.507-1.57 2.29 0 1.262.76 1.109.984.923v7.28a1.157 1.157 0 00.148.256 1.075 1.075 0 00.88.445c.76 0 1.747-.868 1.747-.868V9.172c0-.6-.452-1.324-.905-1.572 0 0 .838-.149 1.484.346a5.537 5.537 0 01.387-.425c1.508-1.48 2.929-1.902 4.112-2.112 0 0-2.151 1.69-2.151 3.96 0 1.687.043 5.801.043 5.801.799.771 1.986-.342 3.059-1.441Z",
  admob: "M11.46.033h-.052A11.993 11.993 0 0 0 0 11.922v.052c0 7.475 6.563 11.928 11.447 11.928h.17a3.086 3.086 0 0 0 3.125-3.047c0-1.693-1.433-2.917-3.152-2.917h-.039a6.016 6.016 0 0 1-5.508-6.368v-.052a6.016 6.016 0 0 1 5.573-5.509c1.719 0 3.125-1.237 3.125-2.917A3.086 3.086 0 0 0 11.604.02h-.143zm2.031.026a3.516 3.516 0 0 1 1.746 3.021 3.386 3.386 0 0 1-1.928 3.047c2.865.6 4.532 3.126 4.688 5.378v7.684a3.49 3.49 0 0 1 6.003.026v-7.736A12.046 12.046 0 0 0 13.491.045zm7.475 17.932a2.995 2.995 0 1 0 .04 0z",
  firebase: "M19.455 8.369c-.538-.748-1.778-2.285-3.681-4.569-.826-.991-1.535-1.832-1.884-2.245a146 146 0 0 0-.488-.576l-.207-.245-.113-.133-.022-.032-.01-.005L12.57 0l-.609.488c-1.555 1.246-2.828 2.851-3.681 4.64-.523 1.064-.864 2.105-1.043 3.176-.047.241-.088.489-.121.738-.209-.017-.421-.028-.632-.033-.018-.001-.035-.002-.059-.003a7.46 7.46 0 0 0-2.28.274l-.317.089-.163.286c-.765 1.342-1.198 2.869-1.252 4.416-.07 2.01.477 3.954 1.583 5.625 1.082 1.633 2.61 2.882 4.42 3.611l.236.095.071.025.003-.001a9.59 9.59 0 0 0 2.941.568q.171.006.342.006c1.273 0 2.513-.249 3.69-.742l.008.004.313-.145a9.63 9.63 0 0 0 3.927-3.335c1.01-1.49 1.577-3.234 1.641-5.042.075-2.161-.643-4.304-2.133-6.371m-7.083 6.695c.328 1.244.264 2.44-.191 3.558-1.135-1.12-1.967-2.352-2.475-3.665-.543-1.404-.87-2.74-.974-3.975.48.157.922.366 1.315.622 1.132.737 1.914 1.902 2.325 3.461zm.207 6.022c.482.368.99.712 1.513 1.028-.771.21-1.565.302-2.369.273a8 8 0 0 1-.373-.022c.458-.394.869-.823 1.228-1.279zm1.347-6.431c-.516-1.957-1.527-3.437-3.002-4.398-.647-.421-1.385-.741-2.194-.95.011-.134.026-.268.043-.4.014-.113.03-.216.046-.313.133-.689.332-1.37.589-2.025.099-.25.206-.499.321-.74l.004-.008c.177-.358.376-.719.61-1.105l.092-.152-.003-.001c.544-.851 1.197-1.627 1.942-2.311l.288.341c.672.796 1.304 1.548 1.878 2.237 1.291 1.549 2.966 3.583 3.612 4.48 1.277 1.771 1.893 3.579 1.83 5.375-.049 1.395-.461 2.755-1.195 3.933-.694 1.116-1.661 2.05-2.8 2.708-.636-.318-1.559-.839-2.539-1.599.79-1.575.952-3.28.479-5.072zm-2.575 5.397c-.725.939-1.587 1.55-2.09 1.856-.081-.029-.163-.06-.243-.093l-.065-.026c-1.49-.616-2.747-1.656-3.635-3.01-.907-1.384-1.356-2.993-1.298-4.653.041-1.19.338-2.327.882-3.379.316-.07.638-.114.96-.131l.084-.002c.162-.003.324-.003.478 0 .227.011.454.035.677.07.073 1.513.445 3.145 1.105 4.852.637 1.644 1.694 3.162 3.144 4.515z",
  git: "M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187",
  googleplay: "M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z",
};

const GLYPHS = {
  physics: '<circle cx="14" cy="12" r="5"/><path d="M2 9h5M3 13h4M2 17h6"/>',
  ui: '<rect x="3" y="4" width="18" height="15" rx="2"/><path d="M3 8h18M7 12h4M7 15h7"/>',
  level: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4z"/><path d="M13 16.5h7M16.5 13v7"/>',
  mediation: '<circle cx="5" cy="12" r="2.5"/><circle cx="19" cy="5" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M7.3 11 16.7 6M7.3 13l9.4 5"/>',
  bug: '<rect x="7" y="8" width="10" height="12" rx="5"/><path d="M9 8a3 3 0 0 1 6 0M12 12v8M3 14h4M17 14h4M4 8l3 2M20 8l-3 2M4 20l3-2M20 20l-3-2"/>',
  sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  chart: '<path d="M3 20h18"/><path d="M6 16v-4M11 16V7M16 16v-7M21 5l-5 4-5-2-5 5"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5M9 11h4M11 9v4"/>',
  gauge: '<path d="M4 17a8 8 0 1 1 16 0"/><path d="m12 17 4-5"/><circle cx="12" cy="17" r="1.2"/>',
  puzzle: '<path d="M9 3h3v2a2 2 0 1 0 4 0V3h3a2 2 0 0 1 2 2v3h-2a2 2 0 1 0 0 4h2v3a2 2 0 0 1-2 2h-3v-2a2 2 0 1 0-4 0v2H5a2 2 0 0 1-2-2v-3h2a2 2 0 1 0 0-4H3V5a2 2 0 0 1 2-2z"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
};

const loadout = [
  {
    tab: "Gameplay & Engine",
    items: [
      { name: "Unity", logo: "unity", tint: "#e8ebf5", note: "Used in all 5 shipped games", core: true },
      { name: "C#", text: "C#", tint: "#a179dc", note: "Gameplay systems & tools", core: true },
      { name: "Physics", glyph: "physics", tint: "#22d3ee", note: "2D & 3D physics-based mechanics" },
      { name: "Game UI / HUD", glyph: "ui", tint: "#7c5cff", note: "Menus, HUD & UX flows" },
      { name: "Level Design", glyph: "level", tint: "#b6f05a", note: "Puzzle & progression levels" },
      { name: "Unreal Engine 5", logo: "unreal", tint: "#e8ebf5", note: "C++ & Blueprints · RIVALS" },
    ],
  },
  {
    tab: "Monetization & Live Ops",
    items: [
      { name: "AdMob", logo: "admob", tint: "#ea4335", note: "Ad SDK integration", core: true },
      { name: "AppLovin MAX", text: "MAX", tint: "#2fb4ff", note: "Mediation network" },
      { name: "Ads Mediation", glyph: "mediation", tint: "#ffb35a", note: "Wrappers across live games", core: true },
      { name: "Firebase", logo: "firebase", tint: "#ffa000", note: "Analytics in every release", core: true },
      { name: "Crashlytics", glyph: "bug", tint: "#ff5a5a", note: "Crash monitoring & fixes" },
      { name: "Remote Config", glyph: "sliders", tint: "#34d399", note: "Live tuning without updates" },
      { name: "GameAnalytics", glyph: "chart", tint: "#22d3ee", note: "Progression & retention" },
    ],
  },
  {
    tab: "Engineering",
    items: [
      { name: "Debugging", glyph: "search", tint: "#22d3ee", note: "Runtime errors in live games", core: true },
      { name: "Performance", glyph: "gauge", tint: "#34d399", note: "Profiling & optimization" },
      { name: "SDK Conflicts", glyph: "puzzle", tint: "#ffb35a", note: "Resolving SDK clashes" },
      { name: "Git", logo: "git", tint: "#f05032", note: "Version control" },
      { name: "Google Play", logo: "googleplay", tint: "#34a853", note: "Store releases & updates", core: true },
      { name: "AI Coding Agents", glyph: "spark", tint: "#a78bfa", note: "Planning & implementation" },
    ],
  },
];

function slotIcon(it) {
  if (it.logo) return `<svg viewBox="0 0 24 24" class="fill"><path d="${LOGOS[it.logo]}"/></svg>`;
  if (it.glyph) return `<svg viewBox="0 0 24 24" class="stroke">${GLYPHS[it.glyph]}</svg>`;
  return `<span class="slot__text">${it.text}</span>`;
}

function renderLoadout() {
  const tabs = document.getElementById("loadout-tabs");
  const grid = document.getElementById("loadout-grid");
  if (!tabs || !grid) return;

  tabs.innerHTML = loadout
    .map(
      (t, i) => `<button role="tab" id="lo-tab-${i}" aria-controls="loadout-grid" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">
        ${t.tab}<span class="count">${t.items.length}</span></button>`
    )
    .join("");

  const show = (i) => {
    [...tabs.children].forEach((b, j) => {
      b.setAttribute("aria-selected", String(i === j));
      b.tabIndex = i === j ? 0 : -1;
    });
    const tab = tabs.children[i];
    tabs.scrollTo({ left: tab.offsetLeft - (tabs.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
    grid.setAttribute("aria-labelledby", `lo-tab-${i}`);
    grid.innerHTML = loadout[i].items
      .map(
        (it, k) => `<div class="slot${it.core ? " slot--core" : ""}" style="--tint:${it.tint};--k:${k}">
          <div class="slot__icon">${slotIcon(it)}</div>
          <div class="slot__name">${it.name}</div>
          <div class="slot__note">${it.note}</div>
          ${it.core ? '<span class="slot__tag">Core</span>' : ""}
        </div>`
      )
      .join("");
  };

  tabs.addEventListener("click", (e) => {
    const b = e.target.closest("[role=tab]");
    if (b) show([...tabs.children].indexOf(b));
  });
  tabs.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const btns = [...tabs.children];
    const cur = btns.findIndex((b) => b.getAttribute("aria-selected") === "true");
    const next = (cur + (e.key === "ArrowRight" ? 1 : -1) + btns.length) % btns.length;
    show(next);
    btns[next].focus();
  });
  show(0);
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
      // Light up each dot once the fill line reaches it (dot center is ~13px below the item top).
      const fillPx = 8 + (r.height - 16) * p;
      timeline.querySelectorAll(".timeline__item").forEach((item) => {
        item.classList.toggle("passed", p > 0 && item.offsetTop + 13 <= fillPx + 1);
      });
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
    ".section__head, .game, .timeline__item, .loadout, .ai-card, .contact, .chips li"
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
renderLoadout();
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
