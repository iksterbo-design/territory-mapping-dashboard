export interface Territory {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  pop: number;
  outreaches: number;
  category: string;
  color: string;
}

export const Territory: Territory[] = [
  { id: "TZ-01", name: "Dar es Salaam", country: "Tanzania", lat: -6.7924, lng: 39.2083, pop: 4364540, outreaches: 214, category: "Coastal", color: "#f59e0b" },
  { id: "KE-02", name: "Nairobi", country: "Kenya", lat: -1.2921, lng: 36.8219, pop: 4397073, outreaches: 388, category: "Central", color: "#10b981" },
  { id: "UG-03", name: "Kampala", country: "Uganda", lat: 0.3476, lng: 32.5825, pop: 1725300, outreaches: 142, category: "Central", color: "#f59e0b" },
  { id: "TZ-04", name: "Zanzibar", country: "Tanzania", lat: -6.1667, lng: 39.1667, pop: 2200000, outreaches: 96, category: "Island", color: "#8b5cf6" },
  { id: "UG-05", name: "Kibaale", country: "Uganda", lat: 1.4997, lng: 30.6283, pop: 970000, outreaches: 64, category: "Rural", color: "#ef4444" },
  { id: "KE-06", name: "Mombasa", country: "Kenya", lat: -4.0435, lng: 39.6682, pop: 1208000, outreaches: 178, category: "Coastal", color: "#f59e0b" }
];
