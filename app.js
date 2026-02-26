// ─────────────────────────────────────────────
//  FEATURED PUBLICATIONS (hand-curated)
// ─────────────────────────────────────────────
const FEATURED = [
  { title: "Sport, Politics and Society in the Arab World", year: 2012, link: "https://link.springer.com/book/10.1057/9780230359505", label: "Palgrave Macmillan" },
  { title: "The 2022 FIFA World Cup in Qatar", year: 2024, link: "https://doi.org/10.4324/9781003453246", label: "Routledge" },
  { title: "Sport in the African World", year: 2018, link: "https://www.routledge.com/Sport-in-the-African-World/Nauright-Amara/p/book/9780815380641", label: "Routledge" },
  { title: "The Olympic Movement and the MENA Region", year: 2017, link: "https://www.tandfonline.com/toc/fhsp20/34/13", label: "Tandfonline" },
  { title: "Sport in Islam and Muslim Communities", year: 2015, link: "https://www.routledge.com/Sport-in-Islam-and-in-Muslim-Communities/Testa-Amara/p/book/9781138815421", label: "Routledge" },
];

// ─────────────────────────────────────────────
//  DOM REFS
// ─────────────────────────────────────────────
const panelTitle      = document.getElementById("panel-title");
const panelSubtitle   = document.getElementById("panel-subtitle");
const pubLocationTag  = document.getElementById("pub-location-tag");
const pubThemeChips   = document.getElementById("pub-theme-chips");
const publicationList = document.getElementById("publication-list");
const countrySearch   = document.getElementById("country-search");
const countryListEl   = document.getElementById("country-list");
const regionButtons   = document.querySelectorAll(".region-btn");
const statPubs        = document.getElementById("stat-pubs");
const statCountries   = document.getElementById("stat-countries");
const tabButtons      = document.querySelectorAll(".tab-btn");
const citeToast       = document.getElementById("cite-toast");
const tabViews = {
  map:    document.getElementById("tab-map"),
  themes: document.getElementById("tab-themes"),
};

// ─────────────────────────────────────────────
//  ABOUT MODAL
// ─────────────────────────────────────────────
const overlay   = document.getElementById("about-overlay");
const closeBtn  = document.getElementById("about-close");
const startBtn  = document.getElementById("about-start");
const triggerBtn = document.getElementById("about-trigger");

function closeAbout() { overlay.classList.add("hidden"); }
closeBtn.addEventListener("click", closeAbout);
startBtn.addEventListener("click", closeAbout);
triggerBtn.addEventListener("click", () => overlay.classList.remove("hidden"));
overlay.addEventListener("click", e => { if (e.target === overlay) closeAbout(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeAbout(); });

// ─────────────────────────────────────────────
//  FEATURED BAR
// ─────────────────────────────────────────────
function buildFeaturedBar() {
  const container = document.getElementById("featured-items");
  FEATURED.forEach(f => {
    const a = document.createElement("a");
    a.className = "featured-chip";
    a.href = f.link;
    a.target = "_blank";
    a.rel = "noopener";
    a.innerHTML = `${f.title} <span class="featured-chip-year">${f.year}</span>`;
    container.appendChild(a);
  });
}

// ─────────────────────────────────────────────
//  LATEST STRIP  (top 3 by year)
// ─────────────────────────────────────────────
function buildLatestStrip(data) {
  const all = [];
  data.forEach(entry => (entry.publications || []).forEach(p => all.push(p)));
  all.sort((a, b) => b.year - a.year);
  const top3 = all.slice(0, 3);
  const container = document.getElementById("latest-items");
  top3.forEach(pub => {
    const div = document.createElement("div");
    div.className = "latest-item";
    div.innerHTML = `<span class="latest-year">${pub.year}</span><a href="${pub.link}" target="_blank" rel="noopener" title="${pub.title}">${pub.title}</a>`;
    container.appendChild(div);
  });
}

// ─────────────────────────────────────────────
//  CITATION EXPORT
// ─────────────────────────────────────────────
let toastTimer;
function showToast() {
  citeToast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => citeToast.classList.remove("show"), 2500);
}

function buildCitation(pub, authorName) {
  // APA 7th format
  return `${authorName} (${pub.year}). ${pub.title}. ${pub.link}`;
}

// ─────────────────────────────────────────────
//  TAB SWITCHING
// ─────────────────────────────────────────────
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => { b.classList.remove("is-active"); b.setAttribute("aria-selected", "false"); });
    btn.classList.add("is-active");
    btn.setAttribute("aria-selected", "true");
    Object.values(tabViews).forEach(v => v.classList.remove("is-active"));
    tabViews[btn.dataset.tab].classList.add("is-active");
  });
});

// ─────────────────────────────────────────────
//  TYPE → CSS CLASS
// ─────────────────────────────────────────────
const TYPE_CLASSES = {
  "journal article": "pub-type-journal",
  "book":            "pub-type-book",
  "book chapter":    "pub-type-chapter",
  "open access":     "pub-type-open",
  "non-refereed":    "pub-type-non",
  "book review":     "pub-type-review",
};
function typeClass(type) { return TYPE_CLASSES[type.toLowerCase()] || "pub-type-default"; }

// ─────────────────────────────────────────────
//  MAP SETUP
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
//  RENDER PUBLICATIONS
// ─────────────────────────────────────────────
function publicationMarkup(pub) {
  const tags = [...(pub.themes||[]), ...(pub.sports||[]), ...(pub.methods||[])]
    .map(t => `<span class="pub-tag">${t}</span>`).join("");
  const citation = buildCitation(pub, "Amara, M.");
  return `
    <span class="pub-type ${typeClass(pub.type)}">${pub.type}</span>
    <p class="pub-title">${pub.title} <span class="pub-year">(${pub.year})</span></p>
    ${tags ? `<div class="pub-meta-tags">${tags}</div>` : ""}
    <div class="pub-actions">
      <a class="pub-link" href="${pub.link}" target="_blank" rel="noopener">Open ↗</a>
      <button class="cite-btn" data-citation="${encodeURIComponent(citation)}" type="button">📋 Cite</button>
    </div>
  `;
}

function renderPublications(entry) {
  pubLocationTag.textContent = entry.region;
  panelTitle.textContent = `${entry.capital}, ${entry.country}`;
  publicationList.innerHTML = "";

  const allThemes = new Set();
  (entry.publications || []).forEach(p => (p.themes||[]).forEach(t => allThemes.add(t)));
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

  // Wire up cite buttons
  publicationList.querySelectorAll(".cite-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const text = decodeURIComponent(btn.dataset.citation);
      navigator.clipboard.writeText(text).then(showToast).catch(() => {
        // Fallback for older browsers
        const ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        document.execCommand("copy"); document.body.removeChild(ta);
        showToast();
      });
    });
  });

  const seeAll = document.createElement("li");
  seeAll.style.cssText = "border:none!important;padding:0;background:none!important;box-shadow:none!important;";
  seeAll.innerHTML = `<a class="see-all-link" href="http://qufaculty.qu.edu.qa/mamara/publications/" target="_blank" rel="noopener">See Full Publication Profile ↗</a>`;
  publicationList.appendChild(seeAll);
}

// ─────────────────────────────────────────────
//  COUNTRY LIST
// ─────────────────────────────────────────────
function buildCountryList(data, markersByCountry, activeRegion, searchTerm) {
  countryListEl.innerHTML = "";
  const visible = data.filter(e =>
    (activeRegion === "all" || e.region === activeRegion) &&
    e.country.toLowerCase().includes(searchTerm)
  );
  visible.forEach(entry => {
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
    visible.some(e => e.country === country) ? marker.addTo(map) : marker.removeFrom(map);
  }
  if (visible.length > 0) {
    map.fitBounds(L.latLngBounds(visible.map(e => [e.lat, e.lng])).pad(0.2));
  }
}

// ─────────────────────────────────────────────
//  THEMES VIEW
// ─────────────────────────────────────────────
function buildThemeView(data) {
  const themeSet = new Set(), sportSet = new Set(), methodSet = new Set();
  data.forEach(e => (e.publications||[]).forEach(p => {
    (p.themes||[]).forEach(t => themeSet.add(t));
    (p.sports||[]).forEach(s => sportSet.add(s));
    (p.methods||[]).forEach(m => methodSet.add(m));
  }));

  function makeChips(id, items, attr) {
    const el = document.getElementById(id);
    [...items].sort().forEach(item => {
      const btn = document.createElement("button");
      btn.className = "chip"; btn.type = "button";
      btn.dataset[attr] = item; btn.textContent = item;
      btn.addEventListener("click", () => { btn.classList.toggle("is-active"); applyThemeFilters(data); });
      el.appendChild(btn);
    });
  }
  makeChips("theme-chips", themeSet, "theme");
  makeChips("sport-chips", sportSet, "sport");
  makeChips("method-chips", methodSet, "method");

  document.querySelectorAll("[data-period]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-period]").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active"); applyThemeFilters(data);
    });
  });
  document.getElementById("theme-search").addEventListener("input", () => applyThemeFilters(data));
  applyThemeFilters(data);
}

function applyThemeFilters(data) {
  const activeThemes  = [...document.querySelectorAll("#theme-chips .chip.is-active")].map(c => c.dataset.theme);
  const activeSports  = [...document.querySelectorAll("#sport-chips .chip.is-active")].map(c => c.dataset.sport);
  const activeMethods = [...document.querySelectorAll("#method-chips .chip.is-active")].map(c => c.dataset.method);
  const period        = document.querySelector("[data-period].is-active")?.dataset.period || "all";
  const search        = document.getElementById("theme-search").value.trim().toLowerCase();

  const results = [];
  data.forEach(entry => {
    (entry.publications||[]).forEach(pub => {
      if (activeThemes.length  && !activeThemes.some(t  => (pub.themes||[]).includes(t)))  return;
      if (activeSports.length  && !activeSports.some(s  => (pub.sports||[]).includes(s)))  return;
      if (activeMethods.length && !activeMethods.some(m => (pub.methods||[]).includes(m))) return;
      if (period === "pre2010"   && pub.year >= 2010) return;
      if (period === "2010-2020" && (pub.year < 2010 || pub.year > 2020)) return;
      if (period === "post2020"  && pub.year <= 2020) return;
      if (search && !pub.title.toLowerCase().includes(search) &&
          !(pub.themes||[]).some(t => t.toLowerCase().includes(search)) &&
          !entry.country.toLowerCase().includes(search)) return;
      results.push({ entry, pub });
    });
  });

  results.sort((a,b) => b.pub.year - a.pub.year);
  document.getElementById("theme-results-meta").textContent =
    `${results.length} publication${results.length !== 1 ? "s" : ""} match your filters`;

  const list = document.getElementById("theme-results");
  list.innerHTML = "";
  results.forEach(({ entry, pub }) => {
    const tags = [...(pub.themes||[]), ...(pub.sports||[]), ...(pub.methods||[])]
      .map(t => `<span class="pub-tag">${t}</span>`).join("");
    const citation = buildCitation(pub, "Amara, M.");
    const item = document.createElement("li");
    item.innerHTML = `
      <div class="result-country">${entry.country} · ${entry.capital}</div>
      <span class="pub-type ${typeClass(pub.type)}">${pub.type}</span>
      <p class="pub-title">${pub.title} <span class="pub-year">(${pub.year})</span></p>
      ${tags ? `<div class="pub-meta-tags">${tags}</div>` : ""}
      <div class="pub-actions">
        <a class="pub-link" href="${pub.link}" target="_blank" rel="noopener">Open ↗</a>
        <button class="cite-btn" data-citation="${encodeURIComponent(citation)}" type="button">📋 Cite</button>
      </div>
    `;
    list.appendChild(item);
  });

  // Wire cite buttons in theme results
  list.querySelectorAll(".cite-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const text = decodeURIComponent(btn.dataset.citation);
      navigator.clipboard.writeText(text).then(showToast).catch(() => {
        const ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        document.execCommand("copy"); document.body.removeChild(ta);
        showToast();
      });
    });
  });
}

// ─────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────
async function init() {
  const response = await fetch("data/publications.json");
  const data = await response.json();

  const totalPubs = data.reduce((s, e) => s + (e.publications?.length || 0), 0);
  statPubs.textContent = totalPubs;
  statCountries.textContent = data.length;

  buildFeaturedBar();
  buildLatestStrip(data);

  const markersByCountry = new Map();
  data.forEach(entry => {
    const count = entry.publications?.length || 0;
    const marker = L.marker([entry.lat, entry.lng], { icon: makeIcon(count) });
    marker.bindTooltip(
      `<strong>${entry.capital}</strong>, ${entry.country}<br><small>${count} publication${count!==1?"s":""}</small>`,
      { direction: "top", offset: [0, -14] }
    );
    marker.on("click", () => renderPublications(entry));
    markersByCountry.set(entry.country, marker);
  });

  let activeRegion = "all";
  function refresh() {
    buildCountryList(data, markersByCountry, activeRegion, countrySearch.value.trim().toLowerCase());
  }
  regionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      activeRegion = btn.dataset.region;
      regionButtons.forEach(b => b.classList.toggle("is-active", b === btn));
      refresh();
    });
  });
  countrySearch.addEventListener("input", refresh);
  refresh();
  renderPublications(data[0]);
  buildThemeView(data);
}

init().catch(err => {
  panelTitle.textContent = "Unable to load data";
  panelSubtitle.textContent = "Please check that data/publications.json is present.";
  console.error(err);
});
