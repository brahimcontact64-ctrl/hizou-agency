import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";


const firebaseConfig = {
 apiKey: "AIzaSyBps0n_whlDmfMVLlivHBrdan7Z73ufVvo",
  authDomain: "website-84438.firebaseapp.com",
  projectId: "website-84438",
  storageBucket: "website-84438",
  messagingSenderId: "275122731412",
  appId: "1:275122731412:web:e611b01d2e5b5645637781",
  measurementId: "G-YJTXGQETFY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {

  const payload = {
    page: "projects",
    title: {
      fr: "Nos Projets & Réalisations",
      ar: "أعمالنا و إنجازاتنا"
    },
    subtitle: {
      fr: "Découvrez nos créations, designs, vidéos et contenus professionnels.",
      ar: "اكتشف أعمالنا، التصاميم، الفيديوهات و المحتوى الاحترافي."
    },

    creatives: {
      title: { fr: "Vidéos Créatives", ar: "الفيديوهات الإبداعية" },
      description: {
        fr: "Découvrez nos contenus créatifs dans plusieurs catégories",
        ar: "اكتشف الفيديوهات الإبداعية في مختلف الأصناف"
      }
    },

    design: {
      title: { fr: "Design & Graphisme", ar: "التصميم و الجرافيك" },
      examples: { fr: "Exemples", ar: "أمثلة" }
    },

    dev: {
      title: { fr: "Développement Web", ar: "تطوير المواقع" }
    },

    sponsoring: {
      title: { fr: "Publicité Sponsorisée", ar: "الإعلانات الممولة" },
      sponsors: { fr: "Sponsors", ar: "الزبائن" },
      videos: { fr: "Vidéos Sponsorisées", ar: "فيديوهات ممولة" }
    },

    social: {
      title: { fr: "Social Media", ar: "محتوى السوشيال ميديا" },
      description: {
        fr: "Courtes vidéos adaptées aux réseaux sociaux",
        ar: "فيديوهات قصيرة للسوشيال ميديا"
      }
    }
  };

  await setDoc(doc(db, "pageTexts", "projectsPage"), payload);

  console.log("DONE: Project page texts added!");
}

seed();