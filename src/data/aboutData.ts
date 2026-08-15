export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface AwardItem {
  year: string;
  title: string;
  organization: string;
}

export interface OfficeLocation {
  city: string;
  address: string;
  phone: string;
  email: string;
}

// 100% REAL DATA STORE (EMPTY UNTIL LOADED FROM LOOPBACK 4 / SQL SERVER)
export let ABOUT_DATA = {
  companyName: '4U Tours & Retreats International',
  tagline: 'Kiến Tạo Những Hành Trình Phục Hồi Thân Tâm & Nghỉ Dưỡng Xa Xỉ',
  story: '',
  vision: '',
  mission: '',
  coreValues: [] as any[],
  stats: [] as any[],
  timeline: [] as any[],
  awards: [] as any[],
  offices: [] as any[]
};

export function syncAboutDataFromApi(liveAbout: any) {
  if (liveAbout && typeof liveAbout === 'object') {
    Object.assign(ABOUT_DATA, liveAbout);
  }
}
