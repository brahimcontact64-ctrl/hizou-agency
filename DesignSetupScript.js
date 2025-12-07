/**
 * DESIGN SEED SCRIPT — WITH FULL TRANSLATIONS
 * Converts your translation file automatically (fr/ar/en)
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

// -----------------------------------------------------
// Firebase Config
// -----------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyBps0n_whlDmfMVLlivHBrdan7Z73ufVvo",
  authDomain: "website-84438.firebaseapp.com",
  projectId: "website-84438",
  storageBucket: "website-84438",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// -----------------------------------------------------
// 🔥 FULL TRANSLATION MAP (copy/pasted from your file)
// -----------------------------------------------------
const translations = {
  "design.section1.title": {
    fr: "Identité Visuelle",
    ar: "الهوية البصرية",
    en: "Visual Identity",
  },
  "design.section1.item1": {
    fr: "Identité visuelle complète",
    ar: "هوية بصرية كاملة",
    en: "Full visual identity",
  },
  "design.section1.item2": {
    fr: "Logo professionnel personnalisé",
    ar: "شعار احترافي مخصص",
    en: "Professional custom logo",
  },
  "design.section1.item3": {
    fr: "Charte graphique",
    ar: "دليل الهوية البصرية",
    en: "Brand guideline",
  },
  "design.section1.item4": {
    fr: "Palette de couleurs et typographies",
    ar: "الألوان والخطوط",
    en: "Color palette & typography",
  },
  "design.section1.item5": {
    fr: "Déclinaisons visuelles",
    ar: "التطبيقات البصرية",
    en: "Visual brand assets",
  },

  "design.section2.title": {
    fr: "Graphisme & Réseaux",
    ar: "التصاميم ووسائل التواصل",
    en: "Graphic & Social Media Design",
  },
  "services.design.banner": {
    fr: "Bannière & Roll-up",
    ar: "بانر و رول آب",
    en: "Banner & Roll-up",
  },
  "services.design.storefront": {
    fr: "Design vitrine magasin",
    ar: "تصميم واجهات المحلات",
    en: "Storefront Design",
  },
  "services.design.wrapping": {
    fr: "Design wrapping voitures",
    ar: "تغليف السيارات",
    en: "Car Wrapping Design",
  },
  "services.design.packaging": {
    fr: "Packaging (tous types)",
    ar: "التغليف بكل أنواعه",
    en: "Packaging (all types)",
  },

  // other keys already in your file…
};

// -----------------------------------------------------
// 🔥 DATA STRUCTURE
// -----------------------------------------------------
const designSections = [
  {
    id: "visualIdentity",
    titleKey: "design.section1.title",
    order: 1,
    items: [
      {
        id: "item1",
        labelKey: "design.section1.item1",
        galleryKey: "logo",
        order: 1,
      },
      {
        id: "item2",
        labelKey: "design.section1.item2",
        galleryKey: "brochure",
        order: 2,
      },
      {
        id: "item3",
        labelKey: "design.section1.item3",
        galleryKey: "ads",
        order: 3,
      },
      {
        id: "item4",
        labelKey: "design.section1.item4",
        galleryKey: "businessCard",
        order: 4,
      },
      {
        id: "item5",
        labelKey: "design.section1.item5",
        galleryKey: "book",
        order: 5,
      },
    ],
  },

  {
    id: "marketingGraphics",
    titleKey: "design.section2.title",
    order: 2,
    items: [
      {
        id: "banner",
        labelKey: "services.design.banner",
        galleryKey: "rollup",
        order: 1,
      },
      {
        id: "storefront",
        labelKey: "services.design.storefront",
        galleryKey: "ads",
        order: 2,
      },
      {
        id: "wrapping",
        labelKey: "services.design.wrapping",
        galleryKey: "packaging",
        order: 3,
      },
      {
        id: "packaging",
        labelKey: "services.design.packaging",
        galleryKey: "packaging",
        order: 4,
      },
    ],
  },
];

// -----------------------------------------------------
// 🚀 Helper: Extract Translation (fr, ar, en)
// -----------------------------------------------------
function getLabel(key) {
  return (
    translations[key] || {
      fr: key,
      ar: key,
      en: key,
    }
  );
}

// -----------------------------------------------------
// 🚀 MAIN SEED FUNCTION
// -----------------------------------------------------
async function seed() {
  console.log("🚀 Seeding design sections with translations…\n");

  for (const section of designSections) {
    const sectionRef = doc(db, "designSections", section.id);

    await setDoc(sectionRef, {
      titleKey: section.titleKey,
      title: getLabel(section.titleKey),
      order: section.order,
    });

    for (const item of section.items) {
      const itemRef = doc(collection(sectionRef, "items"), item.id);

      await setDoc(itemRef, {
        ...item,
        label: getLabel(item.labelKey),
      });
    }

    console.log("✔ Created section:", section.id);
  }

  console.log("\n🎉 DONE! All design sections + translated items created!");
}

seed().catch((err) => console.error("❌ ERROR:", err));