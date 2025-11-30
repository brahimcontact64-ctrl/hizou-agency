import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brush, Layout, Camera, PenTool } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// 🧩 helper باش نخرج URLs من import.meta.glob
function importAll(modules: Record<string, any>): string[] {
  return Object.values(modules).map((mod: any) =>
    typeof mod === 'string' ? mod : mod.default
  );
}

// 🖼️ هنا نربط كل "نوع خدمة" مع فولدر الصور
const designGalleries: Record<string, string[]> = {
  // section 1 – Identité visuelle
  identiteComplete: [
    ...importAll(
      import.meta.glob('../assets/design/logo/*.{png,jpg,jpeg,webp}', {
        eager: true,
      })
    ),
    ...importAll(
      import.meta.glob('../assets/design/book-cover/*.{png,jpg,jpeg,webp}', {
        eager: true,
      })
    ),
  ],
  logos: importAll(
    import.meta.glob('../assets/design/logo/*.{png,jpg,jpeg,webp}', {
      eager: true,
    })
  ),
  charteGraphique: importAll(
    import.meta.glob('../assets/design/catalog/*.{png,jpg,jpeg,webp}', {
      eager: true,
    })
  ),
  paletteTypo: importAll(
    import.meta.glob('../assets/design/book/*.{png,jpg,jpeg,webp}', {
      eager: true,
    })
  ),
  declinaisonsVisuelles: [
    ...importAll(
      import.meta.glob('../assets/design/event/*.{png,jpg,jpeg,webp}', {
        eager: true,
      })
    ),
    ...importAll(
      import.meta.glob('../assets/design/occasions/*.{png,jpg,jpeg,webp}', {
        eager: true,
      })
    ),
  ],

  // section 2 – Graphisme & réseaux sociaux
  affiches: [
    ...importAll(
      import.meta.glob('../assets/design/ads/*.{png,jpg,jpeg,webp}', {
        eager: true,
      })
    ),
    ...importAll(
      import.meta.glob('../assets/design/banner/*.{png,jpg,jpeg,webp}', {
        eager: true,
      })
    ),
  ],
  flyers: importAll(
    import.meta.glob('../assets/design/brochure/*.{png,jpg,jpeg,webp}', {
      eager: true,
    })
  ),
  socialPosts: importAll(
    import.meta.glob('../assets/design/occasions/*.{png,jpg,jpeg,webp}', {
      eager: true,
    })
  ),
  bannersPrint: [
    ...importAll(
      import.meta.glob('../assets/design/banner/*.{png,jpg,jpeg,webp}', {
        eager: true,
      })
    ),
    ...importAll(
      import.meta.glob('../assets/design/rollup/*.{png,jpg,jpeg,webp}', {
        eager: true,
      })
    ),
  ],
  templates: [
    ...importAll(
      import.meta.glob('../assets/design/catalog/*.{png,jpg,jpeg,webp}', {
        eager: true,
      })
    ),
    ...importAll(
      import.meta.glob('../assets/design/ads/*.{png,jpg,jpeg,webp}', {
        eager: true,
      })
    ),
  ],

  // section 3 – Retouche & photomontage
  retouche: [
    ...importAll(
      import.meta.glob('../assets/design/ads/*.{png,jpg,jpeg,webp}', {
        eager: true,
      })
    ),
    ...importAll(
      import.meta.glob('../assets/design/event/*.{png,jpg,jpeg,webp}', {
        eager: true,
      })
    ),
  ],
  photomontage: importAll(
    import.meta.glob('../assets/design/book-cover/*.{png,jpg,jpeg,webp}', {
      eager: true,
    })
  ),
  colorCorrection: importAll(
    import.meta.glob('../assets/design/book/*.{png,jpg,jpeg,webp}', {
      eager: true,
    })
  ),
  detourage: importAll(
    import.meta.glob('../assets/design/packaging/*.{png,jpg,jpeg,webp}', {
      eager: true,
    })
  ),
  socialOptimization: importAll(
    import.meta.glob('../assets/design/occasions/*.{png,jpg,jpeg,webp}', {
      eager: true,
    })
  ),

  // section 4 – Illustrations & vectoriels
  illustrations: importAll(
    import.meta.glob('../assets/design/event/*.{png,jpg,jpeg,webp}', {
      eager: true,
    })
  ),
  vectors: importAll(
    import.meta.glob('../assets/design/logo/*.{png,jpg,jpeg,webp}', {
      eager: true,
    })
  ),
  brandVisuals: [
    ...importAll(
      import.meta.glob('../assets/design/logo/*.{png,jpg,jpeg,webp}', {
        eager: true,
      })
    ),
    ...importAll(
      import.meta.glob('../assets/design/book-cover/*.{png,jpg,jpeg,webp}', {
        eager: true,
      })
    ),
  ],
  marketingIllustrations: importAll(
    import.meta.glob('../assets/design/ads/*.{png,jpg,jpeg,webp}', {
      eager: true,
    })
  ),
  appAssets: [
    ...importAll(
      import.meta.glob('../assets/design/catalog/*.{png,jpg,jpeg,webp}', {
        eager: true,
      })
    ),
    ...importAll(
      import.meta.glob('../assets/design/banner/*.{png,jpg,jpeg,webp}', {
        eager: true,
      })
    ),
  ],
};

// 🔢 البيانات المنظمة لكل قسم + العناوين حسب اللغة
const sections = [
  {
    icon: Brush,
    titleKey: 'design.section1.title',
    items: [
      {
        id: 'identite-complete',
        galleryKey: 'identiteComplete',
        labels: {
          fr: 'Identité visuelle complète',
          ar: 'هوية بصرية كاملة',
          en: 'Full visual identity',
        },
      },
      {
        id: 'logo-pro',
        galleryKey: 'logos',
        labels: {
          fr: 'Logo professionnel personnalisé',
          ar: 'شعار احترافي مخصص',
          en: 'Professional custom logo',
        },
      },
      {
        id: 'charte-graphique',
        galleryKey: 'charteGraphique',
        labels: {
          fr: 'Charte graphique',
          ar: 'دليل الهوية البصرية',
          en: 'Brand guideline',
        },
      },
      {
        id: 'palette-typo',
        galleryKey: 'paletteTypo',
        labels: {
          fr: 'Palette de couleurs et typographies',
          ar: 'الألوان والخطوط',
          en: 'Color palette & typography',
        },
      },
      {
        id: 'declinaisons',
        galleryKey: 'declinaisonsVisuelles',
        labels: {
          fr: 'Déclinaisons visuelles',
          ar: 'التطبيقات البصرية',
          en: 'Visual brand assets',
        },
      },
    ],
  },
  {
    icon: Layout,
    titleKey: 'design.section2.title',
    items: [
      {
        id: 'affiches',
        galleryKey: 'affiches',
        labels: {
          fr: 'Affiches publicitaires',
          ar: 'بوسترات إعلانية',
          en: 'Advertising posters',
        },
      },
      {
        id: 'flyers',
        galleryKey: 'flyers',
        labels: {
          fr: 'Flyers professionnels',
          ar: 'مطويات احترافية',
          en: 'Professional flyers',
        },
      },
      {
        id: 'social-designs',
        galleryKey: 'socialPosts',
        labels: {
          fr: 'Designs pour les réseaux sociaux',
          ar: 'تصاميم لمواقع التواصل الاجتماعي',
          en: 'Social media designs',
        },
      },
      {
        id: 'banners-print',
        galleryKey: 'bannersPrint',
        labels: {
          fr: 'Bannières web et impressions',
          ar: 'بانرات ويب ومواد للطباعة',
          en: 'Web banners & print',
        },
      },
      {
        id: 'templates',
        galleryKey: 'templates',
        labels: {
          fr: 'Templates personnalisés',
          ar: 'قوالب مخصصة',
          en: 'Custom templates',
        },
      },
    ],
  },
  {
    icon: Camera,
    titleKey: 'design.section3.title',
    items: [
      {
        id: 'retouche',
        galleryKey: 'retouche',
        labels: {
          fr: 'Retouche photo professionnelle',
          ar: 'معالجة صور احترافية',
          en: 'Professional photo retouching',
        },
      },
      {
        id: 'photomontage',
        galleryKey: 'photomontage',
        labels: {
          fr: 'Photomontage avancé',
          ar: 'مونتاج صور متقدم',
          en: 'Advanced photomontage',
        },
      },
      {
        id: 'color-correction',
        galleryKey: 'colorCorrection',
        labels: {
          fr: 'Corrections de couleurs',
          ar: 'تصحيح الألوان',
          en: 'Color correction',
        },
      },
      {
        id: 'detourage',
        galleryKey: 'detourage',
        labels: {
          fr: 'Détourage et effets',
          ar: 'قص وإضافة تأثيرات',
          en: 'Cut-out & effects',
        },
      },
      {
        id: 'social-optim',
        galleryKey: 'socialOptimization',
        labels: {
          fr: 'Optimisation pour réseaux sociaux',
          ar: 'تحسين الصور لوسائل التواصل',
          en: 'Social media optimization',
        },
      },
    ],
  },
  {
    icon: PenTool,
    titleKey: 'design.section4.title',
    items: [
      {
        id: 'illustrations',
        galleryKey: 'illustrations',
        labels: {
          fr: 'Création d’illustrations',
          ar: 'إنشاء رسومات توضيحية',
          en: 'Custom illustrations',
        },
      },
      {
        id: 'vectors',
        galleryKey: 'vectors',
        labels: {
          fr: 'Designs vectoriels',
          ar: 'تصاميم فيكتر',
          en: 'Vector designs',
        },
      },
      {
        id: 'brand-visuals',
        galleryKey: 'brandVisuals',
        labels: {
          fr: 'Visuels personnalisés pour marques',
          ar: 'محتوى بصري مخصص للعلامات التجارية',
          en: 'Brand-specific visuals',
        },
      },
      {
        id: 'marketing-illust',
        galleryKey: 'marketingIllustrations',
        labels: {
          fr: 'Illustrations marketing',
          ar: 'رسومات تسويقية',
          en: 'Marketing illustrations',
        },
      },
      {
        id: 'app-assets',
        galleryKey: 'appAssets',
        labels: {
          fr: 'Assets graphiques pour applications',
          ar: 'عناصر رسومية للتطبيقات',
          en: 'Graphic assets for apps',
        },
      },
    ],
  },
];

export default function DesignService() {
  const { t, language } = useLanguage();
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const isRTL = language === 'ar';

  const labelFor = (item: any) => item.labels[language] || item.labels.fr;

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* HEADER */}
      <div className="bg-gradient-to-br from-[#F15A24] to-[#ff7e50] text-white py-20 md:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t('design.title')}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            {t('design.desc')}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 space-y-16">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          const sectionActiveItem = section.items.find(
            (it) => it.id === activeItemId
          );
          const images =
            (sectionActiveItem &&
              designGalleries[sectionActiveItem.galleryKey]) ||
            [];

          return (
            <div
              key={idx}
              className="bg-[#F7F7F7] rounded-3xl p-6 md:p-10 shadow-sm"
            >
              {/* section title */}
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F15A24] to-[#ff7e50] rounded-xl flex items-center justify-center shadow-lg">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h2
                  className={`text-2xl md:text-3xl font-bold text-[#1A1A1A] ${
                    isRTL ? 'mr-4' : 'ml-4'
                  }`}
                >
                  {t(section.titleKey)}
                </h2>
              </div>

              {/* bullet list clickable */}
              <ul className="space-y-3 md:space-y-4">
                {section.items.map((item) => {
                  const active = activeItemId === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveItemId(
                            activeItemId === item.id ? null : item.id
                          )
                        }
                        className={`flex items-start w-full text-left rounded-2xl px-3 py-2 md:px-4 md:py-3 transition-all ${
                          active
                            ? 'bg-white shadow-md'
                            : 'hover:bg-white/60 hover:shadow-sm'
                        }`}
                      >
                        <div
                          className={`w-2 h-2 bg-[#F15A24] rounded-full mt-2 flex-shrink-0 ${
                            isRTL ? 'ml-3' : 'mr-3'
                          }`}
                        />
                        <span className="text-[#2B2B2B] text-base md:text-lg">
                          {labelFor(item)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* gallery for active item in this section */}
              {sectionActiveItem && images.length > 0 && (
                <div className="mt-6 md:mt-8">
                  <div className="flex items-baseline justify-between mb-3 md:mb-4">
                    <div>
                      <p className="font-semibold text-sm md:text-base text-[#1A1A1A]">
                        {language === 'fr' &&
                          'Exemples de réalisations pour :'}
                        {language === 'ar' && 'أمثلة من أعمالنا في:'}
                        {language === 'en' && 'Selected work for:'}
                      </p>
                      <p className="text-sm md:text-base text-[#F15A24] font-semibold">
                        {labelFor(sectionActiveItem)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {images.map((src, i) => (
                      <div
                        key={i}
                        className="relative overflow-hidden rounded-2xl bg-black/5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                      >
                        <img
                          src={src}
                          alt="Design example"
                          className="w-full h-32 md:h-40 lg:h-48 object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* WHATSAPP BUTTONS */}
        <div className="mt-8 space-y-4">
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

        {/* BACK */}
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