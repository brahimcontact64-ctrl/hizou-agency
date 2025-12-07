import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import fs from "fs";
import path from "path";

const serviceKey = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf8")
);

initializeApp({
  credential: cert(serviceKey),
  storageBucket: "wwebsite-84438",
});

const bucket = getStorage().bucket();


const folders = [
  "images/design/logo",
  "images/design/brochure",
  "images/design/ads",
  "images/design/business-card",
  "images/design/book",
  "images/design/rollup",
  "images/design/packaging",
  "images/sponsor",
  "videos/sponsoring",
  "videos/social",
  "videos/creative/deplacements",
  "videos/creative/fashion",
  "videos/creative/kitchen",
  "videos/creative/decor",
  "videos/creative/cosmetics",
  "videos/creative/kids",
  "videos/creative/others",
  "videos/creative/montage"
];

// ملف فارغ placeholder
const dummyFile = path.join(process.cwd(), "placeholder.txt");
fs.writeFileSync(dummyFile, "placeholder");

async function uploadSamples() {
  console.log("🚀 Starting upload...");

  for (const folder of folders) {
    const destination = `${folder}/placeholder.txt`;

    await bucket.upload(dummyFile, {
      destination,
      metadata: {
        contentType: "text/plain",
      },
    });

    console.log("📁 Created folder:", folder);
  }

  console.log("✅ Done! All folders created.");
}

uploadSamples().catch(console.error);