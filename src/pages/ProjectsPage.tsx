// ================================================
//  PROJECTS PAGE — WITH ACCORDION SECTIONS
// ================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Brush,
  Layout,
  Camera,
  MonitorPlay,
  Globe2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  fetchAllCreativeVideos,
  fetchImagesFromFolder,
  fetchVideosFromFolder
} from '../utils/fetchVideos';

/* ====================================================
      TYPE DEFINITIONS
==================================================== */

interface CreativeVideos {
  [key: string]: string[];
}

/* ====================================================
      DESIGN SECTIONS
==================================================== */

const designSections = [
  {
    icon: Brush,
    titleKey: 'design.section1.title',
    items: [
      { id: 'logo', galleryKey: 'logo', labelKey: 'services.design.logo' },
      { id: 'flyer', galleryKey: 'brochure', labelKey: 'services.design.flyer' },
      { id: 'ad', galleryKey: 'ads', labelKey: 'services.design.ad' },
      { id: 'card', galleryKey: 'business-card', labelKey: 'services.design.card' },
      { id: 'book-mag', galleryKey: 'book', labelKey: 'services.design.book' },
    ],
  },

  {
    icon: Layout,
    titleKey: 'design.section2.title',
    items: [
      { id: 'banner-rollup', galleryKey: 'rollup', labelKey: 'services.design.banner' },
      { id: 'storefront-design', galleryKey: 'ads', labelKey: 'services.design.storefront' },
      { id: 'car-wrapping', galleryKey: 'packaging', labelKey: 'services.design.wrapping' },
      { id: 'packaging-all', galleryKey: 'packaging', labelKey: 'services.design.packaging' },
    ],
  },
];

/* ====================================================
      CREATIVE LIST
==================================================== */

const creativeItems = [
  { id: 'deplacements', key: 'deplacements', labelKey: 'creatives.item1' },
  { id: 'fashion', key: 'fashion', labelKey: 'creatives.item2' },
  { id: 'kitchen', key: 'kitchen', labelKey: 'creatives.item3' },
  { id: 'decor', key: 'decor', labelKey: 'creatives.item4' },
  { id: 'cosmetics', key: 'cosmetics', labelKey: 'creatives.item5' },
  { id: 'kids', key: 'kids', labelKey: 'creatives.item6' },
  { id: 'others', key: 'others', labelKey: 'creatives.item7' },
  { id: 'montage', key: 'montage', labelKey: 'creatives.item8' },
];

/* ====================================================
      DEV THEMES
==================================================== */

const devThemeCategories = [
  {
    id: 'fashion',
    titleFr: 'E-commerce Fashion',
    titleAr: 'قوالب متجر الملابس (Fashion)',
    themes: [
      {
        id: 'hizou-fashion-1',
        title: 'Hizou Fashion 1',
        previewUrl: 'https://theme-hizou-1.vercel.app/',
        thumbnail: 'https://api.microlink.io/?url=https://theme-hizou-1.vercel.app/&screenshot=true&meta=false&embed=screenshot.url&viewport.isMobile=true&waitUntil=networkidle0'
      },
      {
        id: 'hizou-fashion-2',
        title: 'Hizou Fashion 2',
        previewUrl: 'https://theme-hizou-2-n166.vercel.app/',
        thumbnail: 'https://api.microlink.io/?url=https://theme-hizou-2-n166.vercel.app/&screenshot=true&meta=false&embed=screenshot.url&viewport.isMobile=true&waitUntil=networkidle0'
      },
      {
        id: 'hizou-fashion-3',
        title: 'Hizou Fashion 3',
        previewUrl: 'https://theme-hizou-3.vercel.app/',
        thumbnail: 'https://api.microlink.io/?url=https://theme-hizou-3.vercel.app/&screenshot=true&meta=false&embed=screenshot.url&viewport.isMobile=true&waitUntil=networkidle0'
      },
    ],
  },

  {
    id: 'kids',
    titleFr: 'Boutique enfants / Kids',
    titleAr: 'قوالب متجر الأطفال (Kids)',
    themes: [
      {
        id: 'kids-theme-1',
        title: 'Kids Store Theme 1',
        previewUrl: 'https://kids-store-theme-1.vercel.app/',
        thumbnail: 'https://api.microlink.io/?url=https://kids-store-theme-1.vercel.app/&screenshot=true&meta=false&embed=screenshot.url&viewport.isMobile=true&waitUntil=networkidle0'
      },
      {
        id: 'kids-theme-2',
        title: 'Kids Store Theme 2',
        previewUrl: 'https://kids-store-theme-2.vercel.app/',
        thumbnail: 'https://api.microlink.io/?url=https://kids-store-theme-2.vercel.app/&screenshot=true&meta=false&embed=screenshot.url&viewport.isMobile=true&waitUntil=networkidle0'
      },
      {
        id: 'kids-theme-3',
        title: 'Kids Store Theme 3',
        previewUrl: 'https://kids-store-theme-3.vercel.app/',
        thumbnail: 'https://api.microlink.io/?url=https://kids-store-theme-3.vercel.app/&screenshot=true&meta=false&embed=screenshot.url&viewport.isMobile=true&waitUntil=networkidle0'
      },
    ],
  },

  {
    id: 'decor',
    titleFr: 'Décoration & Maison',
    titleAr: 'قوالب الديكور و المنزل',
    themes: [
      {
        id: 'decor-theme-1',
        title: 'Décor Theme 1',
        previewUrl: 'https://decor-theme-1.vercel.app/',
        thumbnail: 'https://api.microlink.io/?url=https://decor-theme-1.vercel.app/&screenshot=true&meta=false&embed=screenshot.url&viewport.isMobile=true&waitUntil=networkidle0'
      },
      {
        id: 'decor-theme-2',
        title: 'Décor Theme 2',
        previewUrl: 'https://decor-theme-2.vercel.app/',
        thumbnail: 'https://api.microlink.io/?url=https://decor-theme-2.vercel.app/&screenshot=true&meta=false&embed=screenshot.url&viewport.isMobile=true&waitUntil=networkidle0'
      },
      {
        id: 'decor-theme-3',
        title: 'Décor Theme 3',
        previewUrl: 'https://decor-theme-3.vercel.app/',
        thumbnail: 'https://api.microlink.io/?url=https://decor-theme-3.vercel.app/&screenshot=true&meta=false&embed=screenshot.url&viewport.isMobile=true&waitUntil=networkidle0'
      },
    ],
  },

  {
    id: 'electronics',
    titleFr: 'Électronique & Tech',
    titleAr: 'قوالب الإلكترونيات و التقنية',
    themes: [
      {
        id: 'tech-theme-1',
        title: 'Tech Theme 1',
        previewUrl: 'https://tech-theme-1.vercel.app/',
        thumbnail: 'https://api.microlink.io/?url=https://tech-theme-1.vercel.app/&screenshot=true&meta=false&embed=screenshot.url&viewport.isMobile=true&waitUntil=networkidle0'
      },
      {
        id: 'tech-theme-2',
        title: 'Tech Theme 2',
        previewUrl: 'https://tech-theme-2.vercel.app/',
        thumbnail: 'https://api.microlink.io/?url=https://tech-theme-2.vercel.app/&screenshot=true&meta=false&embed=screenshot.url&viewport.isMobile=true&waitUntil=networkidle0'
      },
      {
        id: 'tech-theme-3',
        title: 'Tech Theme 3',
        previewUrl: 'https://teche-theme-3.vercel.app/',
        thumbnail: 'https://api.microlink.io/?url=https://teche-theme-3.vercel.app/&screenshot=true&meta=false&embed=screenshot.url&viewport.isMobile=true&waitUntil=networkidle0'
      },
    ],
  },
];

/* ====================================================
      COMPONENT
==================================================== */

export default function Projects() {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  const [creativeVideosState, setCreativeVideosState] = useState<CreativeVideos>({
    deplacements: [],
    fashion: [],
    kitchen: [],
    decor: [],
    cosmetics: [],
    kids: [],
    others: [],
    montage: [],
  });

  const [designImages, setDesignImages] = useState<Record<string, string[]>>({});
  const [sponsorImages, setSponsorImages] = useState<string[]>([]);
  const [sponsoringVideos, setSponsoringVideos] = useState<string[]>([]);
  const [socialVideos, setSocialVideos] = useState<string[]>([]);

  const [creativeOpen, setCreativeOpen] = useState(true);
  const [designOpen, setDesignOpen] = useState(false);
  const [devOpen, setDevOpen] = useState(false);
  const [sponsoringOpen, setSponsoringOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);

  const [activeCreativeId, setActiveCreativeId] = useState<string | null>(null);
  const [activeDesignItemId, setActiveDesignItemId] = useState<string | null>(null);

  useEffect(() => {
    const loadAllMedia = async () => {
      const categories = ['deplacements', 'fashion', 'kitchen', 'decor', 'cosmetics', 'kids', 'others', 'montage'];

      const creativeVideos = await fetchAllCreativeVideos(categories);
      setCreativeVideosState(creativeVideos);

      const galleryKeys = ['logo', 'business-card', 'book', 'ads', 'brochure', 'rollup', 'packaging', 'EVENT'];
      const designData: Record<string, string[]> = {};

      await Promise.all(
        galleryKeys.map(async (key) => {
          const images = await fetchImagesFromFolder(`images/design/${key}`);
          designData[key] = images;
        })
      );

      setDesignImages(designData);

      const [sponsors, sponsoringVids, socialVids] = await Promise.all([
        fetchImagesFromFolder('images/sponsor'),
        fetchVideosFromFolder('videos/sponsoring'),
        fetchVideosFromFolder('videos/social')
      ]);

      setSponsorImages(sponsors);
      setSponsoringVideos(sponsoringVids);
      setSocialVideos(socialVids);
    };

    loadAllMedia();
  }, []);

  const designGalleries: Record<string, string[]> = {
    logo: designImages.logo || [],
    'business-card': designImages['business-card'] || [],
    book: designImages.book || [],
    ads: designImages.ads || [],
    brochure: designImages.brochure || [],
    rollup: designImages.rollup || [],
    packaging: designImages.packaging || [],
    EVENT: designImages.EVENT || [],
  };

  useEffect(() => {
    const videoMap = videoRefs.current;
    const videoElements = Array.from(videoMap.values());

    if (videoElements.length === 0) return;

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (!('IntersectionObserver' in window) || isIOS) {
      videoElements.forEach((video) => {
        const dataSrc = video.getAttribute('data-src');
        if (dataSrc && !video.src) {
          video.src = dataSrc;
          video.load();
        }
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;

          if (entry.isIntersecting) {
            const dataSrc = video.getAttribute('data-src');
            if (dataSrc && !video.src) {
              video.src = dataSrc;
              video.load();
              video.removeAttribute('data-src');
            }
          }
        });
      },
      { rootMargin: '200px', threshold: 0.01 }
    );

    videoElements.forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [creativeVideosState, socialVideos, sponsoringVideos, activeCreativeId]);

  const handleVideoRef = useCallback((el: HTMLVideoElement | null, key: string) => {
    if (el) {
      videoRefs.current.set(key, el);
    } else {
      videoRefs.current.delete(key);
    }
  }, []);

  const renderVideoGrid = (videos: string[], keyPrefix: string = 'video') => {
    if (!videos || videos.length === 0) {
      return null;
    }

    const validVideos = videos.filter(src => src && typeof src === 'string' && src.trim().length > 0);

    if (validVideos.length === 0) {
      return null;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {validVideos.map((src, i) => {
          const videoKey = `${keyPrefix}-${i}-${src.slice(-10)}`;

          return (
            <div
              key={videoKey}
              className="relative overflow-hidden rounded-2xl bg-black/10 shadow-sm hover:shadow-md transition"
            >
              <video
                ref={(el) => handleVideoRef(el, videoKey)}
                data-src={src}
                controls
                playsInline
                webkit-playsinline="true"
                preload="metadata"
                muted
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f3f4f6' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-family='system-ui' font-size='14' fill='%236b7280' text-anchor='middle' dy='.3em'%3ETap to play%3C/text%3E%3C/svg%3E"
                className="w-full h-48 md:h-56 object-cover bg-black/20"
              />
            </div>
          );
        })}
      </div>
    );
  };

  /* ====================================================
        MAIN RENDER
  ==================================================== */

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* HEADER */}
      <div className="bg-gradient-to-br from-[#F15A24] to-[#ff7e50] text-white py-20 md:py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t('projects.title')}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 space-y-10">

        {/* =============================================== */}
        {/*                 CREATIVES — ACCORDION          */}
        {/* =============================================== */}

        <section>
          <button
            onClick={() => setCreativeOpen(!creativeOpen)}
            className="w-full flex items-center justify-between bg-[#FFF1EB] px-5 py-4 rounded-2xl shadow-sm"
          >
            <div className="flex items-center">
              <div className="w-11 h-11 bg-gradient-to-br from-[#F15A24] to-[#ff7e50] rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl md:text-2xl font-bold ${isRTL ? 'mr-3' : 'ml-3'}`}>
                {t('projects.creatives.title')}
              </span>
            </div>

            {creativeOpen ? (
              <ChevronUp className="w-6 h-6 text-[#F15A24]" />
            ) : (
              <ChevronDown className="w-6 h-6 text-[#F15A24]" />
            )}
          </button>

          {creativeOpen && (
            <div className="mt-5">
              <p className="text-gray-600 mb-6">
                {t('projects.creatives.description')}
              </p>

              <ul className="space-y-3 md:space-y-4 mb-6">
                {creativeItems.map((item) => {
                  const active = activeCreativeId === item.id;
                  const videos = creativeVideosState[item.key] || [];

                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => setActiveCreativeId(active ? null : item.id)}
                        className={`flex items-start w-full rounded-2xl px-3 py-3 transition
                          ${
                            active
                              ? 'bg-[#FFF7F3] shadow-md border border-[#F15A24]/40'
                              : 'hover:bg-[#FFF7F3]/60'
                          }
                        `}
                        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                      >
                        <div className={`w-2 h-2 bg-[#F15A24] rounded-full ${
                          isRTL ? 'ml-3' : 'mr-3'
                        }`} />

                        <span
                          className={`text-[#2B2B2B] text-base md:text-lg flex-1 ${
                            isRTL ? 'text-right' : 'text-left'
                          }`}
                        >
                          {t(item.labelKey)}
                        </span>

                        <MonitorPlay className="w-5 h-5 text-[#F15A24]" />
                      </button>

                      {active && videos.length > 0 && (
                        <div className={`mt-4 ${isRTL ? 'mr-5' : 'ml-5'}`}>
                          {renderVideoGrid(videos, `creative-${item.key}`)}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>

        {/* =============================================== */}
        {/*                 DESIGN — ACCORDION             */}
        {/* =============================================== */}

        <section>
          <button
            onClick={() => setDesignOpen(!designOpen)}
            className="w-full flex items-center justify-between bg-[#FFF1EB] px-5 py-4 rounded-2xl shadow-sm"
          >
            <div className="flex items-center">
              <div className="w-11 h-11 bg-gradient-to-br from-[#F15A24] to-[#ff7e50] rounded-xl flex items-center justify-center">
                <Brush className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl md:text-2xl font-bold ${isRTL ? 'mr-3' : 'ml-3'}`}>
                {t('design.title')}
              </span>
            </div>

            {designOpen ? (
              <ChevronUp className="w-6 h-6 text-[#F15A24]" />
            ) : (
              <ChevronDown className="w-6 h-6 text-[#F15A24]" />
            )}
          </button>

          {designOpen && (
            <div className="mt-6 space-y-8">
              {designSections.map((section, idx) => {
                const Icon = section.icon;
                const sectionActiveItem = section.items.find(
                  (it) => it.id === activeDesignItemId
                );
                const images = sectionActiveItem && designGalleries[sectionActiveItem.galleryKey]
                  ? designGalleries[sectionActiveItem.galleryKey]
                  : [];

                return (
                  <div key={idx} className="bg-[#F7F7F7] rounded-3xl p-6 md:p-10 shadow-sm">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#F15A24] to-[#ff7e50] rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className={`text-xl md:text-2xl font-bold ${isRTL ? 'mr-4' : 'ml-4'}`}>
                        {t(section.titleKey)}
                      </h3>
                    </div>

                    <ul className="space-y-3">
                      {section.items.map((item) => {
                        const active = activeDesignItemId === item.id;
                        return (
                          <li key={item.id}>
                            <button
                              type="button"
                              onClick={() => setActiveDesignItemId(active ? null : item.id)}
                              className={`flex items-start w-full rounded-2xl px-3 py-3 transition
                                ${active ? 'bg-white shadow-md' : 'hover:bg-white/60'}
                              `}
                            >
                              <div className={`w-2 h-2 bg-[#F15A24] rounded-full mt-2 ${
                                isRTL ? 'ml-3' : 'mr-3'
                              }`} />
                              <span className="text-[#2B2B2B] text-base md:text-lg">
                                {t(item.labelKey)}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>

                    {sectionActiveItem && images.length > 0 && (
                      <div className="mt-8">
                        <p className="font-semibold text-sm">{t('design.examples')}</p>
                        <p className="text-sm text-[#F15A24] font-semibold mb-3">
                          {t(sectionActiveItem.labelKey)}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {images.map((src, i) => (
                            <div
                              key={`img-${activeDesignItemId}-${i}`}
                              className="overflow-hidden rounded-2xl bg-black/5 shadow-sm hover:shadow-md"
                            >
                              <img
                                src={src}
                                alt="Design example"
                                loading="lazy"
                                className="w-full h-32 md:h-40 object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* =============================================== */}
        {/*         DEV THEMES — ACCORDION                  */}
        {/* =============================================== */}

        <section>
          <button
            onClick={() => setDevOpen(!devOpen)}
            className="w-full flex items-center justify-between bg-[#FFF1EB] px-5 py-4 rounded-2xl shadow-sm"
          >
            <div className="flex items-center">
              <div className="w-11 h-11 bg-gradient-to-br from-[#F15A24] to-[#ff7e50] rounded-xl flex items-center justify-center">
                <Globe2 className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl md:text-2xl font-bold ${isRTL ? 'mr-3' : 'ml-3'}`}>
                {t('projects.dev.title')}
              </span>
            </div>

            {devOpen ? (
              <ChevronUp className="w-6 h-6 text-[#F15A24]" />
            ) : (
              <ChevronDown className="w-6 h-6 text-[#F15A24]" />
            )}
          </button>

          {devOpen && (
            <div className="mt-6 space-y-8">
              {devThemeCategories.map((cat) => (
                <div key={cat.id} className="bg-[#F7F7F7] rounded-3xl p-6 md:p-8 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-xl md:text-2xl font-semibold">
                      {isRTL ? cat.titleAr : cat.titleFr}
                    </h3>

                    <span className="text-xs text-gray-500">
                      {cat.themes.length} {isRTL ? 'ثيمات جاهزة' : 'thèmes prêts'}
                    </span>
                  </div>

                  {cat.themes.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">
                      {isRTL
                        ? 'القوالب لهذا القسم ستُضاف قريبًا.'
                        : 'Les thèmes de cette catégorie seront ajoutés prochainement.'}
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {cat.themes.map((theme) => (
                        <div
                          key={theme.id}
                          className="rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition flex flex-col"
                        >
                          <div className="h-32 md:h-40 overflow-hidden rounded-t-2xl bg-gray-100">
                            <img
                              src={theme.thumbnail}
                              alt={theme.title}
                              loading="lazy"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect fill='%23f3f4f6' width='600' height='400'/%3E%3Ctext x='50%25' y='50%25' font-family='system-ui' font-size='16' fill='%236b7280' text-anchor='middle' dy='.3em'%3E${encodeURIComponent(theme.title)}%3C/text%3E%3C/svg%3E`;
                              }}
                            />
                          </div>

                          <div className="p-4 flex-1 flex flex-col justify-between">
                            <p className="text-xs text-gray-600 mb-3">
                              {isRTL
                                ? 'ثيم احترافي جاهز لمتجر إلكتروني كامل مع دعم العربية والفرنسية.'
                                : 'Thème e-commerce professionnel bilingue (FR/AR) prêt à l\'emploi.'}
                            </p>

                            <a
                              href={theme.previewUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#F15A24] text-white text-sm font-semibold hover:bg-[#d94e1f]"
                            >
                              {isRTL ? 'معاينة الثيم' : 'Voir le thème'}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* =============================================== */}
        {/*         SPONSORING — ACCORDION                  */}
        {/* =============================================== */}

        <section>
          <button
            onClick={() => setSponsoringOpen(!sponsoringOpen)}
            className="w-full flex items-center justify-between bg-[#FFF1EB] px-5 py-4 rounded-2xl shadow-sm"
          >
            <div className="flex items-center">
              <div className="w-11 h-11 bg-gradient-to-br from-[#F15A24] to-[#ff7e50] rounded-xl flex items-center justify-center">
                <MonitorPlay className="w-6 h-6 text-white" />
              </div>

              <span className={`text-xl md:text-2xl font-bold ${isRTL ? 'mr-3' : 'ml-3'}`}>
                {t('projects.sponsoring.title')}
              </span>
            </div>

            {sponsoringOpen ? (
              <ChevronUp className="w-6 h-6 text-[#F15A24]" />
            ) : (
              <ChevronDown className="w-6 h-6 text-[#F15A24]" />
            )}
          </button>

          {sponsoringOpen && (
            <div className="mt-6 space-y-10">
              {sponsorImages.length > 0 && (
                <div>
                  <p className="font-semibold text-sm">{t('projects.sponsoring.sponsors')}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {sponsorImages.map((src, i) => (
                      <div
                        key={`sponsor-${i}`}
                        className="rounded-2xl bg-white shadow-sm hover:shadow-md transition flex items-center justify-center p-4"
                        style={{ height: '450px' }}
                      >
                        <img
                          src={src}
                          alt="Sponsor"
                          loading="lazy"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {sponsoringVideos.length > 0 && (
                <div>
                  <p className="font-semibold text-sm mb-4">{t('projects.sponsoring.videos')}</p>
                  {renderVideoGrid(sponsoringVideos, 'sponsoring')}
                </div>
              )}
            </div>
          )}
        </section>

        {/* =============================================== */}
        {/*         SOCIAL — ACCORDION                      */}
        {/* =============================================== */}

        <section>
          <button
            onClick={() => setSocialOpen(!socialOpen)}
            className="w-full flex items-center justify-between bg-[#FFF1EB] px-5 py-4 rounded-2xl shadow-sm"
          >
            <div className="flex items-center">
              <div className="w-11 h-11 bg-gradient-to-br from-[#F15A24] to-[#ff7e50] rounded-xl flex items-center justify-center">
                <Layout className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl md:text-2xl font-bold ${isRTL ? 'mr-3' : 'ml-3'}`}>
                {t('projects.social.title')}
              </span>
            </div>

            {socialOpen ? (
              <ChevronUp className="w-6 h-6 text-[#F15A24]" />
            ) : (
              <ChevronDown className="w-6 h-6 text-[#F15A24]" />
            )}
          </button>

          {socialOpen && socialVideos.length > 0 && (
            <div className="mt-6">
              <p className="text-gray-600 mb-4">{t('projects.social.description')}</p>
              {renderVideoGrid(socialVideos, 'social')}
            </div>
          )}
        </section>

        {/* CTA BUTTONS */}
        <div className="mt-12 space-y-4">
          <a
            href="https://wa.me/213775643433"
            className="block w-full bg-[#25D366] text-white py-5 rounded-2xl text-center font-semibold text-lg hover:bg-[#1ebe5b]"
          >
            {t('button.whatsapp1')}
          </a>

          <a
            href="https://wa.me/213549278411"
            className="block w-full bg-[#25D366] text-white py-5 rounded-2xl text-center font-semibold text-lg hover:bg-[#1ebe5b]"
          >
            {t('button.whatsapp2')}
          </a>
        </div>

        {/* BACK */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center text-[#F15A24] hover:text-[#d94e1f] text-lg font-semibold"
          >
            <ArrowLeft className={`w-5 h-5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
            {t('button.backhome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
