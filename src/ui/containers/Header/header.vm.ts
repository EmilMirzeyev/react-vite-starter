import { setCookie } from "@/app/helpers/cookies";
import { languageResources } from "@/app/lib/i18next.config";
import { useTranslation } from "react-i18next";

export const HeaderVM = () => {
    const { i18n } = useTranslation();
    const languages = Object.keys(languageResources)

  const handleLocale = (locale: string) => {
    setCookie("lcl", locale, 30);
    i18n.changeLanguage(locale);
  };

  return { languages, handleLocale}
}