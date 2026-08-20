import { useEffect, useState } from "react";
import { FiBell, FiX } from "react-icons/fi";
import { useSitePreferences } from "../context/sitePreferencesContext";
import { getPushErrorMessage, getPushStatus, subscribeToNewsPush } from "../services/pushService";

const DISMISS_KEY = "bright-push-prompt-dismissed";
const REMIND_AFTER = 7 * 24 * 60 * 60 * 1000;

const PushPermissionPrompt = () => {
  const { tr } = useSitePreferences();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(async () => {
      const dismissedAt = Number(window.localStorage.getItem(DISMISS_KEY) || 0);
      if (Date.now() - dismissedAt < REMIND_AFTER) return;
      const status = await getPushStatus();
      if (active && status === "idle") setVisible(true);
    }, 1200);
    return () => { active = false; window.clearTimeout(timer); };
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  };

  const enable = async () => {
    setLoading(true); setError("");
    try {
      await subscribeToNewsPush();
      window.localStorage.removeItem(DISMISS_KEY);
      setVisible(false);
    } catch (requestError) {
      setError(tr(getPushErrorMessage(requestError)));
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;
  return <aside className="push-permission-prompt" role="dialog" aria-modal="false" aria-labelledby="push-prompt-title">
    <button className="push-permission-prompt__close" type="button" onClick={dismiss} aria-label={tr("Hozir emas")}><FiX /></button>
    <span className="push-permission-prompt__icon"><FiBell /></span>
    <div><small>{tr("YANGILIKLARDAN XABARDOR BO‘LING")}</small><h2 id="push-prompt-title">{tr("Yangi e’lonlarni o‘tkazib yubormang")}</h2><p>{tr("Yangi guruh, mock natijalari va markaz yangiliklari chiqqanda telefoningizga bildirishnoma yuboramiz.")}</p>{error && <p className="push-permission-prompt__error" role="alert">{error}</p>}<div><button type="button" onClick={dismiss}>{tr("Hozir emas")}</button><button type="button" onClick={enable} disabled={loading}>{tr(loading ? "Kutilmoqda..." : "Bildirishnomani yoqish")}</button></div></div>
  </aside>;
};

export default PushPermissionPrompt;
