// ==========================================
// SAFE FIREBASE STORAGE FETCHING FUNCTIONS
// ==========================================

import { storage } from '../firebase';
import {
  ref,
  listAll,
  getDownloadURL
} from 'firebase/storage';

// -------------------------------
// Helper: safely list a folder
// -------------------------------
export async function fetchFromFolder(path: string): Promise<string[]> {
  try {
    const folderRef = ref(storage, path);
    const result = await listAll(folderRef);

    if (!result.items || result.items.length === 0) {
      return [];
    }

    const urls = await Promise.all(
      result.items.map(async (item) => {
        try {
          const url = await getDownloadURL(item);
          return url;
        } catch (err) {
          console.error(`❌ Failed to load file: ${item.fullPath}`, err);
          return null;
        }
      })
    );

    return urls.filter((u): u is string => Boolean(u));
  } catch (error) {
    console.error(`❌ Folder not found or error fetching: ${path}`, error);
    return [];
  }
}

// -------------------------------
// Images (Design / Sponsors / ...)
// -------------------------------
export async function fetchImagesFromFolder(path: string): Promise<string[]> {
  return fetchFromFolder(path);
}

// -------------------------------
// Videos (Creative / Social / Sponsoring)
// -------------------------------
export async function fetchVideosFromFolder(path: string): Promise<string[]> {
  return fetchFromFolder(path);
}

// -------------------------------
// Creative videos → for many categories
// -------------------------------
export async function fetchAllCreativeVideos(
  categories: string[]
): Promise<Record<string, string[]>> {

  const result: Record<string, string[]> = {};

  await Promise.all(
    categories.map(async (category) => {
      const folderPath = `videos/creatives/${category}`;
      const videos = await fetchVideosFromFolder(folderPath);
      result[category] = videos || [];
    })
  );

  return result;
}