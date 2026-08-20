import { useCallback, useEffect, useMemo, useState } from "react";
import { defaultContent } from "../data/siteDefaults";
import { ContentContext } from "./contentContext";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
const isConfigured = Boolean(supabaseUrl && supabaseKey);
const mergeContent = (remote = {}) => ({ ...defaultContent, ...remote, settings: { ...defaultContent.settings, ...(remote.settings || {}) } });

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(isConfigured);
  const [error, setError] = useState("");

  const refreshContent = useCallback(async () => {
    if (!isConfigured) { setLoading(false); return defaultContent; }
    setLoading(true);
    let remote;
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/site_content?id=eq.main&select=content`, { headers: { apikey: supabaseKey } });
      if (!response.ok) throw new Error("Kontent bazadan olinmadi");
      remote = (await response.json())?.[0]?.content;
    } catch (requestError) {
      setError(requestError.message);
    }
    const next = mergeContent(remote);
    setContent(next);
    setLoading(false);
    return next;
  }, []);

  useEffect(() => { void Promise.resolve().then(refreshContent); }, [refreshContent]);

  const value = useMemo(() => ({ content, setContent, loading, error, refreshContent, configured: isConfigured }), [content, loading, error, refreshContent]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};
