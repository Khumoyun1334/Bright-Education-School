import { createContext, useContext } from "react";

export const SitePreferencesContext = createContext(null);

export const useSitePreferences = () => {
  const context = useContext(SitePreferencesContext);
  if (!context) throw new Error("useSitePreferences must be used inside SitePreferencesProvider");
  return context;
};
