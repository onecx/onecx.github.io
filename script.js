const resources = [
  { label: "OneCX GitHub", kind: "Source Code", href: "https://github.com/onecx" },
  { label: "OneCX Documentation", kind: "Docs", href: "https://onecx.github.io/docs" },
  { label: "OneCX npm", kind: "Packages", href: "https://www.npmjs.com/search?q=onecx" },  
];

const grid = document.getElementById("resourceGrid");
const themeToggleButton = document.getElementById("themeToggle");
const themeStorageKey = "onecx-theme";

function createCard(resource) {
  const card = document.createElement("a");
  card.className = "resource-card";
  card.href = resource.href;
  card.target = "_blank";
  card.rel = "noopener noreferrer";
  card.setAttribute("aria-label", `${resource.label} (${resource.kind})`);

  card.innerHTML = `
    <article class="resource-card__inner">
      <h2 class="resource-card__label">${resource.label}</h2>
      <p class="resource-card__kind">${resource.kind}</p>
    </article>
  `;

  return card;
}

function renderResources() {
  const fragment = document.createDocumentFragment();
  for (const resource of resources) {
    fragment.appendChild(createCard(resource));
  }
  grid.replaceChildren(fragment);
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
}

function getPreferredTheme() {
  const stored = localStorage.getItem(themeStorageKey);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return globalThis.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function toggleTheme() {
  const current = document.body.dataset.theme || "light";
  const next = current === "light" ? "dark" : "light";
  localStorage.setItem(themeStorageKey, next);
  applyTheme(next);
}

renderResources();
applyTheme(getPreferredTheme());
themeToggleButton.addEventListener("click", toggleTheme);
