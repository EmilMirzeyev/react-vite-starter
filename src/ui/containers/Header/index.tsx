import { useTranslation } from "react-i18next";
import { setCookie } from "@/app/helpers/cookies";
import { languageResources } from "@/app/lib/i18next.config";
import { Link } from "react-router-dom";

const Header = () => {
  const { i18n } = useTranslation();

  const handleLocale = (locale: string) => {
    setCookie("lcl", locale, 30);
    i18n.changeLanguage(locale);
  };

  return (
    <div className="flex justify-between p-4 bg-slate-500 text-white">
      <Link to="/">Logo</Link>
      <div className="flex gap-4">
        {Object.keys(languageResources).map((locale) => (
          <button key={locale} onClick={() => handleLocale(locale)}>
            {locale}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
