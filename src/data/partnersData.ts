export interface PartnerItem {
  id: string;
  name: string;
  category: string;
  logoText: string;
}

// 100% REAL DATA STORE (EMPTY UNTIL LOADED FROM LOOPBACK 4 / SQL SERVER)
export let PARTNERS_DATA: PartnerItem[] = [];

export function syncPartnersDataFromApi(livePartners: PartnerItem[]) {
  if (Array.isArray(livePartners)) {
    PARTNERS_DATA.splice(0, PARTNERS_DATA.length, ...livePartners);
  }
}
