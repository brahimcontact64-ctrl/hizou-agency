/**
 *  CREATIVE CATEGORIES + TRANSLATIONS SEED SCRIPT
 *  Hizou Agency — Final Version
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBps0n_whlDmfMVLlivHBrdan7Z73ufVvo",
  authDomain: "website-84438.firebaseapp.com",
  projectId: "website-84438",
  storageBucket: "website-84438",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---------------------------------------------
// 🔥 DATA WITH FULL TRANSLATIONS FROM YOUR FILE
// ---------------------------------------------
const categories = [
  {
    id: "deplacements",
    folder: "deplacements",
    order: 1,
    labelKey: "creatives.item1",
    title: {
      fr: "Déplacements / Extérieur",
      ar: "تنقلات / خارجية",
      en: "Outdoor / On location",
    },
  },
  {
    id: "fashion",
    folder: "fashion",
    order: 2,
    labelKey: "creatives.item2",
    title: {
      fr: "👗👖👠👜 – Mode & vêtements",
      ar: "👗👖👠👜 – أزياء وملابس",
      en: "👗👖👠👜 – Fashion & clothing",
    },
  },
  {
    id: "kitchen",
    folder: "kitchen",
    order: 3,
    labelKey: "creatives.item3",
    title: {
      fr: "Cuisine / Restauration",
      ar: "كوزينة / مطاعم",
      en: "Kitchen / Food",
    },
  },
  {
    id: "decor",
    folder: "decor",
    order: 4,
    labelKey: "creatives.item4",
    title: {
      fr: "Décoration",
      ar: "ديكور",
      en: "Decoration",
    },
  },
  {
    id: "cosmetics",
    folder: "cosmetics",
    order: 5,
    labelKey: "creatives.item5",
    title: {
      fr: "Cosmétique & beauté",
      ar: "كوسميتيك و تجميل",
      en: "Cosmetics & beauty",
    },
  },
  {
    id: "kids",
    folder: "kids",
    order: 6,
    labelKey: "creatives.item6",
    title: {
      fr: "UGC-Presantation",
      ar: "UGC",
      en: "UGC-Presantation",
    },
  },
  {
    id: "others",
    folder: "others",
    order: 7,
    labelKey: "creatives.item7",
    title: {
      fr: "Autres produits",
      ar: "منتجات أخرى",
      en: "Other products",
    },
  },
  {
    id: "montage",
    folder: "montage",
    order: 8,
    labelKey: "creatives.item8",
    title: {
      fr: "Montage vidéo",
      ar: "مونتاج فيديو",
      en: "Video editing",
    },
  },
];

// ---------------------------------------------
// 🚀 Seed Firestore
// ---------------------------------------------
async function seed() {
  console.log("Seeding creative categories…");

  for (const cat of categories) {
    await addDoc(collection(db, "creativeCategories"), cat);
    console.log("✔ Added:", cat.folder);
  }

  console.log("🎉 DONE! All categories created with translations!");
}

seed();