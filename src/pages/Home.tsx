import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ---------------------------- HERO ---------------------------- */}
      <section
        className="relative w-full h-[100vh] min-h-[700px] overflow-hidden flex items-center justify-center"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* ---- MOBILE HERO IMAGE ---- */}
        <img
          src="/images/hero-vertical.jpeg"
          alt="hero-vertical"
          className="absolute inset-0 w-full h-full object-cover z-0 block md:hidden"
        />

        {/* ---- DESKTOP HERO ---- */}
        <img
          src="/images/hero-horizontal.jpeg"
          alt="hero-horizontal"
          className="absolute inset-0 w-full h-full object-cover z-0 hidden md:block"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* CLICKABLE AREA (MOBILE) */}
        <button
          onClick={scrollToContact}
          className="absolute z-30 md:hidden"
          style={{
            position: 'absolute',
            left: '50%',
            top: '49%',
            transform: 'translate(-50%, -50%)',
            width: '68%',
            height: '14vw',
            maxHeight: '90px',
            minHeight: '55px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        />

        {/* CLICKABLE AREA (DESKTOP) */}
        <button
          onClick={scrollToContact}
          className="absolute z-30 hidden md:block"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            height: '90px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        />
      </section>

{/* ---------------------------- SERVICES ---------------------------- */}
<section
  id="services"
  className="py-20 bg-[#F7F7F7] px-4"
  dir={isRTL ? 'rtl' : 'ltr'}
>
  <div className="max-w-5xl mx-auto">
    <div className="bg-white rounded-3xl p-10 shadow-xl border border-[#F15A24]/20 mx-auto max-w-4xl text-center relative overflow-visible">
      
      {/* Icon */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16
        bg-gradient-to-br from-[#F15A24] to-[#ff7e50]
        rounded-2xl shadow-xl flex items-center justify-center">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeWidth="2" d="M3 7h18M3 12h18M3 17h18" />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mt-12 mb-4">
        {t('home.services.title')}
      </h2>

      {/* Subtitle */}
      <p className="text-sm md:text-base text-gray-600 mb-8">
        {t('home.services.subtitle')}
      </p>

      {/* WhatsApp Buttons */}
      <div className="space-y-4 mb-10 flex flex-col items-center">
        <a
          href="https://wa.me/213775643433"
          className="w-4/5 bg-green-600 hover:bg-green-700 text-white py-3 md:py-4 rounded-xl
            font-semibold text-center shadow-md transition-all hover:scale-[1.03]"
        >
          {t('home.services.whatsapp1')}
        </a>

        <a
          href="https://wa.me/213549278411"
          className="w-4/5 bg-green-600 hover:bg-green-700 text-white py-3 md:py-4 rounded-xl
            font-semibold text-center shadow-md transition-all hover:scale-[1.03]"
        >
          {t('home.services.whatsapp2')}
        </a>
      </div>

      {/* View All */}
      <Link
        to="/services"
        className="block w-full bg-gradient-to-r from-[#F15A24] to-[#ff7e50]
          hover:opacity-90 text-white py-4 rounded-xl font-semibold
          transition-all transform hover:scale-[1.05] shadow-lg"
      >
        {t('home.services.viewAll')}
      </Link>
    </div>
  </div>
</section>


{/* ---------------------------- PROJECTS ---------------------------- */}
<section
  id="projects"
  className="py-20 bg-white px-4"
  dir={isRTL ? 'rtl' : 'ltr'}
>
  <div className="max-w-5xl mx-auto">
    <div className="bg-white rounded-3xl p-10 shadow-xl border border-[#F15A24]/20 mx-auto max-w-4xl text-center relative overflow-visible">
      
      {/* Icon */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16
        bg-gradient-to-br from-[#F15A24] to-[#ff7e50]
        rounded-2xl shadow-xl flex items-center justify-center">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h8m-8 6h8m-8 6h8" />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mt-12 mb-4">
        {t('home.projects.title')}
      </h2>

      {/* Subtitle */}
      <p className="text-sm md:text-base text-gray-600 mb-8">
        {t('home.projects.subtitle')}
      </p>

      {/* WhatsApp Buttons */}
      <div className="space-y-4 mb-10 flex flex-col items-center">
        <a
          href="https://wa.me/213775643433"
          className="w-4/5 bg-green-600 hover:bg-green-700 text-white py-3 md:py-4 rounded-xl
            font-semibold text-center shadow-md transition-all hover:scale-[1.03]"
        >
          {t('home.projects.whatsapp1')}
        </a>

        <a
          href="https://wa.me/213549278411"
          className="w-4/5 bg-green-600 hover:bg-green-700 text-white py-3 md:py-4 rounded-xl
            font-semibold text-center shadow-md transition-all hover:scale-[1.03]"
        >
          {t('home.projects.whatsapp2')}
        </a>
      </div>

      {/* View All */}
      <Link
        to="/projects"
        className="block w-full bg-gradient-to-r from-[#F15A24] to-[#ff7e50]
          hover:opacity-90 text-white py-4 rounded-xl font-semibold
          transition-all transform hover:scale-[1.05] shadow-lg"
      >
        {t('home.projects.viewAll')}
      </Link>
    </div>
  </div>
</section>

      {/* ---------------------------- CLIENTS ---------------------------- */}
      <section
        id="clients"
        className="py-20 bg-white px-4"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('clients.title')}
          </h2>

          <div className="overflow-hidden">
            <div className="flex animate-scroll space-x-8 rtl:space-x-reverse">
              {(() => {
                const logos = import.meta.glob(
                  '../assets/design/logo/*.{png,jpg,jpeg}',
                  {
                    eager: true,
                  }
                );

                return Object.values(logos).map((logo: any, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 bg-[#F7F7F7]
                      rounded-2xl flex items-center justify-center shadow-md"
                  >
                    <img
                      src={logo.default}
                      alt={`client-${index}`}
                      className="max-w-[70%] max-h-[70%] object-contain"
                    />
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------- CONTACT ---------------------------- */}
<section
  id="contact"
  className="py-20 bg-white px-4"
  dir={isRTL ? 'rtl' : 'ltr'}
>
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      {t('contact.title')}
    </h2>

    <p className="text-lg text-gray-600 mb-16">
      {t('contact.subtitle')}
    </p>

    {/* ---------------- CARDS ---------------- */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

      {/* ---------------- WHATSAPP ---------------- */}
      <div className="bg-[#F7F7F7] rounded-2xl p-8 shadow-lg">
        <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
        <p className="text-gray-600 mb-6">{t('contact.whatsappDesc')}</p>

        <a
          href="https://wa.me/213775643433"
          className="block w-full bg-green-600 text-white py-3 rounded-xl font-semibold mb-3 hover:bg-green-700 transition"
          dir="ltr"
        >
          +213 775 64 34 33
        </a>

        <a
          href="https://wa.me/213549278411"
          className="block w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          dir="ltr"
        >
          +213 549 27 84 11
        </a>
      </div>

      {/* ---------------- PHONE ---------------- */}
      <div className="bg-[#F7F7F7] rounded-2xl p-8 shadow-lg">
        <h3 className="text-xl font-bold mb-2">
          {t('contact.phoneTitle')}
        </h3>

        <p className="text-gray-600 mb-6">
          {t('contact.phoneDesc')}
        </p>

        <p className="text-lg font-semibold" dir="ltr">
          +213 775 64 34 33
        </p>

        <p className="text-lg font-semibold" dir="ltr">
          +213 549 27 84 11
        </p>
      </div>

      {/* ---------------- SOCIAL ---------------- */}
      <div className="bg-[#F7F7F7] rounded-2xl p-8 shadow-lg">
        <h3 className="text-xl font-bold mb-2">
          {t('contact.socialTitle')}
        </h3>

        <p className="text-gray-600 mb-6">
          {t('contact.socialDesc')}
        </p>

        <a
          href="https://www.instagram.com/hizou_agency"
          className="block w-full bg-[#F15A24] text-white py-3 rounded-xl font-semibold mb-3 hover:bg-[#d94e1f] transition"
        >
          Instagram
        </a>

        <a
          href="https://www.facebook.com"
          className="block w-full bg-[#F15A24] text-white py-3 rounded-xl font-semibold hover:bg-[#d94e1f] transition"
        >
          Facebook
        </a>
      </div>

    </div>

    {/* ---------------- MAP BUTTON ---------------- */}
    <a
      href="https://maps.app.goo.gl/iymwka97TAJ8cWew8?g_st=ic"
      target="_blank"
      rel="noreferrer"
      className="block w-full bg-[#F15A24] text-white py-4 rounded-xl font-semibold text-lg text-center hover:bg-[#d94e1f] transition"
    >
      {t('contact.map')}
    </a>

  </div>
</section>

      {/* Animations */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
          width: max-content;
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -6px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2.4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}