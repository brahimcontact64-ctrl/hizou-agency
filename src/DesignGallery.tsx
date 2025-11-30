import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image as ImageIcon, LayoutGrid, Palette, Printer, Package } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';



const logoImages = Object.values(
  import.meta.glob('../assets/logo/*.{jpg,jpeg,png}', { eager: true, as: 'url' })
) as string[];

const businessCardImages = Object.values(
  import.meta.glob('../assets/business-card/*.{jpg,jpeg,png}', { eager: true, as: 'url' })
) as string[];

const brochureImages = Object.values(
  import.meta.glob('../assets/brochure/*.{jpg,jpeg,png}', { eager: true, as: 'url' })
) as string[];

const bookImages = Object.values(
  import.meta.glob('../assets/book/*.{jpg,jpeg,png}', { eager: true, as: 'url' })
) as string[];

const bookCoverImages = Object.values(
  import.meta.glob('../assets/book-coover/*.{jpg,jpeg,png}', { eager: true, as: 'url' })
) as string[];

const catalogImages = Object.values(
  import.meta.glob('../assets/catalog/*.{jpg,jpeg,png}', { eager: true, as: 'url' })
) as string[];

const certificateImages = Object.values(
  import.meta.glob('../assets/certificate/*.{jpg,jpeg,png}', { eager: true, as: 'url' })
) as string[];

const rollupImages = Object.values(
  import.meta.glob('../assets/rollup/*.{jpg,jpeg,png}', { eager: true, as: 'url' })
) as string[];

const adsImages = Object.values(
  import.meta.glob('../assets/ads/*.{jpg,jpeg,png}', { eager: true, as: 'url' })
) as string[];

const occasionsImages = Object.values(
  import.meta.glob('../assets/occasions/*.{jpg,jpeg,png}', { eager: true, as: 'url' })
) as string[];

const eventImages = Object.values(
  import.meta.glob('../assets/EVENT/*.{jpg,jpeg,png}', { eager: true, as: 'url' })
) as string[];

const packagingImages = Object.values(
  import.meta.glob('../assets/packaging/*.{jpg,jpeg,png}', { eager: true, as: 'url' })
) as string[];

type GroupId = 'branding' | 'print' | 'social' | 'packaging';

interface GalleryGroup {
  id: GroupId;
  icon: typeof LayoutGrid;
  labelKey: string;
}

interface GalleryCategory {
  id: string;
  group: GroupId;
  labelKey: string;
  images: string[];
}

const GROUPS: GalleryGroup[] = [
  { id: 'branding', icon: Palette, labelKey: 'design.gallery.group.branding' },
  { id: 'print', icon: Printer, labelKey: 'design.gallery.group.print' },
  { id: 'social', icon: ImageIcon, labelKey: 'design.gallery.group.social' },
  { id: 'packaging', icon: Package, labelKey: 'design.gallery.group.packaging' }
];

const CATEGORIES: GalleryCategory[] = [
  {
    id: 'logo',
    group: 'branding',
    labelKey: 'design.gallery.category.logo',
    images: logoImages
  },
  {
    id: 'business-card',
    group: 'branding',
    labelKey: 'design.gallery.category.businessCard',
    images: businessCardImages
  },
  {
    id: 'brochure',
    group: 'print',
    labelKey: 'design.gallery.category.brochure',
    images: brochureImages
  },
  {
    id: 'book',
    group: 'print',
    labelKey: 'design.gallery.category.book',
    images: bookImages
  },
  {
    id: 'book-cover',
    group: 'print',
    labelKey: 'design.gallery.category.bookCover',
    images: bookCoverImages
  },
  {
    id: 'catalog',
    group: 'print',
    labelKey: 'design.gallery.category.catalog',
    images: catalogImages
  },
  {
    id: 'certificate',
    group: 'print',
    labelKey: 'design.gallery.category.certificate',
    images: certificateImages
  },
  {
    id: 'rollup',
    group: 'print',
    labelKey: 'design.gallery.category.rollup',
    images: rollupImages
  },
  {
    id: 'ads',
    group: 'social',
    labelKey: 'design.gallery.category.ads',
    images: adsImages
  },
  {
    id: 'occasions',
    group: 'social',
    labelKey: 'design.gallery.category.occasions',
    images: occasionsImages
  },
  {
    id: 'event',
    group: 'social',
    labelKey: 'design.gallery.category.event',
    images: eventImages
  },
  {
    id: 'packaging',
    group: 'packaging',
    labelKey: 'design.gallery.category.packaging',
    images: packagingImages
  }
];

export default function DesignGallery() {
  const { t, language } = useLanguage();
  const [activeGroup, setActiveGroup] = useState<GroupId>('branding');

  const isRtl = language === 'ar';

  const visibleCategories = CATEGORIES.filter(
    (cat) => cat.group === activeGroup && cat.images.length > 0
  );

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <div className="bg-gradient-to-br from-[#F15A24] to-[#ff7e50] text-white py-20 md:py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-52 h-52 bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <p className="uppercase tracking-[0.25em] text-sm md:text-xs text-white/70 mb-4">
            Hizou · Design Studio
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t('design.gallery.title')}
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto">
            {t('design.gallery.subtitle')}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Tabs */}
        <div
          className={`flex flex-wrap gap-3 md:gap-4 mb-10 justify-center ${
            isRtl ? 'md:flex-row-reverse' : ''
          }`}
        >
          {GROUPS.map((group) => {
            const Icon = group.icon;
            const isActive = group.id === activeGroup;

            return (
              <button
                key={group.id}
                onClick={() => setActiveGroup(group.id)}
                className={`inline-flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-full border text-sm md:text-base transition-all shadow-sm ${
                  isActive
                    ? 'bg-[#F15A24] border-[#F15A24] text-white shadow-md'
                    : 'bg-white border-gray-200 text-gray-800 hover:border-[#F15A24]/60 hover:text-[#F15A24]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t(group.labelKey as any)}</span>
              </button>
            );
          })}
        </div>

        {/* Gallery sections */}
        {visibleCategories.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            {t('design.gallery.empty')}
          </div>
        ) : (
          <div className="space-y-12">
            {visibleCategories.map((category) => (
              <section key={category.id} id={category.id}>
                <div
                  className={`flex items-center justify-between mb-4 ${
                    isRtl ? 'flex-row-reverse' : ''
                  }`}
                >
                  <h2 className="text-xl md:text-2xl font-semibold text-[#1A1A1A]">
                    {t(category.labelKey as any)}
                  </h2>
                  <span className="text-xs md:text-sm text-gray-500">
                    {category.images.length} {t('design.gallery.itemsCount')}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {category.images.map((src, idx) => (
                    <div
                      key={idx}
                      className="group relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <img
                        src={src}
                        alt={`${category.id}-${idx + 1}`}
                        className="w-full h-56 md:h-64 object-cover transform group-hover:scale-[1.03] transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Back to services */}
        <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Link
            to="/services/design"
            className={`inline-flex items-center justify-center px-6 py-3 rounded-2xl border border-[#F15A24] text-[#F15A24] hover:bg-[#F15A24] hover:text-white font-semibold text-base md:text-lg transition-all ${
              isRtl ? 'flex-row-reverse' : ''
            }`}
          >
            <span>{t('design.gallery.backToDesign')}</span>
          </Link>

          <Link
            to="/"
            className={`text-sm md:text-base text-gray-500 hover:text-[#F15A24] transition-colors ${
              isRtl ? 'text-right' : 'text-left'
            }`}
          >
            {t('design.gallery.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}