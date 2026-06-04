// One-off: generate favicon assets from public/Rich1.png into src/app/.
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC = path.join(process.cwd(), "public", "Rich1.png");
const OUT = path.join(process.cwd(), "src", "app");

async function square(size) {
  return sharp(SRC)
    .resize(size, size, { fit: "cover", position: "attention" })
    .png()
    .toBuffer();
}

function pngsToIco(items) {
  // items: [{ size, buf }]
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(items.length, 4);
  let offset = 6 + items.length * 16;
  const entries = [];
  const datas = [];
  for (const { size, buf } of items) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += buf.length;
    entries.push(e);
    datas.push(buf);
  }
  return Buffer.concat([header, ...entries, ...datas]);
}

(async () => {
  // Multi-size .ico for browsers/crawlers that probe /favicon.ico
  const ico = pngsToIco([
    { size: 16, buf: await square(16) },
    { size: 32, buf: await square(32) },
    { size: 48, buf: await square(48) },
  ]);
  fs.writeFileSync(path.join(OUT, "favicon.ico"), ico);

  // App Router auto-links these:
  fs.writeFileSync(path.join(OUT, "icon.png"), await square(512));
  fs.writeFileSync(path.join(OUT, "apple-icon.png"), await square(180));

  console.log("Wrote src/app/favicon.ico, icon.png (512), apple-icon.png (180)");
})();
