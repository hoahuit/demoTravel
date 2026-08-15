export interface BlogArticleSection {
  title: string;
  text: string;
  image?: string;
  imageCaption?: string;
  tips?: string[];
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Retreat' | 'Culture' | 'Tips' | 'Food' | 'Luxury';
  author?: { name: string; role: string; avatar: string };
  authorName?: string;
  authorRole?: string;
  publishedDate: string;
  readTime: string;
  heroImage: string;
  tableOfContents?: string[];
  introduction?: string;
  sections?: BlogArticleSection[];
  travelTips?: string[];
  foodGuide?: string[];
  budgetGuide?: string;
  packingTips?: string[];
  relatedToursSlugs?: string[];
  conclusion?: string;
}

// 100% REAL DATA STORE (EMPTY UNTIL LOADED FROM LOOPBACK 4 / SQL SERVER)
export let BLOGS_DATA: BlogArticle[] = [];

export function syncBlogsDataFromApi(liveBlogs: BlogArticle[]) {
  if (Array.isArray(liveBlogs)) {
    BLOGS_DATA.splice(0, BLOGS_DATA.length, ...liveBlogs);
  }
}
