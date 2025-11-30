import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================
// 🔥 Firebase Admin 
// ============================================================
const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, "website-84438-firebase-adminsdk-fbsvc-c11051f141.json"))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "website-84438",
});

const bucket = admin.storage().bucket();

// ============================================================
// 🔥 Local Folders
// ============================================================
const localFolder = path.join(__dirname, "src", "assets", "videos", "creatives");

// Allowed extensions
const VIDEO_EXT = [".mp4", ".mov", ".m4v", ".avi", ".webm"];

/* ============================================================
   🔥 1) Convert Video — FULL iOS FIX (H.264 + AAC)
============================================================ */

async function convertVideo(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        "-vf", "scale=-2:720",
        "-preset veryfast",
        "-profile:v baseline",
        "-level 3.0",
        "-pix_fmt yuv420p",
        "-movflags +faststart",
        "-crf 23",
        "-g 30",
        "-r 30",
      ])
      .videoCodec("libx264")
      .audioCodec("aac")
      .audioChannels(2)
      .audioBitrate("128k")
      .on("end", () => resolve(outputPath))
      .on("error", reject)
      .save(outputPath);
  });
}

/* ============================================================
   🔥 2) Upload File to Firebase Storage
============================================================ */

async function uploadFile(category, filePath) {
  const fileName = path.basename(filePath);
  const ext = path.extname(fileName).toLowerCase();

  if (!VIDEO_EXT.includes(ext)) {
    console.log(`⏩ Skipped non-video: ${fileName}`);
    return null;
  }

  const destination = `videos/creatives/${category}/${fileName}`;

  // temp folder
  const tempFolder = path.join(__dirname, "temp");
  if (!fs.existsSync(tempFolder)) fs.mkdirSync(tempFolder);

  const compressedPath = path.join(tempFolder, `${Date.now()}-${fileName}`);

  console.log("🎬 Converting (iOS-safe):", fileName);

  try {
    await convertVideo(filePath, compressedPath);
  } catch (err) {
    console.error("❌ Conversion failed for:", fileName, err);
    return null;
  }

  console.log("⬆ Uploading:", destination);

  try {
    await bucket.upload(compressedPath, {
      destination,
      public: true,
      gzip: true,
    });

    const url = `https://storage.googleapis.com/${bucket.name}/${destination}`;
    console.log("✅ Uploaded:", url);

    fs.unlinkSync(compressedPath);
    return url;

  } catch (err) {
    console.error("❌ Upload failed:", fileName, err);
    return null;
  }
}

/* ============================================================
   🔥 3) Upload All + Keep Empty Folders in JSON
============================================================ */

async function uploadAll() {
  const result = {};

  const categories = fs.readdirSync(localFolder);

  for (const category of categories) {
    const categoryPath = path.join(localFolder, category);
    if (!fs.lstatSync(categoryPath).isDirectory()) continue;

    console.log(`\n📁 Category: ${category}`);
    result[category] = [];

    const files = fs.readdirSync(categoryPath);

    if (files.length === 0) {
      console.log(`⚠️ Empty folder, adding to JSON: ${category}`);
      continue;
    }

    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      const url = await uploadFile(category, filePath);
      if (url) result[category].push(url);
    }
  }

  fs.writeFileSync("videos.json", JSON.stringify(result, null, 2));
  console.log("\n🎉 DONE — Videos converted, uploaded, JSON created!");
}

uploadAll();