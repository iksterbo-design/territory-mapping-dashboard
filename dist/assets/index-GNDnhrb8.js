(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`nb-001`,city:`Denver, CO`,territory:`Colorado`,name:`Capitol Hill`,population:52300,populationDensity:3820,medianAge:31.5,householdIncome:68e3,medianHomeValue:598e3,languageBreakdown:{english:76,spanish:16,chinese:2,tagalog:1.5,vietnamese:1,korean:.8,arabic:.5,other:2.2},religiousAffiliation:{protestant:38,roman_catholic:18,mormon:8,jewish:3,muslim:2,buddhist:1.5,hindu:.5,unaffiliated:29},keyDistricts:[`Platt Park`,`Fairmount`,`Sherman`,`York`],accessibilityScore:87,educationLevel:82},{id:`nb-002`,city:`Denver, CO`,territory:`Colorado`,name:`Lakewood`,population:151e3,populationDensity:2890,medianAge:38.2,householdIncome:82e3,medianHomeValue:512e3,languageBreakdown:{english:84,spanish:11,chinese:1,tagalog:.8,vietnamese:.5,korean:.3,arabic:.2,other:2.2},religiousAffiliation:{protestant:45,roman_catholic:14,mormon:6,jewish:2,muslim:1.5,buddhist:1,hindu:.3,unaffiliated:28.5},keyDistricts:[`Wheat Ridge`,`East Lakewood`,`West Lakewood`,`White Plains`],accessibilityScore:72,educationLevel:75},{id:`nb-003`,city:`Denver, CO`,territory:`Colorado`,name:`Aurora`,population:386e3,populationDensity:3120,medianAge:34.7,householdIncome:71e3,medianHomeValue:428e3,languageBreakdown:{english:71,spanish:22,chinese:2,tagalog:1.2,vietnamese:.8,korean:.5,arabic:.8,other:1.7},religiousAffiliation:{protestant:42,roman_catholic:12,mormon:5,jewish:1.5,muslim:2.5,buddhist:1.2,hindu:.8,unaffiliated:32.5},keyDistricts:[`Aurora Highlands`,`Foxfield`,`Parkland`,`Siridao`],accessibilityScore:84,educationLevel:71}],t=new Map;function n(t){return e.filter(e=>e.city===t)}function r(t){let n=e.filter(e=>e.city===t);return n.length===0?0:Math.round(n.reduce((e,t)=>e+t.householdIncome,0)/n.length)}var i=class{container;filter=`all`;searchQuery=``;constructor(e){this.container=e,this.render()}getFiltered(){let t=e;if(this.filter!==`all`&&(t=t.filter(e=>e.city===this.filter)),this.searchQuery.trim()){let e=this.searchQuery.trim().toLowerCase();t=t.filter(t=>t.name.toLowerCase().includes(e)||t.territory.toLowerCase().includes(e)||t.id.toLowerCase().includes(e))}return t}render(){let t=this.getFiltered(),n=[`All`,...Array.from(new Set(e.map(e=>e.city)))];this.container.innerHTML=`
      <div class="neighborhood-header">
        <h1 class="app-title">Territory Mapping Dashboard</h1>
        <p class="app-subtitle">Neighborhood demographic and mapping data</p>
        <div class="city-filter">
          ${n.map(e=>`
            <button class="city-filter-btn ${this.filter===e?`active`:``}" data-city="${e}">
              ${e}
            </button>
          `).join(``)}
        </div>
        <div class="stats">
          <span id="neighborhoods-count">${t.length}</span>
          <span id="neighborhoods-total">neighborhoods</span>
        </div>
        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            id="neighborhood-search"
            placeholder="Search neighborhood or territory..."
            autocomplete="off"
          />
        </div>
      </div>
      <div class="neighborhood-list" id="neighborhood-list">
        ${t.map(e=>this.renderNeighborhood(e)).join(``)}
      </div>
      ${t.length===0?`<p class="empty-state">No neighborhoods match your criteria.</p>`:``}
    `,this.container.querySelectorAll(`.city-filter-btn`).forEach(e=>{e.addEventListener(`click`,()=>{this.container.querySelectorAll(`.city-filter-btn`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),this.filter=e.dataset.city||`all`,this.searchQuery=``;let t=this.container.querySelector(`#neighborhood-search`);t instanceof HTMLInputElement&&(t.value=``),this.render()})});let r=this.container.querySelector(`#neighborhood-search`);r&&r.addEventListener(`input`,e=>{this.searchQuery=e.target.value,this.render()})}renderNeighborhood(e){return`
      <div class="neighborhood-card">
        <div class="neighborhood-header-row">
          <div class="neighborhood-info">
            <h2 class="neighborhood-name">${e.name}</h2>
            <p class="neighborhood-city">${e.city} &mdash; ${e.territory}</p>
            <p class="neighborhood-districts">Key districts: ${e.keyDistricts.join(`, `)}</p>
          </div>
          <div class="neighborhood-stats">
            <div class="stat-item">
              <span class="stat-value">${e.population.toLocaleString()}</span>
              <span class="stat-label">Population</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">${e.medianAge.toFixed(1)}</span>
              <span class="stat-label">Median Age</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">$${e.householdIncome.toLocaleString()}</span>
              <span class="stat-label">Household Income</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">$${e.medianHomeValue.toLocaleString()}</span>
              <span class="stat-label">Home Value</span>
            </div>
          </div>
        </div>
        <div class="neighborhood-detail">
          <div class="detail-section">
            <h3>Language Breakdown</h3>
            <div class="language-breakdown">
              ${Object.entries(e.languageBreakdown).map(([e,t])=>`
                <div class="lang-item">
                  <span class="lang-name">${e}</span>
                  <div class="lang-bar">
                    <div class="lang-fill" style="width: ${t}%"></div>
                  </div>
                  <span class="lang-pct">${t}%</span>
                </div>
              `).join(``)}
            </div>
          </div>
          <div class="detail-section">
            <h3>Religious Affiliation</h3>
            <div class="religion-breakdown">
              ${Object.entries(e.religiousAffiliation).map(([e,t])=>`
                <div class="rel-item">
                  <span class="rel-name">${e.replace(/_/g,` `)}</span>
                  <div class="rel-bar">
                    <div class="rel-fill" style="width: ${t}%"></div>
                  </div>
                  <span class="rel-pct">${t}%</span>
                </div>
              `).join(``)}
            </div>
          </div>
          <div class="detail-section">
            <h3>Accessibility &amp; Education</h3>
            <div class="accessibility-grid">
              <div class="access-item">
                <span class="access-value">${e.accessibilityScore}/100</span>
                <span class="access-label">Accessibility Score</span>
              </div>
              <div class="access-item">
                <span class="access-value">${e.educationLevel}%</span>
                <span class="access-label">Education Level</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}},a=class{container;constructor(e){this.container=e,this.render()}render(){let i=Array.from(new Set(e.map(e=>e.city)));this.container.innerHTML=`
      <div class="map-header">
        <h2 class="section-title">Territory Overview</h2>
        <div class="map-stats">
          <span>${i.length} cities mapped</span>
        </div>
      </div>
      <div class="map-container">
        <div class="map-legend">
          <div class="legend-item">
            <div class="legend-color" style="background: #3b82f6;"></div>
            <span>Lower Population Density</span>
          </div>
          <div class="legend-item">
            <div class="legend-color" style="background: #60a5fa;"></div>
            <span>Medium Density</span>
          </div>
          <div class="legend-item">
            <div class="legend-color" style="background: #93bbfc;"></div>
            <span>Higher Density</span>
          </div>
        </div>
        <div class="map-visualization">
          ${i.map(e=>`
            <div class="city-card" data-city="${e}">
              <div class="city-header">
                <span class="city-name">${e}</span>
                <span class="city-territories">
                  ${Array.from(t.get(e)||new Set).join(`, `)}
                </span>
              </div>
              <div class="city-stats">
                <div class="stat">
                  <span class="stat-value">${n(e).reduce((e,t)=>e+t.population,0).toLocaleString()}</span>
                  <span class="stat-label">Total Population</span>
                </div>
                <div class="stat">
                  <span class="stat-value">$${r(e).toLocaleString()}</span>
                  <span class="stat-label">Avg Household Income</span>
                </div>
                <div class="stat">
                  <span class="stat-value">${n(e).length}</span>
                  <span class="stat-label">Neighborhoods</span>
                </div>
              </div>
            </div>
          `).join(``)}
        </div>
        <div class="map-notes">
          <h3>Map Legend &amp; Notes</h3>
          <p>This dashboard maps demographic data by territory. Click on city cards to explore neighborhood details.</p>
          <p>Data sources: Territory census, neighborhood surveys, and community reporting.</p>
        </div>
      </div>
    `,this.container.querySelectorAll(`.city-card`).forEach(e=>{e.addEventListener(`click`,()=>{this.container.querySelectorAll(`.city-card`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`)})})}};document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`app`);e&&(new i(e.querySelector(`#neighborhood-list`)||e.appendChild(document.createElement(`div`))),new a(e.querySelector(`#map-view`)||e.appendChild(document.createElement(`div`))))});