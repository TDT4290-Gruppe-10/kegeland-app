export type AppSettings = {
  darkMode: boolean;
};

export type SettingsProperty<K extends keyof AppSettings> = {
  key: K;
  value: AppSettings[K];
};

export interface AppState {
  anchorRoute: any;
  settings: AppSettings;
}
