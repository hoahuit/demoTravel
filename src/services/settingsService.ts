export interface AppSettings {
  supportHotline: string;
  adminEmail: string;
  seoTitle: string;
  enableCustomTourDesign: boolean;
}

export const DEFAULT_APP_SETTINGS: AppSettings = {
  supportHotline: '1900 6868 - 090 123 4567',
  adminEmail: 'booking@4utours.com',
  seoTitle: '4U Tours & Retreats International - Luxury Wellness Travel',
  enableCustomTourDesign: false
};

const SETTINGS_STORAGE_KEY = '4u_app_settings';

export function getAppSettings(): AppSettings {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_APP_SETTINGS, ...JSON.parse(stored) };
      }
    }
  } catch {
    // Return fallback on JSON error or SSR
  }
  return DEFAULT_APP_SETTINGS;
}

export function saveAppSettings(newSettings: Partial<AppSettings>): AppSettings {
  const merged = { ...getAppSettings(), ...newSettings };
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged));
      window.dispatchEvent(new CustomEvent('app-settings-updated', { detail: merged }));
    }
  } catch (err) {
    console.warn('[SettingsService] Failed to persist app settings:', err);
  }
  return merged;
}
