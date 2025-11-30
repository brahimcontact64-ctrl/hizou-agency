import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {

  // ---------------- NAV ----------------
  'nav.home': { fr: 'Accueil', ar: 'الرئيسية', en: 'Home' },
  'nav.services': { fr: 'Services', ar: 'الخدمات', en: 'Services' },
  'nav.projects': { fr: 'Projets', ar: 'المشاريع', en: 'Projects' },
  'nav.contact': { fr: 'Contact', ar: 'اتصل بنا', en: 'Contact' },

  // ---------------- HEADER ----------------
  'header.logo': {
    fr: 'Hizou Agency',
    ar: 'Hizou Agency',
    en: 'Hizou Agency'
  },

  // ---------------- FOOTER ----------------
  'footer.developed': {
   fr: 'Développé par Dzenix',
  ar: 'تم تطويره من طرف Dzenix',
  en: 'Developed by Dzenix'

  },

  // ---------------- HERO ----------------
  'hero.title': {
    fr: 'Votre Partenaire Créatif Digital',
    ar: 'شريكك الإبداعي الرقمي',
    en: 'Your Creative Digital Partner'
  },
  'hero.subtitle': {
    fr: 'Marketing • Production • Design',
    ar: 'تسويق • إنتاج • تصميم',
    en: 'Marketing • Production • Design'
  },
  'hero.cta': { fr: 'Contactez-nous', ar: 'اتصل بنا', en: 'Contact Us' },

  // ---------------- SERVICES ----------------
  'services.title': { fr: 'Nos Services', ar: 'خدماتنا', en: 'Our Services' },

  'pack1.title': {
    fr: 'Gestion & Marketing des Réseaux Sociaux',
    ar: 'إدارة وتسويق وسائل التواصل الاجتماعي',
    en: 'Social Media Management & Marketing'
  },
  'pack1.desc': {
    fr: 'Gestion complète des réseaux sociaux, création de contenu, stratégie et développement web',
    ar: 'إدارة كاملة لوسائل التواصل الاجتماعي، إنشاء المحتوى، الاستراتيجية والتطوير',
    en: 'Complete social media management, content creation, strategy and web development'
  },

  'pack2.title': {
    fr: 'Production & Montage Vidéo',
    ar: 'الإنتاج والمونتاج الفيديو',
    en: 'Video Production & Editing'
  },
  'pack2.desc': {
    fr: 'Tournage professionnel, montage créatif, scripts et voix-off',
    ar: 'تصوير احترافي، مونتاج إبداعي، سكريبت وتعليق صوتي',
    en: 'Professional shooting, creative editing, scripts and voice-over'
  },

  'pack3.title': {
    fr: 'Branding & Design Graphique',
    ar: 'العلامة التجارية والتصميم الجرافيكي',
    en: 'Branding & Graphic Design'
  },
  'pack3.desc': {
    fr: 'Identité visuelle, réseaux sociaux, packaging et supports imprimés',
    ar: 'الهوية البصرية، التصميم، التغليف والمطبوعات',
    en: 'Visual identity, design, packaging and print materials'
  },

  'price.from': { fr: 'À partir de', ar: 'ابتداء من', en: 'Starting from' },

  // ---------- BUTTONS ----------
   /* --------------------------------------------
      GENERAL PROJECTS
  ---------------------------------------------*/

  'projects.title': {
    fr: 'Nos Projets',
    ar: 'أعمالنا',
    en: 'Our Projects',
  },

  'projects.subtitle': {
    fr: 'Un aperçu de nos créations : vidéos, design, web et campagnes digitales.',
    ar: 'نظرة على أعمالنا: فيديوهات، تصاميم، مواقع، وحملات رقمية.',
    en: 'A look at our work: videos, design, web projects, and digital campaigns.',
  },

  'projects.noVideos': {
    fr: 'Les vidéos seront ajoutées prochainement.',
    ar: 'سيتم إضافة الفيديوهات قريبًا.',
    en: 'Videos will be added soon.',
  },


  /* --------------------------------------------
      CREATIVES
  ---------------------------------------------*/

  'projects.creatives.title': {
    fr: 'Creatives',
    ar: 'الكرياتيف (تصوير + فيديو)',
    en: 'Creatives',
  },

  'projects.creatives.description': {
    fr: '1/ Creatives : déplacements, mode, cuisine, déco, cosmétique, enfants, autres produits, montage.',
    ar: '1/ Creatives: تصوير وتنفيذ فيديوهات حسب نوع النشاط.',
    en: '1/ Creatives: shootings & videos for different niches.',
  },

  'creatives.item1': {
    fr: 'Déplacements / Extérieur',
    ar: 'تنقلات / خارجية',
    en: 'Outdoor / On location',
  },

  'creatives.item2': {
    fr: '👗👖👠👜 – Mode & vêtements',
    ar: '👗👖👠👜 – أزياء وملابس',
    en: '👗👖👠👜 – Fashion & clothing',
  },

  'creatives.item3': {
    fr: 'Cuisine / Restauration',
    ar: 'كوزينة / مطاعم',
    en: 'Kitchen / Food',
  },

  'creatives.item4': {
    fr: 'Décoration',
    ar: 'ديكور',
    en: 'Decoration',
  },

  'creatives.item5': {
    fr: 'Cosmétique & beauté',
    ar: 'كوسميتيك و تجميل',
    en: 'Cosmetics & beauty',
  },

  'creatives.item6': {
    fr: ' UGC-Presantation',
    ar: 'UGC',
    en: 'UGC-Presantation',
  },

  'creatives.item7': {
    fr: 'Autres produits',
    ar: 'منتجات أخرى',
    en: 'Other products',
  },

  'creatives.item8': {
    fr: 'Montage vidéo',
    ar: 'مونتاج فيديو',
    en: 'Video editing',
  },


  /* --------------------------------------------
      DESIGN — TITLES
  ---------------------------------------------*/

  'design.title': {
    fr: 'Design',
    ar: 'التصميم',
    en: 'Design',
  },

  'design.examples': {
    fr: 'Exemples de réalisations pour :',
    ar: 'أمثلة من أعمالنا في:',
    en: 'Selected work for:',
  },


  /* SECTION 1 */
  'design.section1.title': {
    fr: 'Identité Visuelle',
    ar: 'الهوية البصرية',
    en: 'Visual Identity',
  },

  'design.section1.item1': {
    fr: 'Identité visuelle complète',
    ar: 'هوية بصرية كاملة',
    en: 'Full visual identity',
  },

  'design.section1.item2': {
    fr: 'Logo professionnel personnalisé',
    ar: 'شعار احترافي مخصص',
    en: 'Professional custom logo',
  },

  'design.section1.item3': {
    fr: 'Charte graphique',
    ar: 'دليل الهوية البصرية',
    en: 'Brand guideline',
  },

  'design.section1.item4': {
    fr: 'Palette de couleurs et typographies',
    ar: 'الألوان والخطوط',
    en: 'Color palette & typography',
  },

  'design.section1.item5': {
    fr: 'Déclinaisons visuelles',
    ar: 'التطبيقات البصرية',
    en: 'Visual brand assets',
  },


  /* SECTION 2 */
  'design.section2.title': {
    fr: 'Graphisme & Réseaux',
    ar: 'التصاميم ووسائل التواصل',
    en: 'Graphic & Social Media Design',
  },

  'design.section2.item1': {
    fr: 'Affiches publicitaires',
    ar: 'إعلانات',
    en: 'Ads posters',
  },

  'design.section2.item2': {
    fr: 'Flyers professionnels',
    ar: 'مطويات (Flyers)',
    en: 'Professional flyers',
  },
  'projects.sponsoring.title': {
    fr: 'Sponsoring',
    ar: 'الإشهارات الممولة',
    en: 'Sponsoring'
  },

  'projects.sponsoring.description': {
    fr: 'Vidéos réalisées pour sponsors',
    ar: 'فيديوهات خاصة بالإعلانات الممولة',
    en: 'Videos made for sponsors'
  },

  'projects.sponsoring.sponsors': {
    fr: 'Marques ayant collaboré',
    ar: 'العلامات التجارية المتعاونة',
    en: 'Brands we collaborated with'
  },

  'design.section2.item3': {
    fr: 'Designs réseaux sociaux',
    ar: 'تصاميم مواقع التواصل',
    en: 'Social media designs',
  },

  'design.section2.item4': {
    fr: 'Bannières & Roll-ups',
    ar: 'بانرات و رول أب',
    en: 'Banners & rollups',
  },

  'design.section2.item5': {
    fr: 'Templates personnalisés',
    ar: 'قوالب مخصصة',
    en: 'Custom templates',
  },


  /* SECTION 3 */
  'design.section3.title': {
    fr: 'Retouche & Montage',
    ar: 'الريتوش والمونتاج',
    en: 'Retouch & photomontage',
  },

  'design.section3.item1': { fr: 'Retouche', ar: 'ريتوش', en: 'Retouch' },
  'design.section3.item2': { fr: 'Photomontage', ar: 'مونتاج صور', en: 'Photomontage' },
  'design.section3.item3': { fr: 'Correction couleurs', ar: 'تصحيح الألوان', en: 'Color correction' },
  'design.section3.item4': { fr: 'Détourage', ar: 'قصّ', en: 'Cut-out' },
  'design.section3.item5': { fr: 'Optimisation sociale', ar: 'تحسين الصور', en: 'Social optimization' },


  /* SECTION 4 */
  'design.section4.title': {
    fr: 'Illustrations & Vectoriels',
    ar: 'رسوميات و فيكتور',
    en: 'Illustrations & vectors',
  },

  'design.section4.item1': { fr: 'Illustrations', ar: 'رسومات', en: 'Illustrations' },
  'design.section4.item2': { fr: 'Vectoriels', ar: 'فيكتور', en: 'Vectors' },
  'design.section4.item3': { fr: 'Brand visuals', ar: 'محتوى بصري للعلامة', en: 'Brand visuals' },
  'design.section4.item4': { fr: 'Illustrations marketing', ar: 'رسومات تسويقية', en: 'Marketing illustrations' },
  'design.section4.item5': { fr: 'Assets apps', ar: 'عناصر للتطبيقات', en: 'App assets' },


  /* --------------------------------------------
      DEV
  ---------------------------------------------*/

  'projects.dev.title': {
    fr: 'Développement Web & Apps',
    ar: 'تطوير الويب والتطبيقات',
    en: 'Web & App Development',
  },

  'projects.dev.description': {
    fr: 'Projets web & apps sur mesure.',
    ar: 'مشاريع ويب وتطبيقات مخصصة.',
    en: 'Custom web & mobile projects.',
  },


  /* --------------------------------------------
      SPONSORING
  ---------------------------------------------*/



  /* --------------------------------------------
      SOCIAL MEDIA MANAGEMENT
  ---------------------------------------------*/

  'projects.social.title': {
    fr: 'Gestion des Réseaux Sociaux',
    ar: 'إدارة وسائل التواصل الاجتماعي',
    en: 'Social Media Management',
  },

  'projects.social.description': {
    fr: 'Stratégie mensuelle, contenu créatif et optimisation.',
    ar: 'استراتيجية شهرية مدروسة ومحتوى كرياتيف.',
    en: 'Monthly strategy and creative content.',
  },
  'button.details': { fr: 'Voir détails', ar: 'عرض التفاصيل', en: 'See details' },
  'button.whatsapp1': { fr: 'Commander via WhatsApp (1)', ar: 'اطلب عبر واتساب (1)', en: 'Order via WhatsApp (1)' },
  'button.whatsapp2': { fr: 'Commander via WhatsApp (2)', ar: 'اطلب عبر واتساب (2)', en: 'Order via WhatsApp (2)' },
  'button.backhome': { fr: 'Retour à l\'accueil', ar: 'العودة للرئيسية', en: 'Back to home' },

  // ---------------- CLIENTS ----------------
  'clients.title': { fr: 'Nos Clients', ar: 'عملاؤنا', en: 'Our Clients' },

  // ---------------- CONTACT ----------------
  'contact.titleSocial': { fr: 'Contactez-nous', ar: 'تواصل معنا', en: 'Get in Touch' },
  'contact.title': { fr: 'Contactez-nous', ar: 'اتصل بنا', en: 'Contact Us' },
  'contact.subtitle': {
    fr: 'Nous sommes disponibles 7j/7 pour répondre à vos projets.',
    ar: 'نحن متاحون 7 أيام في الأسبوع لخدمتكم.',
    en: 'We are available 7 days a week to assist you.'
  },
  'contact.whatsapp': { fr: 'WhatsApp', ar: 'واتساب', en: 'WhatsApp' },
  'contact.whatsappDesc': {
    fr: 'Discutez directement avec notre équipe.',
    ar: 'تواصل مباشرة مع فريقنا.',
    en: 'Chat directly with our team.'
  },
  'contact.phoneTitle': { fr: 'Téléphone', ar: 'الهاتف', en: 'Phone' },
  'contact.phoneDesc': {
    fr: 'Appelez-nous pour plus d\'informations.',
    ar: 'اتصل بنا للمزيد من المعلومات.',
    en: 'Call us for more information.'
  },
  'contact.socialTitle': { fr: 'Réseaux sociaux', ar: 'وسائل التواصل الاجتماعي', en: 'Social Media' },
  'contact.socialDesc': {
    fr: 'Suivez-nous pour voir nos derniers projets.',
    ar: 'تابعونا لمشاهدة آخر أعمالنا.',
    en: 'Follow us to see our latest projects.'
  },

  // ---------------- SOCIAL MEDIA SERVICE ----------------
  'contact.map': {
   fr: 'Notre emplacement sur la carte',
   ar: 'موقعنا على الخريطة',
   en: 'Our location on the map'
},
  
  'sm.section1.title': { fr: 'Gestion des Réseaux Sociaux', ar: 'إدارة وسائل التواصل الاجتماعي', en: 'Social Media Management' },
  'sm.section2.title': { fr: 'Stratégie Marketing', ar: 'الاستراتيجية التسويقية', en: 'Marketing Strategy' },
  'sm.section3.title': { fr: 'Développement Web & Apps', ar: 'تطوير الويب والتطبيقات', en: 'Web & App Development' },
  'sm.section4.title': { fr: 'Promotion & Publicité', ar: 'الترويج والإعلان', en: 'Promotion & Advertising' },

  // ---------------- VIDEO SERVICE ----------------
    // CREATIVE – TITLE & DESCRIPTION
  // ----------------------------------
  'creative.title': {
    fr: 'Creatives (Vidéos & Tournage)',
    ar: 'الكرياتيف (تصوير + فيديو)',
    en: 'Creatives (Shooting & Video)',
  },

  'creative.description': {
    fr: '1/ Creatives : déplacements, mode, cuisine, déco, cosmétique, enfants, autres produits, montage.',
    ar: '1/ Creatives: تصوير وتنفيذ فيديوهات حسب نوع النشاط (تنقلات، أزياء، كوزينة، ديكور، كوسميتيك، أطفال، منتجات أخرى، مونتاج).',
    en: '1/ Creatives: shootings & videos for different niches (outdoor, fashion, kitchen, decor, cosmetics, kids, other products, editing).',
  },

  // ----------------------------------
  // CREATIVE CATEGORIES (1 → 8)
  // ----------------------------------

  'creative.deplacements': {
    fr: 'Déplacements / Extérieur',
    ar: 'تنقلات / خارجية',
    en: 'Outdoor / On location',
  },

  'creative.fashion': {
    fr: '👗👖👠👜 – Mode & vêtements',
    ar: '👗👖👠👜 – أزياء وملابس',
    en: '👗👖👠👜 – Fashion & clothing',
  },

  'creative.kitchen': {
    fr: 'Cuisine / Restauration',
    ar: 'كوزينة / مطاعم',
    en: 'Kitchen / Food',
  },

  'creative.decor': {
    fr: 'Décoration',
    ar: 'ديكور',
    en: 'Decoration',
  },

  'creative.cosmetics': {
    fr: 'Cosmétique & beauté',
    ar: 'كوسميتيك و تجميل',
    en: 'Cosmetics & beauty',
  },

  'creative.kids': {
    fr: 'Enfants',
    ar: 'أطفال',
    en: 'Kids',
  },

  'creative.others': {
    fr: 'Autres produits',
    ar: 'منتجات أخرى',
    en: 'Other products',
  },

  'creative.montage': {
    fr: 'Montage vidéo',
    ar: 'مونتاج فيديو',
    en: 'Video editing',
  },

  // ----------------------------------
  // VIDEOS SOON MESSAGE
  // ----------------------------------

  'creative.videosSoon': {
    fr: 'Les vidéos seront ajoutées prochainement.',
    ar: 'سيتم إضافة الفيديوهات قريبًا.',
    en: 'Videos will be added soon.',
  },
  'video.section1.title': { fr: 'Tournage Professionnel', ar: 'التصوير الاحترافي', en: 'Professional Shooting' },
  'video.section2.title': { fr: 'Montage & Post-Production', ar: 'المونتاج والإنتاج', en: 'Editing & Post-Production' },
  'video.section3.title': { fr: 'Écriture de Scripts', ar: 'كتابة السكريبت', en: 'Script Writing' },
  'video.section4.title': { fr: 'Voix-Off', ar: 'التعليق الصوتي', en: 'Voice-Over' },

  // ---------------- DESIGN SERVICE ----------------
// ---------------- SERVICES PAGE ----------------
// --------------------------------------------
  // HOME → SERVICES SECTION
  // --------------------------------------------
  'home.services.title': {
    fr: 'Nos Services',
    ar: 'خدماتنا',
    en: 'Our Services'
  },

  'home.services.subtitle': {
    fr: 'Choisissez le service qui correspond à vos besoins.',
    ar: 'اختر الخدمة المناسبة لنشاطك.',
    en: 'Choose the service that fits your needs.'
  },

  'home.services.whatsapp1': {
    fr: 'Commander via WhatsApp (1)',
    ar: 'الطلب عبر واتساب (1)',
    en: 'Order via WhatsApp (1)'
  },

  'home.services.whatsapp2': {
    fr: 'Commander via WhatsApp (2)',
    ar: 'الطلب عبر واتساب (2)',
    en: 'Order via WhatsApp (2)'
  },

  'home.services.viewAll': {
    fr: 'Voir tous →',
    ar: 'عرض الكل →',
    en: 'View all →'
  },

  // --------------------------------------------
  // HOME → PROJECTS SECTION
  // --------------------------------------------
  'home.projects.title': {
    fr: 'Nos Projets',
    ar: 'مشاريعنا',
    en: 'Our Projects'
  },

  'home.projects.subtitle': {
    fr: 'Découvrez nos réalisations en vidéo, design et web.',
    ar: 'اكتشف أعمالنا في الفيديو، التصميم والويب.',
    en: 'Explore our work in video, design and web.'
  },

  'home.projects.whatsapp1': {
    fr: 'Parler de mon projet (1)',
    ar: 'مناقشة مشروعي (1)',
    en: 'Discuss my project (1)'
  },

  'home.projects.whatsapp2': {
    fr: 'Parler de mon projet (2)',
    ar: 'مناقشة مشروعي (2)',
    en: 'Discuss my project (2)'
  },

  'home.projects.viewAll': {
    fr: 'Voir tous →',
    ar: 'عرض الكل →',
    en: 'View all →'
  },

  // MAIN TITLE
  'services.mainTitle': {
    fr: 'Nos Services',
    ar: 'خدماتنا',
    en: 'Our Services'
  },

  // --------- CREATIVES ---------
 // ---------------- CREATIVE SERVICE ----------------
"services.creatives.title": {
  fr: "Créatives",
  ar: "الإبداعيات",
  en: "Creatives"
},

"services.creatives.shooting": {
  fr: "Shooting : Produits / Personnes / Magasins…",
  ar: "التصوير: منتجات / أشخاص / محلات…",
  en: "Shooting: Products / People / Stores…"
},
"services.creatives.editing": {
  fr: "Montage : Simple / Professionnel",
  ar: "المونتاج: بسيط / احترافي",
  en: "Editing: Basic / Professional"
},
"services.creatives.script": {
  fr: "Écriture de script",
  ar: "كتابة السكريبت",
  en: "Script writing"
},
"services.creatives.voiceover": {
  fr: "Voix-off : Femmes / Hommes / Enfants",
  ar: "التعليق الصوتي: نساء / رجال / أطفال",
  en: "Voice-over: Women / Men / Children"
},

"services.creatives.empty": {
  fr: "À compléter…",
  ar: "سيتم الإضافة لاحقاً…",
  en: "To be completed…"
},

  // --------- DESIGN ---------
  'services.design.title': {
    fr: 'Design',
    ar: 'التصميم',
    en: 'Design'
  },
  'services.design.logo': {
    fr: 'Logo',
    ar: 'لوقو',
    en: 'Logo'
  },
  'services.design.flyer': {
    fr: 'Flyer',
    ar: 'فلاير',
    en: 'Flyer'
  },
  'services.design.ad': {
    fr: 'Annonce publicitaire',
    ar: 'إعلان تجاري',
    en: 'Ad Design'
  },
  'services.design.card': {
    fr: 'Carte de visite',
    ar: 'كارت فيزيت',
    en: 'Business Card'
  },
  'services.design.book': {
    fr: 'Livre / Magazine / Catalogue',
    ar: 'كتاب / مجلة / كتالوج',
    en: 'Book / Magazine / Catalogue'
  },
  'services.design.banner': {
    fr: 'Bannière & Roll-up',
    ar: 'بانر و رول آب',
    en: 'Banner & Roll-up'
  },
  'services.design.storefront': {
    fr: 'Design vitrine magasin',
    ar: 'تصميم واجهات المحلات',
    en: 'Storefront Design'
  },
  'services.design.wrapping': {
    fr: 'Design wrapping voitures',
    ar: 'تغليف السيارات',
    en: 'Car Wrapping Design'
  },
  'services.design.packaging': {
    fr: 'Packaging (tous types)',
    ar: 'التغليف بكل أنواعه',
    en: 'Packaging (all types)'
  },

  // --------- DEV WEB & APPS ---------
  'services.dev.title': {
    fr: 'Développement Web & Apps',
    ar: 'تطوير الويب والتطبيقات',
    en: 'Web & App Development'
  },
  'services.dev.landing': {
    fr: 'Landing pages rapides & optimisées',
    ar: 'صفحات هبوط سريعة واحترافية',
    en: 'Fast & optimized landing pages'
  },
  'services.dev.vitrine': {
    fr: 'Sites vitrines professionnels',
    ar: 'مواقع احترافية',
    en: 'Professional showcase websites'
  },
  'services.dev.ecommerce': {
    fr: 'E-commerce stores ',
    ar: 'متاجر إلكترونية  ',
    en: 'E-commerce stores '
  },
  'services.dev.crm': {
    fr: 'Applications Web sur mesure (CRM, Dashboard…)',
    ar: 'تطبيقات ويب مخصّصة (CRM، لوحات التحكم…)',
    en: 'Custom web apps (CRM, dashboard…)'
  },
  'services.dev.mobile': {
    fr: 'Applications mobiles (Android / iOS)',
    ar: 'تطبيقات الهاتف (Android / iOS)',
    en: 'Mobile apps (Android / iOS)'
  },
  'services.dev.firebase': {
    fr: 'Intégration Firebase & bases de données',
    ar: 'دمج Firebase وقواعد البيانات',
    en: 'Firebase integration & databases'
  },
  'services.dev.maintenance': {
    fr: 'Maintenance & optimisation des performances',
    ar: 'الصيانة وتحسين الأداء',
    en: 'Maintenance & performance optimization'
  },
  'services.dev.uiux': {
    fr: 'UI/UX Design pour Web & App',
    ar: 'تصميم UI/UX للويب والتطبيقات',
    en: 'UI/UX design for web & apps'
  },

  // --------- SPONSORING ---------
  'services.sponsoring.title': {
    fr: 'Sponsoring',
    ar: 'الإعلانات الممولة',
    en: 'Sponsoring'
  },
  'services.sponsoring.item': {
    fr: 'Campagnes sponsorisées stratégiques',
    ar: 'إعلانات ممولة مدروسة',
    en: 'Strategic sponsored campaigns'
  },

  // --------- SOCIAL MEDIA ---------
  'services.social.title': {
    fr: 'Gestion des réseaux sociaux',
    ar: 'إدارة وسائل التواصل الاجتماعي',
    en: 'Social Media Management'
  },
  'services.social.strategy': {
    fr: 'Stratégie mensuelle complète',
    ar: 'استراتيجية شهرية كاملة',
    en: 'Complete monthly strategy'
  },
  'services.social.content': {
    fr: 'Création de contenu (visuel + vidéo)',
    ar: 'إنشاء المحتوى (صور + فيديو)',
    en: 'Content creation (visual + video)'
  },
  'services.social.planning': {
    fr: 'Planning éditorial',
    ar: 'خطة نشر محتوى',
    en: 'Editorial planning'
  },
  'services.social.growth': {
    fr: 'Optimisation croissance',
    ar: 'تحسين النمو',
    en: 'Growth optimization'
  },
  // ---------------- PORTFOLIO ----------------
  'portfolio.title': { fr: 'Portfolio', ar: 'معرض الأعمال', en: 'Portfolio' }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => translations[key]?.[language] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}