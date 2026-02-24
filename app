const panelTitle = document.getElementById("panel-title");
const panelSubtitle = document.getElementById("panel-subtitle");
const pubLocationTag = document.getElementById("pub-location-tag");
const publicationList = document.getElementById("publication-list");
const countrySearch = document.getElementById("country-search");
const countryListEl = document.getElementById("country-list");
const regionButtons = document.querySelectorAll(".region-btn");
const statPubs = document.getElementById("stat-pubs");
const statCountries = document.getElementById("stat-countries");

const TYPE_CLASSES = {
  "journal article": "pub-type-journal",
  "book": "pub-type-book",
  "book chapter": "pub-type-chapter",
  "open access": "pub-type-open",
  "non-refereed": "pub-type-non",
  "book review": "pub-type-review",
};

function typeClass(type) {
  return TYPE_CLASSES[type.toLowerCase()] || "pub-type-default";
}

const map = L.map("map", { minZoom: 2, maxZoom: 10 }).setView([25, 10], 4);

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
}).addTo(map);

function makeIcon(count) {
  const size = count > 10 ? 36 : count > 5 ? 32 : 28;
  return L.divIcon({
    className: "",
    html: `<div style="
      width:${size}px; height:${size}px;
      background:#8b3a1e;
      border:2.5px solid #fff;
      border-radius:50%;
      box-shadow:0 2px 8px rgba(0,0,0,0.25);
      display:flex; align-items:center; justify-content:center;
      color:#fff; font-family:'Source Sans 3',sans-serif;
      font-size:${size > 32 ? 12 : 11}px; font-weight:700;
      cursor:pointer;
      transition: transform 0.15s;
    ">${count}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function publicationMarkup(pub) {
  return `
    <span class="pub-type ${typeClass(pub.type)}">${pub.type}</span>
    <p class="pub-title">${pub.title} <span class="pub-year">(${pub.year})</span></p>
    <a class="pub-link" href="${pub.link}" target="_blank" rel="noopener">Open publication ↗</a>
  `;
}

function renderPublications(entry) {
  pubLocationTag.textContent = entry.region;
  panelTitle.textContent = `${entry.capital}, ${entry.country}`;
  publicationList.innerHTML = "";

  if (!entry.publications?.length) {
    panelSubtitle.textContent = "No publications listed for this country yet.";
    const item = document.createElement("li");
    item.innerHTML = `<a class="see-all-link" href="http://qufaculty.qu.edu.qa/mamara/publications/" target="_blank" rel="noopener">See Full Publications ↗</a>`;
    publicationList.appendChild(item);
    return;
  }

  panelSubtitle.textContent = `${entry.publications.length} publication${entry.publications.length > 1 ? "s" : ""} linked to this country`;

  entry.publications.forEach((pub) => {
    const item = document.createElement("li");
    item.innerHTML = publicationMarkup(pub);
    publicationList.appendChild(item);
  });

  const seeAll = document.createElement("li");
  seeAll.style.cssText = "border:none!important; padding:0; background:none!important; box-shadow:none!important;";
  seeAll.innerHTML = `<a class="see-all-link" href="http://qufaculty.qu.edu.qa/mamara/publications/" target="_blank" rel="noopener">See Full Publication Profile ↗</a>`;
  publicationList.appendChild(seeAll);
}

function buildCountryList(data, markersByCountry, activeRegion, searchTerm) {
  countryListEl.innerHTML = "";

  const visibleEntries = data.filter((entry) => {
    const regionOk = activeRegion === "all" || entry.region === activeRegion;
    const searchOk = entry.country.toLowerCase().includes(searchTerm);
    return regionOk && searchOk;
  });

  visibleEntries.forEach((entry) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "country-item";
    button.innerHTML = `
      <span>${entry.country} <small style="color:var(--ink-muted)">${entry.capital}</small></span>
      <span class="count-badge">${entry.publications?.length || 0}</span>
    `;
    button.addEventListener("click", () => {
      map.flyTo([entry.lat, entry.lng], 6, { duration: 0.8 });
      markersByCountry.get(entry.country).openTooltip();
      renderPublications(entry);
    });
    countryListEl.appendChild(button);
  });

  for (const [country, marker] of markersByCountry.entries()) {
    const isVisible = visibleEntries.some((e) => e.country === country);
    isVisible ? marker.addTo(map) : marker.removeFrom(map);
  }

  if (visibleEntries.length > 0) {
    const bounds = L.latLngBounds(visibleEntries.map((e) => [e.lat, e.lng]));
    map.fitBounds(bounds.pad(0.2));
  }
}

async function init() {
  const response = await fetch("data/publications.json");
  const data = await response.json();

  // Update header stats
  const totalPubs = data.reduce((sum, e) => sum + (e.publications?.length || 0), 0);
  statPubs.textContent = totalPubs;
  statCountries.textContent = data.length;

  const markersByCountry = new Map();

  data.forEach((entry) => {
    const count = entry.publications?.length || 0;
    const marker = L.marker([entry.lat, entry.lng], { icon: makeIcon(count) });
    marker.bindTooltip(`<strong>${entry.capital}</strong>, ${entry.country}<br><small>${count} publication${count !== 1 ? "s" : ""}</small>`, {
      direction: "top",
      offset: [0, -14],
    });
    marker.on("click", () => {
      renderPublications(entry);
      // Highlight active
      document.querySelectorAll(".country-item").forEach(b => b.classList.remove("active"));
    });
    markersByCountry.set(entry.country, marker);
  });

  let activeRegion = "all";

  function refreshListAndMap() {
    const searchTerm = countrySearch.value.trim().toLowerCase();
    buildCountryList(data, markersByCountry, activeRegion, searchTerm);
  }

  regionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeRegion = button.dataset.region;
      regionButtons.forEach((btn) => btn.classList.toggle("is-active", btn === button));
      refreshListAndMap();
    });
  });

  countrySearch.addEventListener("input", refreshListAndMap);
  refreshListAndMap();

  // Show first country (Algeria) by default
  renderPublications(data[0]);
}

init().catch((error) => {
  panelTitle.textContent = "Unable to load data";
  panelSubtitle.textContent = "Please check that data/publications.json is present.";
  console.error(error);
});
