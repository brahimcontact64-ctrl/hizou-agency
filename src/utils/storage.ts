// src/utils/storage.ts
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

/**
 * Load all files inside a Firebase Storage folder
 * Example folderPath:
 *   "images/sponsor"
 *   "videos/creatives/fashion"
 */
export async function getFilesFromFolder(folderPath: string): Promise<string[]> {
  try {
    const folderRef = ref(storage, folderPath);
    const result = await listAll(folderRef);

    const urlPromises = result.items.map((item) => getDownloadURL(item));
    const urls = await Promise.all(urlPromises);

    return urls;
  } catch (error) {
    console.error(`Error loading folder "${folderPath}" from Storage:`, error);
    return [];
  }
}