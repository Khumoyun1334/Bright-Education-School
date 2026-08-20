import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import Seo from "../Components/Seo";
import { useSitePreferences } from "../context/sitePreferencesContext";

const NotFoundPage = () => {
  const { tr } = useSitePreferences();
  return <main className="not-found"><Seo title="404" description={tr("Sahifa topilmadi.")} path={window.location.pathname} /><span>404</span><h1>{tr("Sahifa topilmadi")}</h1><p>{tr("Manzil noto‘g‘ri yozilgan yoki sahifa ko‘chirilgan bo‘lishi mumkin.")}</p><Link className="button button--dark" to="/"><FiArrowLeft /> {tr("Bosh sahifaga qaytish")}</Link></main>;
};

export default NotFoundPage;
