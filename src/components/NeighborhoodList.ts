import { Neighborhood, neighborhoods } from '../data/demographics'

// Neighborhood list component - renders the territory map data
export class NeighborhoodList {
  private container: HTMLElement
  private filter: string = 'all'
  private searchQuery: string = ''

  constructor(container: HTMLElement) {
    this.container = container
    this.render()
  }

  private getFiltered(): Neighborhood[] {
    let filtered = neighborhoods

    // Filter by city
    if (this.filter !== 'all') {
      filtered = filtered.filter(n => n.city === this.filter)
    }

    // Search query
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase()
      filtered = filtered.filter(n =>
        n.name.toLowerCase().includes(q) ||
        n.territory.toLowerCase().includes(q) ||
        n.id.toLowerCase().includes(q)
      )
    }

    return filtered
  }

  private render() {
    const filtered = this.getFiltered()

    // City filter
    const cities = ['All', ...Array.from(new Set(neighborhoods.map(n => n.city)))]

    this.container.innerHTML = `
      <div class="neighborhood-header">
        <h1 class="app-title">Territory Mapping Dashboard</h1>
        <p class="app-subtitle">Neighborhood demographic and mapping data</p>
        <div class="city-filter">
          ${cities.map(city => `
            <button class="city-filter-btn ${this.filter === city ? 'active' : ''}" data-city="${city}">
              ${city}
            </button>
          `).join('')}
        </div>
        <div class="stats">
          <span id="neighborhoods-count">${filtered.length}</span>
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
        ${filtered.map(n => this.renderNeighborhood(n)).join('')}
      </div>
      ${filtered.length === 0 ? '<p class="empty-state">No neighborhoods match your criteria.</p>' : ''}
    `

    // City filter buttons
    this.container.querySelectorAll('.city-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('.city-filter-btn').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        this.filter = (btn as HTMLElement).dataset.city || 'all'
        this.searchQuery = ''
        const searchInput = this.container.querySelector('#neighborhood-search')
        if (searchInput instanceof HTMLInputElement) searchInput.value = ''
        this.render()
      })
    })

    // Search input
    const searchInput = this.container.querySelector('#neighborhood-search')
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = (e.target as HTMLInputElement).value
        this.render()
      })
    }
  }

  private renderNeighborhood(n: any): string {
        return `
      <div class="neighborhood-card">
        <div class="neighborhood-header-row">
          <div class="neighborhood-info">
            <h2 class="neighborhood-name">${n.name}</h2>
            <p class="neighborhood-city">${n.city} &mdash; ${n.territory}</p>
            <p class="neighborhood-districts">Key districts: ${n.keyDistricts.join(', ')}</p>
          </div>
          <div class="neighborhood-stats">
            <div class="stat-item">
              <span class="stat-value">${n.population.toLocaleString()}</span>
              <span class="stat-label">Population</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">${n.medianAge.toFixed(1)}</span>
              <span class="stat-label">Median Age</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">$${n.householdIncome.toLocaleString()}</span>
              <span class="stat-label">Household Income</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">$${n.medianHomeValue.toLocaleString()}</span>
              <span class="stat-label">Home Value</span>
            </div>
          </div>
        </div>
        <div class="neighborhood-detail">
          <div class="detail-section">
            <h3>Language Breakdown</h3>
            <div class="language-breakdown">
              ${Object.entries(n.languageBreakdown).map(([lang, pct]) => `
                <div class="lang-item">
                  <span class="lang-name">${lang}</span>
                  <div class="lang-bar">
                    <div class="lang-fill" style="width: ${pct}%"></div>
                  </div>
                  <span class="lang-pct">${pct}%</span>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="detail-section">
            <h3>Religious Affiliation</h3>
            <div class="religion-breakdown">
              ${Object.entries(n.religiousAffiliation).map(([rel, pct]) => `
                <div class="rel-item">
                  <span class="rel-name">${rel.replace(/_/g, ' ')}</span>
                  <div class="rel-bar">
                    <div class="rel-fill" style="width: ${pct}%"></div>
                  </div>
                  <span class="rel-pct">${pct}%</span>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="detail-section">
            <h3>Accessibility &amp; Education</h3>
            <div class="accessibility-grid">
              <div class="access-item">
                <span class="access-value">${n.accessibilityScore}/100</span>
                <span class="access-label">Accessibility Score</span>
              </div>
              <div class="access-item">
                <span class="access-value">${n.educationLevel}%</span>
                <span class="access-label">Education Level</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
}
