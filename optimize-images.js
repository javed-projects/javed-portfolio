import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "./public";

const files = fs.readdirSync(inputDir);

for (const file of files) {
  const ext = path.extname(file).toLowerCase();

  if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;

  const input = path.join(inputDir, file);
  const output = path.join(
    inputDir,
    path.parse(file).name + ".webp"
  );

  const quality = file === "face.png" ? 95 : 88;

  await sharp(input)
    .webp({ quality })
    .toFile(output);

  console.log(`✓ ${file} -> ${path.basename(output)}`);
}

console.log("Done!");