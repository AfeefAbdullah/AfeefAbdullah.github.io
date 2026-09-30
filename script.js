// Games shown in the "Games I've built" section.
// To use the real Play Store icon, save it as assets/games/<slug>.png
// (512x512 works best). Until then a generated tile is shown.
const PLAY = "https://play.google.com/store/apps/details?id=";

const games = [
  {
    slug: "cat-customs-simulator",
    title: "Cat Customs Simulator",
    id: "com.gss.cat.custom.simulator",
    genre: "Simulation",
    latest: true,
    emoji: "🐱",
    colors: ["#ff9a5a", "#ff4f8b"],
    blurb: "My latest release. A cat-themed customs simulator built from scratch in Unity.",
    tags: ["Unity", "C#", "Ads Mediation", "Firebase"],
  },
  {
    slug: "dig-hole-cleaning",
    title: "Dig Hole Cleaning",
    id: "com.legion.dig.hole.cleaning.game",
    genre: "Casual / Simulation",
    emoji: "⛏️",
    colors: ["#c8894a", "#6b4bff"],
    blurb: "A satisfying dig-and-clean game with an upgrade loop, built from scratch in Unity.",
    tags: ["Unity", "C#", "GameAnalytics"],
  },
  {
    slug: "scrap-mechanic",
    title: "Scrap Mechanic",
    id: "com.giochi.scrap.mechanic",
    genre: "Simulation",
    emoji: "🔧",
    colors: ["#5ee0c2", "#2f6bff"],
    blurb: "A mechanic simulator about salvaging and fixing scrap, built from scratch in Unity.",
    tags: ["Unity", "C#", "Remote Config"],
  },
  {
    slug: "ant-colony-puzzle",
    title: "Ant Colony Puzzle",
    id: "com.dss.ant.colony.puzzle",
    genre: "Puzzle",
    emoji: "🐜",
    colors: ["#b6f05a", "#1fa37a"],
    blurb: "A casual ant-colony puzzle game, built from scratch in Unity.",
    tags: ["Unity", "C#", "Level Design"],
  },
  {
    slug: "hero-fighting-demons",
    title: "Hero Fighting: Demons",
    id: "com.yfp.hero.fighting.demons.game",
    genre: "Action",
    emoji: "⚔️",
    colors: ["#ff5a5a", "#7a2bff"],
    blurb: "An action game where a hero battles demons, built from scratch in Unity.",
    tags: ["Unity", "C#", "Combat Systems"],
  },
];

function renderGames() {
  const grid = document.getElementById("games-grid");
  grid.innerHTML = games
    .map(
      (g) => `
      <a class="game${g.latest ? " game--latest" : ""}" href="${PLAY}${g.id}" target="_blank" rel="noopener">
        <div class="game__art" style="--c1:${g.colors[0]};--c2:${g.colors[1]}">
          <span class="game__emoji" aria-hidden="true">${g.emoji}</span>
          <img src="assets/games/${g.slug}.png" alt="${g.title} icon" loading="lazy" onerror="this.remove()" />
          ${g.latest ? '<span class="badge">Latest</span>' : ""}
        </div>
        <div class="game__body">
          <p class="game__genre">${g.genre}</p>
          <h3>${g.title}</h3>
          <p>${g.blurb}</p>
          <ul class="chips chips--sm">${g.tags.map((t) => `<li>${t}</li>`).join("")}</ul>
          <span class="game__cta">Get it on Google Play →</span>
        </div>
      </a>`
    )
    .join("");
}

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

function revealOnScroll() {
  const els = document.querySelectorAll(".section__head, .game, .timeline__item, .skill-card, .ai-card, .contact");
  if (!("IntersectionObserver" in window)) return;
  els.forEach((el) => el.classList.add("reveal"));
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

renderGames();
revealOnScroll();
document.getElementById("year").textContent = new Date().getFullYear();
