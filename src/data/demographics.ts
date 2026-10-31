// Demographic and neighborhood data for territory mapping dashboard
// Contains city-level demographic data with neighborhood breakdowns.

export interface Neighborhood {
  id: string
  city: string
  territory: string
  name: string
  population: number
  populationDensity: number
  medianAge: number
  householdIncome: number
  medianHomeValue: number
  languageBreakdown: LanguageBreakdown
  religiousAffiliation: ReligiousBreakdown
  keyDistricts: string[]
  accessibilityScore: number
  educationLevel: number
}

export interface LanguageBreakdown {
  english: number
  spanish: number
  chinese: number
  tagalog: number
  vietnamese: number
  korean: number
  arabic: number
  other: number
}

export interface ReligiousBreakdown {
  protestant: number
  roman_catholic: number
  mormon: number
  jewish: number
  muslim: number
  buddhist: number
  hindu: number
  unaffiliated: number
}

// Sample neighborhood-level demographic data
export const neighborhoods = [
  {
    id: 'nb-001',
    city: 'Denver, CO',
    territory: 'Colorado',
    name: 'Capitol Hill',
    population: 52300,
    populationDensity: 3820,
    medianAge: 31.5,
    householdIncome: 68000,
    medianHomeValue: 598000,
    languageBreakdown: { english: 76, spanish: 16, chinese: 2, tagalog: 1.5, vietnamese: 1, korean: 0.8, arabic: 0.5, other: 2.2 },
    religiousAffiliation: { protestant: 38, roman_catholic: 18, mormon: 8, jewish: 3, muslim: 2, buddhist: 1.5, hindu: 0.5, unaffiliated: 29 },
    keyDistricts: ['Platt Park', 'Fairmount', 'Sherman', 'York'],
    accessibilityScore: 87,
    educationLevel: 82
  },
  {
    id: 'nb-002',
    city: 'Denver, CO',
    territory: 'Colorado',
    name: 'Lakewood',
    population: 151000,
    populationDensity: 2890,
    medianAge: 38.2,
    householdIncome: 82000,
    medianHomeValue: 512000,
    languageBreakdown: { english: 84, spanish: 11, chinese: 1, tagalog: 0.8, vietnamese: 0.5, korean: 0.3, arabic: 0.2, other: 2.2 },
    religiousAffiliation: { protestant: 45, roman_catholic: 14, mormon: 6, jewish: 2, muslim: 1.5, buddhist: 1, hindu: 0.3, unaffiliated: 28.5 },
    keyDistricts: ['Wheat Ridge', 'East Lakewood', 'West Lakewood', 'White Plains'],
    accessibilityScore: 72,
    educationLevel: 75
  },
  {
    id: 'nb-003',
    city: 'Denver, CO',
    territory: 'Colorado',
    name: 'Aurora',
    population: 386000,
    populationDensity: 3120,
    medianAge: 34.7,
    householdIncome: 71000,
    medianHomeValue: 428000,
    languageBreakdown: { english: 71, spanish: 22, chinese: 2, tagalog: 1.2, vietnamese: 0.8, korean: 0.5, arabic: 0.8, other: 1.7 },
    religiousAffiliation: { protestant: 42, roman_catholic: 12, mormon: 5, jewish: 1.5, muslim: 2.5, buddhist: 1.2, hindu: 0.8, unaffiliated: 32.5 },
    keyDistricts: ['Aurora Highlands', 'Foxfield', 'Parkland', 'Siridao'],
    accessibilityScore: 84,
    educationLevel: 71
  }
]

// Territory mapping summary
export const territoryMap = new Map<string, Set<string>>()

// Get neighborhoods by city
export function getByCity(city: string): Neighborhood[] {
  return neighborhoods.filter(n => n.city === city)
}

// Get neighborhoods by territory
export function getByTerritory(territory: string): Neighborhood[] {
  return neighborhoods.filter(n => n.territory === territory)
}

// Get total population by city
export function getCityPopulation(city: string): number {
  return neighborhoods.filter(n => n.city === city).reduce((sum, nb) => sum + nb.population, 0)
}

// Get average income by city
export function getCityAverageIncome(city: string): number {
  const cityNbs = neighborhoods.filter(n => n.city === city)
  if (cityNbs.length === 0) return 0
  return Math.round(cityNbs.reduce((sum, nb) => sum + nb.householdIncome, 0) / cityNbs.length)
}
