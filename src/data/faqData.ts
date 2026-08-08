export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

// 100% REAL DATA STORE (EMPTY UNTIL LOADED FROM LOOPBACK 4 / SQL SERVER)
export let FAQ_DATA: FAQItem[] = [];

export function syncFaqDataFromApi(liveFaqs: FAQItem[]) {
  if (Array.isArray(liveFaqs)) {
    FAQ_DATA.splice(0, FAQ_DATA.length, ...liveFaqs);
  }
}
