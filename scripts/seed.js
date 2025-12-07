// ===============================================
//  FIREBASE ADMIN INIT
// ===============================================
import admin from "firebase-admin";
import { readFileSync } from "fs";

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    readFileSync("./serviceAccountKey.json", "utf8")
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// ===============================================
//  DATA TO SEED
// ===============================================

const uiTexts = {
  "projects.title": {
    fr: "Nos Projets",
    ar: "مشاريعنا",
  },
  "projects.subtitle": {
    fr: "Découvrez tous nos travaux créatifs, designs, vidéos et thèmes.",
    ar: "اكتشف جميع أعمالنا الإبداعية من تصاميم، فيديوهات وقوالب.",
  },

  "projects.creatives.title": {
    fr: "Créatifs",
    ar: "الإبداعيات",
  },
  "projects.creatives.description": {
    fr: "Découvrez nos vidéos créatives classées par catégories.",
    ar: "اكتشف فيديوهاتنا الإبداعية المصنفة حسب الأقسام.",
  },

  "design.title": {
    fr: "Design Graphique",
    ar: "التصميم الغرافيكي",
  },

  "projects.dev.title": {
    fr: "Thèmes E-commerce prêts",
    ar: "قوالب التجارة الإلكترونية",
  },

  "projects.sponsoring.title": {
    fr: "Sponsoring / Publicité",
    ar: "الإشهار والرعاية",
  },

  "projects.social.title": {
    fr: "Contenus Réseaux Sociaux",
    ar: "محتوى وسائل التواصل الاجتماعي",
  },

  "projects.social.description": {
    fr: "Découvrez nos vidéos créées pour les réseaux sociaux.",
    ar: "اكتشف فيديوهاتنا الخاصة بمواقع التواصل.",
  },
};

// ======================================================
//  CREATIVE CATEGORIES (creativeItems)
// ======================================================

const creativeCategories = [
  { id: "deplacements", fr: "Déplacements", ar: "التنقلات" },
  { id: "fashion", fr: "Fashion", ar: "الموضة" },
  { id: "kitchen", fr: "Cuisine", ar: "المطبخ" },
  { id: "decor", fr: "Décoration", ar: "الديكور" },
  { id: "cosmetics", fr: "Cosmétiques", ar: "مستحضرات التجميل" },
  { id: "kids", fr: "Kids", ar: "الأطفال" },
  { id: "others", fr: "Autres", ar: "أخرى" },
  { id: "montage", fr: "Montage", ar: "المونتاج" },
];

// ======================================================
//  DESIGN SECTIONS
// ======================================================
const designSections = [
  {
    id: "section1",
    fr: "Identité Visuelle & Branding",
    ar: "تصميم الهوية البصرية",
  },
  {
    id: "section2",
    fr: "Affichage, Packaging & Supports",
    ar: "الملصقات والتغليف والوسائط",
  },
];

// ======================================================
//  DEV THEME CATEGORIES
// ======================================================
const devThemeCategories = [
  {
    id: "fashion",
    titleFr: "E-commerce Fashion",
    titleAr: "قوالب متجر الملابس (Fashion)",
  },
  {
    id: "kids",
    titleFr: "Boutique enfants / Kids",
    titleAr: "قوالب متجر الأطفال (Kids)",
  },
  {
    id: "decor",
    titleFr: "Décoration & Maison",
    titleAr: "قوالب الديكور والمنزل",
  },
  {
    id: "electronics",
    titleFr: "Électronique & Tech",
    titleAr: "قوالب الإلكترونيات والتقنية",
  },
];

// ===============================================
//  SEED FUNCTION
// ===============================================

async function seed() {
  try {
    console.log("🚀 Seeding UI Texts...");
    for (const key of Object.keys(uiTexts)) {
      await db.collection("ui_texts").doc(key).set(uiTexts[key]);
    }

    console.log("🚀 Seeding Creative Categories...");
    let creativeOrder = 1;
    for (const item of creativeCategories) {
      await db.collection("creativeCategories").doc(item.id).set({
        ...item,         // id, fr, ar
        order: creativeOrder,
      });
      creativeOrder++;
    }

    console.log("🚀 Seeding Design Sections...");
    let designOrder = 1;
    for (const sec of designSections) {
      await db.collection("designSections").doc(sec.id).set({
        ...sec,          // id, fr, ar
        order: designOrder,
      });
      designOrder++;
    }

    console.log("🚀 Seeding Dev Theme Categories...");
    let devOrder = 1;
    for (const cat of devThemeCategories) {
      await db.collection("devThemeCategories").doc(cat.id).set({
        ...cat,          // id, titleFr, titleAr
        order: devOrder,
      });
      devOrder++;
    }

    console.log("🎉 DONE! All UI texts and categories inserted into Firestore.");
    process.exit(0);
  } catch (e) {
    console.error("❌ ERROR:", e);
    process.exit(1);
  }
}

seed();