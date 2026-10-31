import { neighborhoods, territoryMap } from '../data/demographics'
import { getByCity, getCityAverageIncome } from '../data/demographics'

// Map visualization component - renders the territory map
export class MapView {
  private container: HTMLElement

  constructor(container: HTMLElement) {
    this.container = container
    this.render()
  }

  private render() {
    // Get unique cities
    const cities = Array.from(new Set(neighborhoods.map(n => n.city)))

    this.container.innerHTML = `
      <div class="map-header">
        <h2 class="section-title">Territory Overview</h2>
        <div class="map-stats">
          <span>${cities.length} cities mapped</span>
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
          ${cities.map(city => `
            <div class="city-card" data-city="${city}">
              <div class="city-header">
                <span class="city-name">${city}</span>
                <span class="city-territories">
                  ${Array.from(territoryMap.get(city) || new Set()).join(', ')}
                </span>
              </div>
              <div class="city-stats">
                <div class="stat">
                  <span class="stat-value">${getByCity(city).reduce((s: number, n: any) => s + n.population, 0).toLocaleString()}</span>
                  <span class="stat-label">Total Population</span>
                </div>
                <div class="stat">
                  <span class="stat-value">$${getCityAverageIncome(city).toLocaleString()}</span>
                  <span class="stat-label">Avg Household Income</span>
                </div>
                <div class="stat">
                  <span class="stat-value">${getByCity(city).length}</span>
                  <span class="stat-label">Neighborhoods</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="map-notes">
          <h3>Map Legend &amp; Notes</h3>
          <p>This dashboard maps demographic data by territory. Click on city cards to explore neighborhood details.</p>
          <p>Data sources: Territory census, neighborhood surveys, and community reporting.</p>
        </div>
      </div>
    `

    // City card clicks
    this.container.querySelectorAll('.city-card').forEach(card => {
      card.addEventListener('click', () => {
        this.container.querySelectorAll('.city-card').forEach(c => c.classList.remove('active'))
        card.classList.add('active')
      })
    })
  }
}
