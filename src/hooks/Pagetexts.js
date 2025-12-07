import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

export function usePageTexts(pageName) {
  const [texts, setTexts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const colRef = collection(db, "pageTexts", pageName, "texts");
        const snapshot = await getDocs(colRef);

        const data = {};
        snapshot.forEach((doc) => {
          data[doc.id] = doc.data().value;
        });

        setTexts(data);
      } catch (err) {
        console.error("Error loading page texts:", err);
      }
      setLoading(false);
    }

    load();
  }, [pageName]);

  return { texts, loading };
}