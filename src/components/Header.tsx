import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

import logo from "../assets/logo/hizou-logo.png";

export default function HeaderPRO() {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const location = useLocation();

  // Flip Direction Automatically
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const isActive = (path: string) => location.pathname === path;

  const switchLang = (lang: "fr" | "ar" | "en") => {
    setLanguage(lang);
    setShowLangMenu(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md shadow-sm border-b border-black/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* LOGO AREA */}
          <Link to="/" className="flex items-center gap-3 group select-none">
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md ring-1 ring-black/5 bg-white">
              <img src={logo} alt="Hizou" className="w-full h-full object-cover" />
            </div>

            <span className="text-2xl font-bold text-gray-900 tracking-tight group-hover:text-[#F15A24] transition-colors">
              Hizou
            </span>
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center gap-10">

            <Link
              to="/"
              className={`text-[16px] transition ${
                isActive("/") ? "text-[#F15A24] font-semibold" : "text-gray-700 hover:text-[#F15A24]"
              }`}
            >
              {t("nav.home")}
            </Link>

            <button
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-gray-700 hover:text-[#F15A24] text-[16px] transition"
            >
              {t("nav.services")}
            </button>

            <button
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-gray-700 hover:text-[#F15A24] text-[16px] transition"
            >
              {t("nav.contact")}
            </button>
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4 relative">

            {/* LANGUAGE SELECT */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-200 transition shadow-sm"
              >
                <Globe className="w-5 h-5 text-gray-900" />
              </button>

              {/* DROPDOWN FIXED RTL/LTR */}
              {showLangMenu && (
                <div
                  className={`
                    absolute top-12 w-36 bg-white border shadow-xl rounded-xl py-2 animate-fadeIn z-50
                    ${language === "ar" ? "left-0" : "right-0"}
                  `}
                >
                  {["fr", "ar", "en"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => switchLang(lang as any)}
                      className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
                        language === lang ? "text-[#F15A24] font-semibold" : "text-gray-900"
                      }`}
                    >
                      {lang === "fr" && "Français"}
                      {lang === "ar" && "العربية"}
                      {lang === "en" && "English"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* MOBILE BTN */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:text-[#F15A24] transition"
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-xl border-t animate-fadeIn p-4 space-y-2">

          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className={`block py-3 px-3 rounded-lg text-lg ${
              isActive("/") ? "bg-[#F15A24] text-white" : "text-gray-800 hover:bg-gray-100"
            }`}
          >
            {t("nav.home")}
          </Link>

          <button
            onClick={(e) => {
              setIsMenuOpen(false);
              if (location.pathname === "/") {
                e.preventDefault();
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="block w-full text-left py-3 px-3 rounded-lg text-lg hover:bg-gray-100"
          >
            {t("nav.services")}
          </button>

          <button
            onClick={(e) => {
              setIsMenuOpen(false);
              if (location.pathname === "/") {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="block w-full text-left py-3 px-3 rounded-lg text-lg hover:bg-gray-100"
          >
            {t("nav.contact")}
          </button>

        </div>
      )}
    </header>
  );
}