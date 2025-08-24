import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark" | "system";
export interface ThemeState {
  mode: ThemeMode;  // user choice
  isDark: boolean;  // resolved boolean (system-aware)
}

function systemPrefersDark(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function resolveIsDark(mode: ThemeMode) {
  return mode === "dark" ? true : mode === "light" ? false : systemPrefersDark();
}

const initialMode: ThemeMode = "system"; // redux-persist will rehydrate this
const initialState: ThemeState = {
  mode: initialMode,
  isDark: resolveIsDark(initialMode),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
      state.isDark = resolveIsDark(state.mode);
    },
    toggleTheme(state) {
      state.mode = state.isDark ? "light" : "dark";
      state.isDark = resolveIsDark(state.mode);
    },
    systemPreferenceChanged(state, action: PayloadAction<boolean>) {
      if (state.mode === "system") {
        state.isDark = action.payload;
      }
    },
  },
});

export const { setTheme, toggleTheme, systemPreferenceChanged } = themeSlice.actions;
export default themeSlice.reducer;

/* selectors */
export const selectThemeMode = (s: any) => s.theme.mode as ThemeMode;
export const selectIsDark = (s: any) => s.theme.isDark as boolean;
