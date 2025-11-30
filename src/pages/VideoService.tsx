import { Link } from 'react-router-dom';
import { ArrowLeft, Camera, Film, FileText, Mic } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function VideoService() {
  const { t, language } = useLanguage();

  const sections = [
    {
      icon: Camera,
      titleKey: 'video.section1.title',
      items: {
        fr: [
          'Tournage de produits en studio',
          'Tournage de personnes et interviews',
          'Tournage de magasins et locaux commerciaux',
          'Tournage intérieur avec éclairage professionnel',
          'Tournage extérieur en haute qualité'
        ],
        ar: [
          'تصوير منتجات في الاستوديو',
          'تصوير أشخاص ومقابلات',
          'تصوير محلات ومواقع تجارية',
          'تصوير داخلي بإضاءة احترافية',
          'تصوير خارجي بجودة عالية'
        ],
        en: [
          'Product shooting in studio',
          'People shooting and interviews',
          'Store and commercial location shooting',
          'Indoor shooting with professional lighting',
          'High-quality outdoor shooting'
        ]
      }
    },
    {
      icon: Film,
      titleKey: 'video.section2.title',
      items: {
        fr: [
          'Montage vidéo simple et rapide',
          'Montage professionnel avancé',
          'Color grading et étalonnage',
          'Effets visuels et animations',
          'Montage pour Reels et TikTok'
        ],
        ar: [
          'مونتاج فيديو بسيط وسريع',
          'مونتاج احترافي متقدم',
          'تصحيح الألوان والمعايرة',
          'المؤثرات البصرية والرسوم المتحركة',
          'مونتاج لريلز وتيك توك'
        ],
        en: [
          'Simple and quick video editing',
          'Advanced professional editing',
          'Color grading and calibration',
          'Visual effects and animations',
          'Editing for Reels and TikTok'
        ]
      }
    },
    {
      icon: FileText,
      titleKey: 'video.section3.title',
      items: {
        fr: [
          'Écriture de scripts publicitaires',
          'Scripts pour Reels et vidéos courtes',
          'Storyboard et scénarios',
          'Scripts pour TikTok',
          'Adaptation de contenu'
        ],
        ar: [
          'كتابة سكريبت إعلاني',
          'سكريبت لريلز وفيديوهات قصيرة',
          'لوحة القصة والسيناريوهات',
          'سكريبت لتيك توك',
          'تكييف المحتوى'
        ],
        en: [
          'Advertising script writing',
          'Scripts for Reels and short videos',
          'Storyboard and scenarios',
          'Scripts for TikTok',
          'Content adaptation'
        ]
      }
    },
    {
      icon: Mic,
      titleKey: 'video.section4.title',
      items: {
        fr: [
          'Voix-off féminine professionnelle',
          'Voix-off masculine professionnelle',
          'Voix-off enfantine',
          'Enregistrement en studio',
          'Traitement audio professionnel'
        ],
        ar: [
          'تعليق صوتي نسائي احترافي',
          'تعليق صوتي رجالي احترافي',
          'تعليق صوتي للأطفال',
          'تسجيل في الاستوديو',
          'معالجة صوتية احترافية'
        ],
        en: [
          'Professional female voice-over',
          'Professional male voice-over',
          'Children voice-over',
          'Studio recording',
          'Professional audio treatment'
        ]
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* HEADER SECTION */}
      <div className="bg-gradient-to-br from-[#F15A24] to-[#ff7e50] text-white py-20 md:py-32 px-4 relative overflow-hidden">

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t('pack2.title')}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            {t('pack2.desc')}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">

        <div className="space-y-16">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="bg-[#F7F7F7] rounded-3xl p-6 md:p-10">

                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F15A24] to-[#ff7e50] rounded-xl flex items-center justify-center shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className={`text-2xl md:text-3xl font-bold text-[#1A1A1A] ${language === 'ar' ? 'mr-4' : 'ml-4'}`}>
                    {t(section.titleKey)}
                  </h2>
                </div>

                <ul className="space-y-4">
                  {section.items[language].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className={`w-2 h-2 bg-[#F15A24] rounded-full mt-2 flex-shrink-0 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                      <span className="text-[#2B2B2B] text-lg">{item}</span>
                    </li>
                  ))}
                </ul>

              </div>
            );
          })}
        </div>

        {/* WHATSAPP BUTTONS */}
        <div className="mt-16 space-y-4">
          <a
            href="https://wa.me/213775643433"
            className="block w-full bg-green-500 hover:bg-green-600 text-white py-5 rounded-2xl font-semibold text-lg text-center transition-all transform hover:scale-105 shadow-lg"
          >
            {t('button.whatsapp1')}
          </a>

          <a
            href="https://wa.me/213549278411"
            className="block w-full bg-green-500 hover:bg-green-600 text-white py-5 rounded-2xl font-semibold text-lg text-center transition-all transform hover:scale-105 shadow-lg"
          >
            {t('button.whatsapp2')}
          </a>
        </div>

        {/* BACK BUTTON */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center text-[#F15A24] hover:text-[#d94e1f] font-semibold text-lg transition-colors"
          >
            <ArrowLeft className={`w-5 h-5 ${language === 'ar' ? 'ml-2 rotate-180' : 'mr-2'}`} />
            {t('button.backhome')}
          </Link>
        </div>

      </div>
    </div>
  );
}