import { Link } from "react-router-dom";
import { HeaderVM } from "./header.vm";

const Header = () => {
  const { languages, handleLocale } = HeaderVM();

  return (
    <div className="flex justify-between p-4 bg-slate-500 text-white">
      <Link to="/">Logo</Link>
      <div className="flex gap-4">
        {languages.map((locale) => (
          <button key={locale} onClick={() => handleLocale(locale)}>
            {locale}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
