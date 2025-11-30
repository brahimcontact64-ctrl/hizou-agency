import { Link } from 'react-router-dom';
import { ArrowLeft, Share2, Target, Globe, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SocialMediaService() {
  const { t, language } = useLanguage();

  const sections = [
    {
      icon: Share2,
      titleKey: 'sm.section1.title',
      items: {
        fr: [
          'Création et gestion de pages sur les réseaux sociaux',
          'Création de contenu engageant',
          'Programmation des publications',
          'Interaction avec les abonnés',
          'Analyse des performances'
        ],
        ar: [
          'إنشاء وتسيير صفحات عبر مواقع التواصل الاجتماعي',
          'إنشاء محتوى جذاب',
          'جدولة المنشورات',
          'التفاعل مع المتابعين',
          'تحليل الأداء'
        ],
        en: [
          'Social media page creation and management',
          'Engaging content creation',
          'Post scheduling',
          'Follower interaction',
          'Performance analysis'
        ]
      }
    },
    {
      icon: Target,
      titleKey: 'sm.section2.title',
      items: {
        fr: [
          'Étude de projet complète',
          'Plans marketing personnalisés',
          'Analyse du marché et des concurrents',
          'Stratégies de croissance',
          'Optimisation du ROI'
        ],
        ar: [
          'دراسة مشروع كاملة',
          'خطط تسويقية مخصصة',
          'تحليل السوق والمنافسين',
          'استراتيجيات النمو',
          'تحسين العائد على الاستثمار'
        ],
        en: [
          'Complete project study',
          'Customized marketing plans',
          'Market and competitor analysis',
          'Growth strategies',
          'ROI optimization'
        ]
      }
    },
    {
      icon: Globe,
      titleKey: 'sm.section3.title',
      items: {
        fr: [
          'Développement de sites web professionnels',
          'Applications mobiles iOS & Android',
          'E-commerce et boutiques en ligne',
          'Design responsive et moderne',
          'Maintenance et support technique'
        ],
        ar: [
          'تطوير مواقع ويب احترافية',
          'تطبيقات الهاتف المحمول iOS وAndroid',
          'التجارة الإلكترونية والمتاجر الإلكترونية',
          'تصميم متجاوب وحديث',
          'الصيانة والدعم الفني'
        ],
        en: [
          'Professional website development',
          'iOS & Android mobile applications',
          'E-commerce and online stores',
          'Responsive and modern design',
          'Maintenance and technical support'
        ]
      }
    },
    {
      icon: TrendingUp,
      titleKey: 'sm.section4.title',
      items: {
        fr: [
          'Promotion des pages sur les réseaux sociaux',
          'Campagnes publicitaires ciblées',
          'Facebook & Instagram Ads',
          'Google Ads et SEO',
          'Optimisation continue des performances'
        ],
        ar: [
          'ترويج الصفحات على وسائل التواصل الاجتماعي',
          'حملات إعلانية مستهدفة',
          'إعلانات فيسبوك وإنستغرام',
          'إعلانات جوجل وتحسين محركات البحث',
          'تحسين مستمر للأداء'
        ],
        en: [
          'Social media page promotion',
          'Targeted advertising campaigns',
          'Facebook & Instagram Ads',
          'Google Ads and SEO',
          'Continuous performance optimization'
        ]
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* HEADER */}
      <div className="bg-gradient-to-br from-[#F15A24] to-[#ff7e50] text-white py-20 md:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t('pack1.title')}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            {t('pack1.desc')}
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
                  
                  <h2
                    className={`text-2xl md:text-3xl font-bold text-[#1A1A1A] ${
                      language === 'ar' ? 'mr-4' : 'ml-4'
                    }`}
                  >
                    {t(section.titleKey)}
                  </h2>
                </div>

                <ul className="space-y-4">
                  {section.items[language].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <div
                        className={`w-2 h-2 bg-[#F15A24] rounded-full mt-2 flex-shrink-0 ${
                          language === 'ar' ? 'ml-3' : 'mr-3'
                        }`}
                      />
                      <span className="text-[#2B2B2B] text-lg">{item}</span>
                    </li>
                  ))}
                </ul>

              </div>
            );
          })}
        </div>

        {/* WHATSAPP */}
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

        {/* BACK HOME */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center text-[#F15A24] hover:text-[#d94e1f] font-semibold text-lg transition-colors"
          >
            <ArrowLeft
              className={`w-5 h-5 ${
                language === 'ar' ? 'ml-2 rotate-180' : 'mr-2'
              }`}
            />
            {t('button.backhome')}
          </Link>
        </div>

      </div>
    </div>
  );
}