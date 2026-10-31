
import './style.css'
import { NeighborhoodList } from './components/NeighborhoodList'
import { MapView } from './components/MapView'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app')
  if (!container) return

  new NeighborhoodList(
    container.querySelector('#neighborhood-list') || container.appendChild(document.createElement('div'))
  )

  new MapView(
    container.querySelector('#map-view') || container.appendChild(document.createElement('div'))
  )
})
