import { Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();

  // أرقام بمنطق LTR حتى في العربي
  const numLTR = (num: string) => (
    <span className="inline-block" dir="ltr">{num}</span>
  );

  return (
    <footer className="bg-[#1A1A1A] py-8 px-6 text-white mt-10">
      <div className="max-w-7xl mx-auto">
        
        <div
          className={`flex flex-wrap items-center justify-center gap-4 text-sm md:text-base ${
            language === 'ar' ? 'flex-row-reverse' : ''
          }`}
        >

          {/* LOGO NAME */}
          <span className="font-semibold">{t('header.logo')}</span>

          <span className="hidden md:inline">•</span>

          {/* PHONE 1 */}
          <a
            href="tel:+213775643433"
            className="hover:text-[#D7702E] transition-colors"
          >
            {numLTR('+213 775 64 34 33')}
          </a>

          <span className="hidden md:inline">•</span>

          {/* PHONE 2 */}
          <a
            href="tel:+213549278411"
            className="hover:text-[#D7702E] transition-colors"
          >
            {numLTR('+213 549 27 84 11')}
          </a>

          <span className="hidden md:inline">•</span>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/hizou_agency"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D7702E] transition-colors"
            >
              <Instagram size={20} />
            </a>

            <a
              href="https://www.facebook.com/share/1AE96Z5FMC/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D7702E] transition-colors"
            >
              <Facebook size={20} />
            </a>
          </div>

          <span className="hidden md:inline">•</span>

          {/* DEVELOPED BY — clickable */}
          <a
            href="https://brahim.dev"   // ضع موقعك هنا
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D7702E] transition-colors font-semibold"
          >
            {t('footer.developed')}
          </a>

        </div>
      </div>
    </footer>
  );
}