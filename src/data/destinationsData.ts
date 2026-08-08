export interface DestinationAttraction {
  name: string;
  image: string;
  description: string;
}

export interface Destination {
  slug: string;
  name: string;
  country: string;
  region: string;
  heroImage: string;
  overview: string;
  history?: string;
  bestTime?: string;
  currency?: string;
  language?: string;
  visaInfo?: string;
  transportation?: string;
  popularAttractions?: DestinationAttraction[];
  weather?: string;
  food?: string[];
  shopping?: string[];
  culture?: string;
  gallery?: string[];
  tourCount?: number;
}

// 100% REAL DATA STORE (EMPTY UNTIL LOADED FROM LOOPBACK 4 / SQL SERVER)
export let DESTINATIONS_DATA: Destination[] = [];

export function syncDestinationsDataFromApi(liveDestinations: Destination[]) {
  if (Array.isArray(liveDestinations)) {
    DESTINATIONS_DATA.splice(0, DESTINATIONS_DATA.length, ...liveDestinations);
  }
}
