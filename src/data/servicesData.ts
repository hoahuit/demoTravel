export interface TravelService {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  iconName: string;
  description: string;
  features?: string[];
  processSteps?: { step: number; title: string; description: string }[];
  pricingExamples?: { title: string; price: string; note: string }[];
  benefits?: string[];
  faq?: { question: string; answer: string }[];
}

// 100% REAL DATA STORE (EMPTY UNTIL LOADED FROM LOOPBACK 4 / SQL SERVER)
export let SERVICES_DATA: TravelService[] = [];

export function syncServicesDataFromApi(liveServices: TravelService[]) {
  if (Array.isArray(liveServices)) {
    SERVICES_DATA.splice(0, SERVICES_DATA.length, ...liveServices);
  }
}
