// ─────────────────────────────────────────────
//  FEATURED PUBLICATIONS
// ─────────────────────────────────────────────
const FEATURED = [
  { title: "Sport, Politics and Society in the Arab World", year: 2012, link: "https://link.springer.com/book/10.1057/9780230359505", label: "Palgrave Macmillan" },
  { title: "The 2022 FIFA World Cup in Qatar", year: 2024, link: "https://doi.org/10.4324/9781003453246", label: "Routledge" },
  { title: "Sport in the African World", year: 2018, link: "https://www.routledge.com/Sport-in-the-African-World/Nauright-Amara/p/book/9780815380641", label: "Routledge" },
  { title: "The Olympic Movement and the MENA Region", year: 2017, link: "https://www.tandfonline.com/toc/fhsp20/34/13", label: "Tandfonline" },
  { title: "Sport in Islam and Muslim Communities", year: 2015, link: "https://www.routledge.com/Sport-in-Islam-and-in-Muslim-Communities/Testa-Amara/p/book/9781138815421", label: "Routledge" },
];

// ─────────────────────────────────────────────
//  READING PATHWAYS
// ─────────────────────────────────────────────
const PATHWAYS = [
  {
    id: "intro",
    eyebrow: "Pathway A · Foundations",
    title: "Introduction to Sport & Arab Politics",
    desc: "The essential starting point. Four publications that establish the theoretical and historical framework for understanding sport as a political and social phenomenon in the Arab world.",
    steps: [
      { title: "Sport, Politics and Society in the Arab World", year: 2012, note: "Start here — the foundational text surveying the entire field", link: "https://link.springer.com/book/10.1057/9780230359505" },
      { title: "Sport, Arab nationalism and the Pan-Arab Games", year: 2003, note: "Historical roots — how sport became an instrument of Arab nationalism", link: "https://doi.org/10.1177/1012690203038003005" },
      { title: "Sport in the Arab World in Postcolonial Context", year: 2016, note: "Theoretical grounding in post-colonial studies", link: "https://aucpress.com/product/cairo-papers-vol-34-no-1/" },
      { title: "Sport and Political Leaders in the Arab world", year: 2014, note: "Case studies of how leaders across the region instrumentalise sport", link: "http://www.histoire-politique.fr/index.php?numero=19&rub=revue" },
    ]
  },
  {
    id: "qatar",
    eyebrow: "Pathway B · Gulf & Mega-Events",
    title: "Qatar, the Gulf, and Sport Diplomacy",
    desc: "Traces how Qatar and the Gulf states have used sport as a tool of soft power, nation-branding, and geopolitical positioning — from the 2006 Asian Games to the 2022 World Cup.",
    steps: [
      { title: "A 'Modernization' Project from Above? Asian Games Qatar 2006", year: 2005, note: "The earliest critical analysis of Qatar's sport strategy", link: "https://doi.org/10.1080/17430430500249041" },
      { title: "Transnational network formation in the Arabian Peninsula", year: 2010, note: "How Gulf states built sport infrastructure and regional ties", link: "https://doi.org/10.1080/19406940903505479" },
      { title: "Culture and the World Cup: The Case of Qatar", year: 2022, note: "Identity and cultural politics on the global stage", link: "https://www.routledge.com/" },
      { title: "The 2022 FIFA World Cup in Qatar", year: 2024, note: "The definitive post-tournament assessment", link: "https://doi.org/10.4324/9781003453246" },
    ]
  },
  {
    id: "algeria",
    eyebrow: "Pathway C · Algeria Deep Dive",
    title: "Football, Politics & Identity in Algeria",
    desc: "A chronological journey through Dr Amara's most sustained body of research — showing how Algerian football evolved from post-colonial symbol to Hirak battleground over twenty years.",
    steps: [
      { title: "Between globalisation and local modernity: football in Algeria", year: 2004, note: "The starting point — globalisation meets local culture", link: "https://doi.org/10.1080/1466097042000235651" },
      { title: "Football Sub-Culture and Youth Politics in Algeria", year: 2012, note: "Ultras, youth mobilisation, and political space", link: "https://doi.org/10.1080/13629395.2011.638994" },
      { title: "Football in Algeria from the 'Black Decade' to the Hirak", year: 2022, note: "The long arc from civil war to protest movement", link: "https://merip.org/2022/11/football-in-algeria-from-the-black-decade-to-the-hirak/" },
      { title: "Living Football, Navigating Politics: Salah Assad's Life Story", year: 2025, note: "Most recent work — biography as a lens on history", link: "https://doi.org/10.1080/09523367.2025.2479455" },
    ]
  },
  {
    id: "islam",
    eyebrow: "Pathway D · Islam & Sport",
    title: "Islam, Identity, and the Sporting Body",
    desc: "For readers interested in how Islamic values, institutions, and communities shape sport practice — and how sport shapes Muslim identities globally and in the Arab world specifically.",
    steps: [
      { title: "The Muslim World in the Global Sporting Arena", year: 2008, note: "Entry point — the Muslim athlete in global sport", link: "https://bjwa.brown.edu/14-2/the-muslim-world-in-the-global-sporting-arena/" },
      { title: "The 2022 FIFA World Cup, between Soccer and Faith", year: 2022, note: "Religion, spectacle, and identity at the Qatar World Cup", link: "https://obsreligion.cnrs.fr/bulletin/the-2022-fifa-world-cup-between-soccer-and-faith-english-version/" },
      { title: "Sport in Islam and Muslim Communities", year: 2015, note: "The edited volume — deepest treatment of the theme", link: "https://www.routledge.com/Sport-in-Islam-and-in-Muslim-Communities/Testa-Amara/p/book/9781138815421" },
    ]
  },
];

// ─────────────────────────────────────────────
//  DOM REFS
// ─────────────────────────────────────────────
const panelTitle      = document.getElementById("panel-title");
const panelSubtitle   = document.getElementById("panel-subtitle");
const pubLocationTag  = document.getElementById("pub-location-tag");
const pubThemeChips   = document.getElementById("pub-theme-chips");
const publicationList = document.getElementById("publication-list");
const contextCard     = document.getElementById("context-card");
const collabPanel     = document.getElementById("collab-panel");
const countrySearch   = document.getElementById("country-search");
const countryListEl   = document.getElementById("country-list");
const regionButtons   = document.querySelectorAll(".region-btn");
const layerButtons    = document.querySelectorAll(".layer-btn");
const statPubs        = document.getElementById("stat-pubs");
const statCountries   = document.getElementById("stat-countries");
const tabButtons      = document.querySelectorAll(".tab-btn");
const citeToast       = document.getElementById("cite-toast");
const tabViews = {
  map:      document.getElementById("tab-map"),
  pathways: document.getElementById("tab-pathways"),
  themes:   document.getElementById("tab-themes"),
};

// ─────────────────────────────────────────────
//  ABOUT MODAL
// ─────────────────────────────────────────────
const overlay    = document.getElementById("about-overlay");
const closeBtn   = document.getElementById("about-close");
const startBtn   = document.getElementById("about-start");
const triggerBtn = document.getElementById("about-trigger");
function closeAbout() { overlay.classList.add("hidden"); }
closeBtn.addEventListener("click", closeAbout);
startBtn.addEventListener("click", closeAbout);
triggerBtn.addEventListener("click", () => overlay.classList.remove("hidden"));
overlay.addEventListener("click", e => { if (e.target === overlay) closeAbout(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeAbout(); });

// ─────────────────────────────────────────────
//  TAB SWITCHING
// ─────────────────────────────────────────────
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => { b.classList.remove("is-active"); b.setAttribute("aria-selected","false"); });
    btn.classList.add("is-active"); btn.setAttribute("aria-selected","true");
    Object.values(tabViews).forEach(v => v.classList.remove("is-active"));
    tabViews[btn.dataset.tab].classList.add("is-active");
  });
});

// ─────────────────────────────────────────────
//  MAP LAYER TOGGLE
// ─────────────────────────────────────────────
let activeLayer = "publications";
layerButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    activeLayer = btn.dataset.layer;
    layerButtons.forEach(b => b.classList.toggle("is-active", b === btn));
    if (currentEntry) renderPublications(currentEntry);
  });
});

// ─────────────────────────────────────────────
//  FEATURED BAR
// ─────────────────────────────────────────────
function buildFeaturedBar() {
  const container = document.getElementById("featured-items");
  FEATURED.forEach(f => {
    const a = document.createElement("a");
    a.className = "featured-chip";
    a.href = f.link; a.target = "_blank"; a.rel = "noopener";
    a.innerHTML = `${f.title} <span class="featured-chip-year">${f.year}</span>`;
    container.appendChild(a);
  });
}

// ─────────────────────────────────────────────
//  LATEST STRIP
// ─────────────────────────────────────────────
function buildLatestStrip(data) {
  const all = [];
  data.forEach(e => (e.publications||[]).forEach(p => all.push(p)));
  all.sort((a,b) => b.year - a.year);
  const container = document.getElementById("latest-items");
  all.slice(0,3).forEach(pub => {
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
function buildCitation(pub) {
  return `Amara, M. (${pub.year}). ${pub.title}. ${pub.link}`;
}
function wireCiteButtons(container) {
  container.querySelectorAll(".cite-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const text = decodeURIComponent(btn.dataset.citation);
      navigator.clipboard.writeText(text).then(showToast).catch(() => {
        const ta = document.createElement("textarea");
        ta.value = text; ta.style.cssText = "position:fixed;opacity:0;";
        document.body.appendChild(ta); ta.select();
        document.execCommand("copy"); document.body.removeChild(ta);
        showToast();
      });
    });
  });
}

// ─────────────────────────────────────────────
//  TYPE → CSS CLASS
// ─────────────────────────────────────────────
const TYPE_CLASSES = {
  "journal article":"pub-type-journal","book":"pub-type-book",
  "book chapter":"pub-type-chapter","open access":"pub-type-open",
  "non-refereed":"pub-type-non","book review":"pub-type-review",
};
function typeClass(t) { return TYPE_CLASSES[t.toLowerCase()] || "pub-type-default"; }

// ─────────────────────────────────────────────
//  MAP SETUP
// ─────────────────────────────────────────────
const map = L.map("map", { minZoom:2, maxZoom:10 }).setView([25,10],4);
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  maxZoom:19,
  attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
}).addTo(map);

function makeIcon(count, layer) {
  const isCollab = layer === "collaborators";
  const bg = isCollab ? "#1a4d3a" : "#8b3a1e";
  const size = count > 5 ? 36 : count > 2 ? 32 : count > 0 ? 28 : 22;
  const label = count > 0 ? count : "–";
  return L.divIcon({
    className: "",
    html: `<div style="width:${size}px;height:${size}px;background:${bg};border:2.5px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;color:#fff;font-family:'Source Sans 3',sans-serif;font-size:${size>32?12:11}px;font-weight:700;cursor:pointer;">${label}</div>`,
    iconSize:[size,size], iconAnchor:[size/2,size/2],
  });
}

// ─────────────────────────────────────────────
//  RENDER COUNTRY PANEL
// ─────────────────────────────────────────────
let currentEntry = null;

function publicationMarkup(pub) {
  const tags = [...(pub.themes||[]),...(pub.sports||[]),...(pub.methods||[])]
    .map(t=>`<span class="pub-tag">${t}</span>`).join("");
  const cit = encodeURIComponent(buildCitation(pub));
  return `
    <span class="pub-type ${typeClass(pub.type)}">${pub.type}</span>
    <p class="pub-title">${pub.title} <span class="pub-year">(${pub.year})</span></p>
    ${tags?`<div class="pub-meta-tags">${tags}</div>`:""}
    <div class="pub-actions">
      <a class="pub-link" href="${pub.link}" target="_blank" rel="noopener">Open ↗</a>
      <button class="cite-btn" data-citation="${cit}" type="button">📋 Cite</button>
    </div>`;
}

function renderPublications(entry) {
  currentEntry = entry;
  pubLocationTag.textContent = entry.region;
  panelTitle.textContent = `${entry.capital}, ${entry.country}`;
  publicationList.innerHTML = "";

  // Theme chips
  const allThemes = new Set();
  (entry.publications||[]).forEach(p => (p.themes||[]).forEach(t => allThemes.add(t)));
  pubThemeChips.innerHTML = [...allThemes].map(t=>`<span class="pub-theme-chip">${t}</span>`).join("");

  // ── CONTEXT CARD ──
  if (entry.context) {
    contextCard.classList.remove("hidden");
    contextCard.innerHTML = `<div class="context-card-label">Research Context</div>${entry.context}`;
  } else {
    contextCard.classList.add("hidden");
  }

  // ── COLLABORATORS PANEL ──
  if (activeLayer === "collaborators") {
    collabPanel.classList.remove("hidden");
    const collabs = entry.collaborators || [];
    collabPanel.innerHTML = `<div class="collab-panel-label">🤝 Collaborators linked to ${entry.country}</div>` +
      (collabs.length
        ? `<div class="collab-list">${collabs.map(c=>`<span class="collab-chip">${c}</span>`).join("")}</div>`
        : `<p class="collab-none">No named collaborators recorded for this country.</p>`);
  } else {
    collabPanel.classList.add("hidden");
  }

  if (!entry.publications?.length) {
    panelSubtitle.textContent = "No publications listed for this country yet.";
    const item = document.createElement("li");
    item.innerHTML = `<a class="see-all-link" href="http://qufaculty.qu.edu.qa/mamara/publications/" target="_blank" rel="noopener">See Full Publications ↗</a>`;
    publicationList.appendChild(item);
    return;
  }

  panelSubtitle.textContent = `${entry.publications.length} publication${entry.publications.length>1?"s":""} linked to this country`;

  entry.publications.forEach(pub => {
    const item = document.createElement("li");
    item.innerHTML = publicationMarkup(pub);
    publicationList.appendChild(item);
  });

  wireCiteButtons(publicationList);

  const seeAll = document.createElement("li");
  seeAll.style.cssText = "border:none!important;padding:0;background:none!important;box-shadow:none!important;";
  seeAll.innerHTML = `<a class="see-all-link" href="http://qufaculty.qu.edu.qa/mamara/publications/" target="_blank" rel="noopener">See Full Publication Profile ↗</a>`;
  publicationList.appendChild(seeAll);
}

// ─────────────────────────────────────────────
//  COUNTRY LIST + MAP MARKERS
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
    const count = activeLayer === "collaborators"
      ? (entry.collaborators||[]).length
      : (entry.publications||[]).length;
    btn.innerHTML = `<span>${entry.country} <small style="color:var(--ink-muted)">${entry.capital}</small></span><span class="count-badge">${count}</span>`;
    btn.addEventListener("click", () => {
      map.flyTo([entry.lat,entry.lng],6,{duration:0.8});
      markersByCountry.get(entry.country).openTooltip();
      renderPublications(entry);
    });
    countryListEl.appendChild(btn);
  });

  // Update markers
  for (const [country, marker] of markersByCountry.entries()) {
    const entry = data.find(e=>e.country===country);
    if (!entry) continue;
    const count = activeLayer==="collaborators"
      ? (entry.collaborators||[]).length
      : (entry.publications||[]).length;
    marker.setIcon(makeIcon(count, activeLayer));
    const tooltip = activeLayer==="collaborators"
      ? `<strong>${entry.capital}</strong>, ${entry.country}<br><small>${count} collaborator${count!==1?"s":""}</small>`
      : `<strong>${entry.capital}</strong>, ${entry.country}<br><small>${count} publication${count!==1?"s":""}</small>`;
    marker.bindTooltip(tooltip, {direction:"top",offset:[0,-14]});
    visible.some(e=>e.country===country) ? marker.addTo(map) : marker.removeFrom(map);
  }
  if (visible.length > 0) {
    map.fitBounds(L.latLngBounds(visible.map(e=>[e.lat,e.lng])).pad(0.2));
  }
}

// ─────────────────────────────────────────────
//  READING PATHWAYS
// ─────────────────────────────────────────────
function buildPathways() {
  const grid = document.getElementById("pathways-grid");
  PATHWAYS.forEach(pw => {
    const card = document.createElement("div");
    card.className = "pathway-card";
    const steps = pw.steps.map((s,i) => `
      <li class="pathway-step">
        <span class="pathway-step-num">${i+1}</span>
        <div class="pathway-step-body">
          <div class="pathway-step-title">${s.title} <span style="color:var(--ink-muted);font-weight:400;font-size:0.75rem">(${s.year})</span></div>
          <div class="pathway-step-note">${s.note}</div>
          <a class="pathway-step-link" href="${s.link}" target="_blank" rel="noopener">Open publication ↗</a>
        </div>
      </li>`).join("");
    card.innerHTML = `
      <div class="pathway-header">
        <div class="pathway-eyebrow">${pw.eyebrow}</div>
        <div class="pathway-title">${pw.title}</div>
        <div class="pathway-desc">${pw.desc}</div>
      </div>
      <ul class="pathway-steps">${steps}</ul>`;
    grid.appendChild(card);
  });
}

// ─────────────────────────────────────────────
//  THEMES VIEW
// ─────────────────────────────────────────────
function buildThemeView(data) {
  const themeSet=new Set(), sportSet=new Set(), methodSet=new Set();
  data.forEach(e=>(e.publications||[]).forEach(p=>{
    (p.themes||[]).forEach(t=>themeSet.add(t));
    (p.sports||[]).forEach(s=>sportSet.add(s));
    (p.methods||[]).forEach(m=>methodSet.add(m));
  }));
  function makeChips(id,items,attr){
    const el=document.getElementById(id);
    [...items].sort().forEach(item=>{
      const btn=document.createElement("button");
      btn.className="chip";btn.type="button";btn.dataset[attr]=item;btn.textContent=item;
      btn.addEventListener("click",()=>{btn.classList.toggle("is-active");applyThemeFilters(data);});
      el.appendChild(btn);
    });
  }
  makeChips("theme-chips",themeSet,"theme");
  makeChips("sport-chips",sportSet,"sport");
  makeChips("method-chips",methodSet,"method");
  document.querySelectorAll("[data-period]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      document.querySelectorAll("[data-period]").forEach(b=>b.classList.remove("is-active"));
      btn.classList.add("is-active"); applyThemeFilters(data);
    });
  });
  document.getElementById("theme-search").addEventListener("input",()=>applyThemeFilters(data));
  applyThemeFilters(data);
}

function applyThemeFilters(data) {
  const activeThemes  = [...document.querySelectorAll("#theme-chips .chip.is-active")].map(c=>c.dataset.theme);
  const activeSports  = [...document.querySelectorAll("#sport-chips .chip.is-active")].map(c=>c.dataset.sport);
  const activeMethods = [...document.querySelectorAll("#method-chips .chip.is-active")].map(c=>c.dataset.method);
  const period  = document.querySelector("[data-period].is-active")?.dataset.period||"all";
  const search  = document.getElementById("theme-search").value.trim().toLowerCase();

  const results=[];
  data.forEach(entry=>{
    (entry.publications||[]).forEach(pub=>{
      if(activeThemes.length  && !activeThemes.some(t=>(pub.themes||[]).includes(t)))  return;
      if(activeSports.length  && !activeSports.some(s=>(pub.sports||[]).includes(s)))  return;
      if(activeMethods.length && !activeMethods.some(m=>(pub.methods||[]).includes(m))) return;
      if(period==="pre2010"   && pub.year>=2010) return;
      if(period==="2010-2020" && (pub.year<2010||pub.year>2020)) return;
      if(period==="post2020"  && pub.year<=2020) return;
      if(search && !pub.title.toLowerCase().includes(search) &&
         !(pub.themes||[]).some(t=>t.toLowerCase().includes(search)) &&
         !entry.country.toLowerCase().includes(search)) return;
      results.push({entry,pub});
    });
  });

  results.sort((a,b)=>b.pub.year-a.pub.year);
  document.getElementById("theme-results-meta").textContent =
    `${results.length} publication${results.length!==1?"s":""} match your filters`;

  const list=document.getElementById("theme-results");
  list.innerHTML="";
  results.forEach(({entry,pub})=>{
    const tags=[...(pub.themes||[]),...(pub.sports||[]),...(pub.methods||[])]
      .map(t=>`<span class="pub-tag">${t}</span>`).join("");
    const cit=encodeURIComponent(buildCitation(pub));
    const item=document.createElement("li");
    item.innerHTML=`
      <div class="result-country">${entry.country} · ${entry.capital}</div>
      <span class="pub-type ${typeClass(pub.type)}">${pub.type}</span>
      <p class="pub-title">${pub.title} <span class="pub-year">(${pub.year})</span></p>
      ${tags?`<div class="pub-meta-tags">${tags}</div>`:""}
      <div class="pub-actions">
        <a class="pub-link" href="${pub.link}" target="_blank" rel="noopener">Open ↗</a>
        <button class="cite-btn" data-citation="${cit}" type="button">📋 Cite</button>
      </div>`;
    list.appendChild(item);
  });
  wireCiteButtons(list);
}

// ─────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────
async function init() {
  const response = await fetch("data/publications.json");
  const data = await response.json();

  statPubs.textContent = data.reduce((s,e)=>s+(e.publications?.length||0),0);
  statCountries.textContent = data.length;

  buildFeaturedBar();
  buildLatestStrip(data);
  buildPathways();
  buildThemeView(data);

  const markersByCountry = new Map();
  data.forEach(entry => {
    const count = entry.publications?.length||0;
    const marker = L.marker([entry.lat,entry.lng], {icon: makeIcon(count,"publications")});
    marker.bindTooltip(
      `<strong>${entry.capital}</strong>, ${entry.country}<br><small>${count} publication${count!==1?"s":""}</small>`,
      {direction:"top",offset:[0,-14]}
    );
    marker.on("click",()=>renderPublications(entry));
    markersByCountry.set(entry.country, marker);
  });

  let activeRegion = "all";
  function refresh() {
    buildCountryList(data, markersByCountry, activeRegion, countrySearch.value.trim().toLowerCase());
  }

  // Layer toggle also refreshes list and re-renders current entry
  layerButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      refresh();
    });
  });

  regionButtons.forEach(btn => {
    btn.addEventListener("click",()=>{
      activeRegion = btn.dataset.region;
      regionButtons.forEach(b=>b.classList.toggle("is-active",b===btn));
      refresh();
    });
  });
  countrySearch.addEventListener("input", refresh);
  refresh();
  renderPublications(data[0]);
}

init().catch(err=>{
  panelTitle.textContent = "Unable to load data";
  panelSubtitle.textContent = "Please check that data/publications.json is present.";
  console.error(err);
});
