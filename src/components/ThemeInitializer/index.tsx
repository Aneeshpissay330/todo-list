import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectIsDark,
  selectThemeMode,
  systemPreferenceChanged,
} from "../../features/theme";

export default function ThemeInitializer() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectThemeMode);
  const isDark = useAppSelector(selectIsDark);

  // Apply current theme to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Watch system preference when on "system"
  useEffect(() => {
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => dispatch(systemPreferenceChanged(e.matches));
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mode, dispatch]);

  return null;
}
