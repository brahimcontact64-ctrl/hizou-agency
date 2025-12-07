import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =======================================
// 🔥 Firebase Admin
// =======================================
const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, "website-84438-firebase-adminsdk-fbsvc-c11051f141.json"))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "website-84438.firebasestorage.app",
});

const bucket = admin.storage().bucket();

// =======================================
// 🔥 Local Videos Folder (نفس مسارك القديم)
// =======================================
const localFolder = path.join(__dirname, "src", "assets", "videos", "creatives");

// Allowed formats
const VIDEO_EXT = [".mp4", ".mov", ".m4v"];

// =======================================
// 🎬 FULL iOS SAFE VIDEO CONVERSION
// =======================================
async function convertVideo(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        "-vf scale=720:-2",
        "-pix_fmt yuv420p",
        "-c:v libx264",
        "-profile:v main",           
        "-level 3.1",
        "-preset medium",
        "-crf 22",
        "-movflags +faststart",
        "-r 30",
        "-g 60",
        "-c:a aac",
        "-b:a 128k",
        "-ac 2",
        "-ar 44100"
      ])
      .on("end", () => resolve(outputPath))
      .on("error", reject)
      .save(outputPath);
  });
}


async function uploadFile(category, filePath) {
  const fileName = path.basename(filePath);
  const ext = path.extname(fileName).toLowerCase();

  if (!VIDEO_EXT.includes(ext)) {
    console.log(`⏩ Skipped non-video: ${fileName}`);
    return null;
  }

  const destination = `videos/creatives/${category}/${fileName}`;

  const tempFolder = path.join(__dirname, "temp");
  if (!fs.existsSync(tempFolder)) fs.mkdirSync(tempFolder);

  const compressedPath = path.join(tempFolder, `${Date.now()}-${fileName}`);

  console.log("🎬 Converting (iOS Safe):", fileName);

  try {
    await convertVideo(filePath, compressedPath);
  } catch (err) {
    console.error("❌ Conversion failed:", fileName, err);
    return null;
  }

  console.log("⬆ Uploading:", destination);

  try {
    await bucket.upload(compressedPath, {
      destination,
      public: true,
      metadata: {
        contentType: "video/mp4",            
        cacheControl: "public, max-age=86400",
        contentDisposition: "inline",
      },
    });

    // 🔥 Google Cloud Public URL (iOS SAFE)
    const url = `https://storage.googleapis.com/${bucket.name}/${destination}`;
    console.log("✅ Uploaded:", url);

    fs.unlinkSync(compressedPath);
    return url;

  } catch (err) {
    console.error("❌ Upload failed:", fileName, err);
    return null;
  }
}

async function uploadAll() {
  const result = {};

  const categories = fs.readdirSync(localFolder);

  for (const category of categories) {
    const categoryPath = path.join(localFolder, category);

    if (!fs.lstatSync(categoryPath).isDirectory()) continue;

    console.log(`\n📁 Category: ${category}`);
    result[category] = [];

    const files = fs.readdirSync(categoryPath);

    if (files.length === 0) continue;

    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      const url = await uploadFile(category, filePath);
      if (url) result[category].push(url);
    }
  }

  fs.writeFileSync("videos.json", JSON.stringify(result, null, 2));
  console.log("\n🎉 DONE — Fully iOS-safe videos uploaded!");
}

uploadAll();