import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// -------------------------------
// إعداد Firebase Admin
// -------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, "website-84438-firebase-adminsdk-fbsvc-c11051f141.json"))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "website-84438",
});

const bucket = admin.storage().bucket();

// -------------------------------
// المسار المحلي -> assets/videos
// -------------------------------
const localFolder = path.join(__dirname, "src", "assets", "videos");

// -------------------------------
// دالة إنشاء مجلد (بوضع ملف .keep)
// -------------------------------
async function createFolderIfEmpty(storagePath) {
  const file = bucket.file(storagePath + "/.keep");

  try {
    await file.save("", {
      resumable: false,
      metadata: { contentType: "text/plain" },
      public: true,
    });

    console.log("📁 Created folder:", storagePath);
  } catch (err) {
    console.error("❌ Error creating folder:", storagePath, err);
  }
}

// -------------------------------
// قراءة جميع المجلدات داخل assets/videos
// -------------------------------
async function createAllFolders() {
  function walkDirectory(dir, storageBasePath = "videos") {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const localPath = path.join(dir, item);
      const stats = fs.lstatSync(localPath);

      if (stats.isDirectory()) {
        const firebaseFolderPath = storageBasePath + "/" + item;

        // أنشئ هذا المجلد على Firebase
        createFolderIfEmpty(firebaseFolderPath);

        // تابع البحث داخل المجلدات الفرعية
        walkDirectory(localPath, firebaseFolderPath);
      }
    }
  }

  walkDirectory(localFolder);
}


createAllFolders().then(() => {
  console.log("🎉 DONE — All folders created in Firebase Storage!");
});