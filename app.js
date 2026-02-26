// ── DOM refs ──
const panelTitle = document.getElementById("panel-title");
const panelSubtitle = document.getElementById("panel-subtitle");
const pubLocationTag = document.getElementById("pub-location-tag");
const pubThemeChips = document.getElementById("pub-theme-chips");
const publicationList = document.getElementById("publication-list");
const countrySearch = document.getElementById("country-search");
const countryListEl = document.getElementById("country-list");
const regionButtons = document.querySelectorAll(".region-btn");
const statPubs = document.getElementById("stat-pubs");
const statCountries = document.getElementById("stat-countries");
const tabButtons = document.querySelectorAll(".tab-btn");
const tabViews = { map: document.getElementById("tab-map"), timeline: document.getElementById("tab-timeline"), themes: document.getElementById("tab-themes") };

// ── Tab switching ──
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => { b.classList.remove("is-active"); b.setAttribute("aria-selected","false"); });
    btn.classList.add("is-active");
    btn.setAttribute("aria-selected","true");
    Object.values(tabViews).forEach(v => v.classList.remove("is-active"));
    tabViews[btn.dataset.tab].classList.add("is-active");
  });
});

// ── Type → CSS class ──
const TYPE_CLASSES = {
  "journal article": "pub-type-journal",
  "book": "pub-type-book",
  "book chapter": "pub-type-chapter",
  "open access": "pub-type-open",
  "non-refereed": "pub-type-non",
  "book review": "pub-type-review",
};
function typeClass(type) { return TYPE_CLASSES[type.toLowerCase()] || "pub-type-default"; }

// ── Map setup ──
const map = L.map("map", { minZoom: 2, maxZoom: 10 }).setView([25, 10], 4);
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
}).addTo(map);

function makeIcon(count) {
  const size = count > 10 ? 36 : count > 5 ? 32 : 28;
  return L.divIcon({
    className: "",
    html: `<div style="width:${size}px;height:${size}px;background:#8b3a1e;border:2.5px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;color:#fff;font-family:'Source Sans 3',sans-serif;font-size:${size>32?12:11}px;font-weight:700;cursor:pointer;">${count}</div>`,
    iconSize: [size, size], iconAnchor: [size/2, size/2],
  });
}

// ── Render publications for selected country ──
function publicationMarkup(pub) {
  const tags = [
    ...(pub.themes || []),
    ...(pub.sports || []),
    ...(pub.methods || [])
  ].map(t => `<span class="pub-tag">${t}</span>`).join("");
  return `
    <span class="pub-type ${typeClass(pub.type)}">${pub.type}</span>
    <p class="pub-title">${pub.title} <span class="pub-year">(${pub.year})</span></p>
    ${tags ? `<div class="pub-meta-tags">${tags}</div>` : ""}
    <a class="pub-link" href="${pub.link}" target="_blank" rel="noopener">Open publication ↗</a>
  `;
}

function renderPublications(entry) {
  pubLocationTag.textContent = entry.region;
  panelTitle.textContent = `${entry.capital}, ${entry.country}`;
  publicationList.innerHTML = "";

  // Collect unique themes for this country
  const allThemes = new Set();
  (entry.publications || []).forEach(p => (p.themes || []).forEach(t => allThemes.add(t)));
  pubThemeChips.innerHTML = [...allThemes].map(t => `<span class="pub-theme-chip">${t}</span>`).join("");

  if (!entry.publications?.length) {
    panelSubtitle.textContent = "No publications listed for this country yet.";
    const item = document.createElement("li");
    item.innerHTML = `<a class="see-all-link" href="http://qufaculty.qu.edu.qa/mamara/publications/" target="_blank" rel="noopener">See Full Publications ↗</a>`;
    publicationList.appendChild(item);
    return;
  }

  panelSubtitle.textContent = `${entry.publications.length} publication${entry.publications.length > 1 ? "s" : ""} linked to this country`;
  entry.publications.forEach(pub => {
    const item = document.createElement("li");
    item.innerHTML = publicationMarkup(pub);
    publicationList.appendChild(item);
  });

  const seeAll = document.createElement("li");
  seeAll.style.cssText = "border:none!important;padding:0;background:none!important;box-shadow:none!important;";
  seeAll.innerHTML = `<a class="see-all-link" href="http://qufaculty.qu.edu.qa/mamara/publications/" target="_blank" rel="noopener">See Full Publication Profile ↗</a>`;
  publicationList.appendChild(seeAll);
}

// ── Country list ──
function buildCountryList(data, markersByCountry, activeRegion, searchTerm) {
  countryListEl.innerHTML = "";
  const visibleEntries = data.filter(e =>
    (activeRegion === "all" || e.region === activeRegion) &&
    e.country.toLowerCase().includes(searchTerm)
  );
  visibleEntries.forEach(entry => {
    const btn = document.createElement("button");
    btn.type = "button"; btn.className = "country-item";
    btn.innerHTML = `<span>${entry.country} <small style="color:var(--ink-muted)">${entry.capital}</small></span><span class="count-badge">${entry.publications?.length || 0}</span>`;
    btn.addEventListener("click", () => {
      map.flyTo([entry.lat, entry.lng], 6, { duration: 0.8 });
      markersByCountry.get(entry.country).openTooltip();
      renderPublications(entry);
    });
    countryListEl.appendChild(btn);
  });
  for (const [country, marker] of markersByCountry.entries()) {
    visibleEntries.some(e => e.country === country) ? marker.addTo(map) : marker.removeFrom(map);
  }
  if (visibleEntries.length > 0) {
    map.fitBounds(L.latLngBounds(visibleEntries.map(e => [e.lat, e.lng])).pad(0.2));
  }
}

// ── Timeline chart ──
function buildTimeline(data) {
  const yearMap = {};
  data.forEach(entry => {
    (entry.publications || []).forEach(pub => {
      if (pub.year) yearMap[pub.year] = (yearMap[pub.year] || 0) + 1;
    });
  });
  const years = Object.keys(yearMap).map(Number).sort((a,b) => a-b);
  const counts = years.map(y => yearMap[y]);

  new Chart(document.getElementById("timeline-chart"), {
    type: "bar",
    data: {
      labels: years,
      datasets: [{
        label: "Publications",
        data: counts,
        backgroundColor: "rgba(139,58,30,0.7)",
        borderColor: "#8b3a1e",
        borderWidth: 1,
        borderRadius: 4,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: { title: ctx => `Year: ${ctx[0].label}`, label: ctx => `${ctx.raw} publication${ctx.raw > 1 ? "s" : ""}` }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { family: "'Source Sans 3', sans-serif" } } },
        y: { beginAtZero: true, ticks: { stepSize: 1, font: { family: "'Source Sans 3', sans-serif" } }, grid: { color: "#e2ddd6" } }
      }
    }
  });
}

// ── Themes / search view ──
function buildThemeView(data) {
  const themeSet = new Set(), sportSet = new Set(), methodSet = new Set();
  data.forEach(entry => {
    (entry.publications || []).forEach(p => {
      (p.themes || []).forEach(t => themeSet.add(t));
      (p.sports || []).forEach(s => sportSet.add(s));
      (p.methods || []).forEach(m => methodSet.add(m));
    });
  });

  function makeChips(containerId, items, dataAttr) {
    const el = document.getElementById(containerId);
    items.forEach(item => {
      const btn = document.createElement("button");
      btn.className = "chip"; btn.type = "button";
      btn.dataset[dataAttr] = item; btn.textContent = item;
      btn.addEventListener("click", () => {
        btn.classList.toggle("is-active");
        applyThemeFilters(data);
      });
      el.appendChild(btn);
    });
  }
  makeChips("theme-chips", [...themeSet].sort(), "theme");
  makeChips("sport-chips", [...sportSet].sort(), "sport");
  makeChips("method-chips", [...methodSet].sort(), "method");

  document.querySelectorAll("[data-period]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-period]").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      applyThemeFilters(data);
    });
  });

  document.getElementById("theme-search").addEventListener("input", () => applyThemeFilters(data));
  applyThemeFilters(data);
}

function applyThemeFilters(data) {
  const activeThemes = [...document.querySelectorAll("#theme-chips .chip.is-active")].map(c => c.dataset.theme);
  const activeSports = [...document.querySelectorAll("#sport-chips .chip.is-active")].map(c => c.dataset.sport);
  const activeMethods = [...document.querySelectorAll("#method-chips .chip.is-active")].map(c => c.dataset.method);
  const activePeriod = document.querySelector("[data-period].is-active")?.dataset.period || "all";
  const searchTerm = document.getElementById("theme-search").value.trim().toLowerCase();

  const results = [];
  data.forEach(entry => {
    (entry.publications || []).forEach(pub => {
      const matchTheme = !activeThemes.length || activeThemes.some(t => (pub.themes||[]).includes(t));
      const matchSport = !activeSports.length || activeSports.some(s => (pub.sports||[]).includes(s));
      const matchMethod = !activeMethods.length || activeMethods.some(m => (pub.methods||[]).includes(m));
      const matchPeriod = activePeriod === "all" ||
        (activePeriod === "pre2010" && pub.year < 2010) ||
        (activePeriod === "2010-2020" && pub.year >= 2010 && pub.year <= 2020) ||
        (activePeriod === "post2020" && pub.year > 2020);
      const matchSearch = !searchTerm || pub.title.toLowerCase().includes(searchTerm) ||
        (pub.themes||[]).some(t=>t.toLowerCase().includes(searchTerm)) ||
        entry.country.toLowerCase().includes(searchTerm);
      if (matchTheme && matchSport && matchMethod && matchPeriod && matchSearch) {
        results.push({ entry, pub });
      }
    });
  });

  results.sort((a,b) => b.pub.year - a.pub.year);

  const meta = document.getElementById("theme-results-meta");
  const list = document.getElementById("theme-results");
  meta.textContent = `${results.length} publication${results.length !== 1 ? "s" : ""} match your filters`;
  list.innerHTML = "";

  results.forEach(({ entry, pub }) => {
    const item = document.createElement("li");
    const tags = [...(pub.themes||[]), ...(pub.sports||[]), ...(pub.methods||[])].map(t => `<span class="pub-tag">${t}</span>`).join("");
    item.innerHTML = `
      <div class="result-country">${entry.country} · ${entry.capital}</div>
      <span class="pub-type ${typeClass(pub.type)}">${pub.type}</span>
      <p class="pub-title">${pub.title} <span class="pub-year">(${pub.year})</span></p>
      ${tags ? `<div class="pub-meta-tags">${tags}</div>` : ""}
      <a class="pub-link" href="${pub.link}" target="_blank" rel="noopener">Open publication ↗</a>
    `;
    list.appendChild(item);
  });
}

// ── INIT ──
async function init() {
  const response = await fetch("data/publications.json");
  const data = await response.json();

  const totalPubs = data.reduce((s, e) => s + (e.publications?.length || 0), 0);
  statPubs.textContent = totalPubs;
  statCountries.textContent = data.length;

  const markersByCountry = new Map();
  data.forEach(entry => {
    const count = entry.publications?.length || 0;
    const marker = L.marker([entry.lat, entry.lng], { icon: makeIcon(count) });
    marker.bindTooltip(
      `<strong>${entry.capital}</strong>, ${entry.country}<br><small>${count} publication${count !== 1 ? "s" : ""}</small>`,
      { direction: "top", offset: [0, -14] }
    );
    marker.on("click", () => renderPublications(entry));
    markersByCountry.set(entry.country, marker);
  });

  let activeRegion = "all";
  function refreshListAndMap() {
    buildCountryList(data, markersByCountry, activeRegion, countrySearch.value.trim().toLowerCase());
  }
  regionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      activeRegion = btn.dataset.region;
      regionButtons.forEach(b => b.classList.toggle("is-active", b === btn));
      refreshListAndMap();
    });
  });
  countrySearch.addEventListener("input", refreshListAndMap);
  refreshListAndMap();
  renderPublications(data[0]);

  buildTimeline(data);
  buildThemeView(data);
}

init().catch(err => {
  panelTitle.textContent = "Unable to load data";
  panelSubtitle.textContent = "Please check that data/publications.json is present.";
  console.error(err);
});
