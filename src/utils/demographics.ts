// Demographic and mapping utility functions
export function formatPopulation(pop: number): string {
  if (pop >= 1000000) {
    return (pop / 1000000).toFixed(2) + 'M'
  }
  if (pop >= 1000) {
    return (pop / 1000).toFixed(1) + 'K'
  }
  return pop.toLocaleString()
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export function formatPercentage(pct: number): string {
  return pct.toFixed(1) + '%'
}

export function getPopulationDensityPopularity(n: { populationDensity: number }): string {
  if (n.populationDensity < 1000) return 'sparsely'
  if (n.populationDensity < 3000) return 'moderately'
  return 'densely'
}

export function getAccessibilityLabel(score: number): string {
  if (score >= 80) return 'excellent'
  if (score >= 60) return 'good'
  return 'limited'
}

export function getAverageIncomeLabel(income: number): string {
  if (income >= 100000) return 'high'
  if (income >= 70000) return 'moderate'
  return 'low'
}
