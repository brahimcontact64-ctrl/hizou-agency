import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================
//  FIREBASE ADMIN SETUP
// ==========================
const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, "website-84438-firebase-adminsdk-fbsvc-c11051f141.json"))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "website-84438",
});

const bucket = admin.storage().bucket();

// ==========================
//  CORRECT LOCAL FOLDER
// ==========================
// هنا التعديل المهم !!!
// بدل "images"، نخليها assets مباشرة
const localBase = path.join(__dirname, "src", "assets");

// ==========================
//  UPLOAD FUNCTION
// ==========================
async function uploadFolder(folderName, storagePath) {
  const folderPath = path.join(localBase, folderName);
  const result = [];

  if (!fs.existsSync(folderPath)) return result;

  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const fullPath = path.join(folderPath, file);
    if (!fs.lstatSync(fullPath).isFile()) continue;

    const destination = `${storagePath}/${file}`;

    await bucket.upload(fullPath, {
      destination,
      public: true,
      gzip: true,
    });

    const url = `https://storage.googleapis.com/${bucket.name}/${destination}`;
    result.push(url);

    console.log("✔ Uploaded:", url);
  }

  return result;
}

// ==========================
//  MAIN UPLOAD
// ==========================
async function uploadAll() {
  const output = {
    design: {},
    sponsor: [],
    logo: [],
  };

  // DESIGN FOLDERS
  const designFolders = [
    "ads",
    "book",
    "brochure",
    "business-card",
    "certificate",
    "EVENT",
    "logo",
    "packaging",
    "rollup",
  ];

  for (const f of designFolders) {
    output.design[f] = await uploadFolder(`design/${f}`, `images/design/${f}`);
  }

  
  output.sponsor = await uploadFolder("sponsor", "images/sponsor");

  
  output.logo = await uploadFolder("logo", "images/logo");

  
  fs.writeFileSync("images.json", JSON.stringify(output, null, 2));
  console.log("🎉 DONE — All images uploaded & images.json generated!");
}

uploadAll();