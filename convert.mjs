import sharp from "sharp";
import fs from "fs";
import path from "path";

const folder = "./public/certificates";

const files = fs.readdirSync(folder);

for (const file of files) {
  const ext = path.extname(file).toLowerCase();

  if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;

  const input = path.join(folder, file);
  const output = path.join(
    folder,
    path.basename(file, ext) + ".webp"
  );

  const quality = file === "face.png" ? 95 : 88;

  await sharp(input)
    .webp({ quality })
    .toFile(output);

  console.log(`✔ Converted ${file}`);
}

console.log("Finished!");