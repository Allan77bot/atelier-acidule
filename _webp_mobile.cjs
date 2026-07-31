// Optimisation mobile (fix/mobile) : génère des versions WebP redimensionnées
// des images lourdes + réduit logo.png (445 Ko pour 52 px affichés).
// Usage : node _webp_mobile.cjs  — jetable, hors build Astro.
const sharp = require('sharp');
const fs = require('fs');
const IMG = 'public/images/';

const jobs = [
  // [source, cible, largeur max, qualité]
  ['hero-crochet.png', 'hero-crochet.webp', 1200, 82],
  ['about-atelier.png', 'about-atelier.webp', 1200, 82],
  ['petit-sac.png', 'petit-sac.webp', 800, 82],
  ['pochette-livres.png', 'pochette-livres.webp', 800, 82],
  ['grand-sac.png', 'grand-sac.webp', 800, 82],
  ['edition-speciale.png', 'edition-speciale.webp', 800, 82],
  ['accueil-petit-sac.png', 'accueil-petit-sac.webp', 1000, 80],
  ['accueil-pochette-livres.png', 'accueil-pochette-livres.webp', 1000, 80],
  ['accueil-grand-sac.png', 'accueil-grand-sac.webp', 1000, 80],
  ['accueil-editions-speciales.png', 'accueil-editions-speciales.webp', 1000, 80],
];

(async () => {
  for (const [src, dst, w, q] of jobs) {
    const meta = await sharp(IMG + src).metadata();
    await sharp(IMG + src)
      .resize({ width: Math.min(w, meta.width), withoutEnlargement: true })
      .webp({ quality: q, alphaQuality: 90 })
      .toFile(IMG + dst);
    const a = (fs.statSync(IMG + src).size / 1024) | 0;
    const b = (fs.statSync(IMG + dst).size / 1024) | 0;
    console.log(`${src} ${a} Ko -> ${dst} ${b} Ko`);
  }
  // logo : affiché 40-52 px partout -> 160 px suffisent largement (retina x3)
  const tmp = IMG + 'logo-160.tmp.png';
  await sharp(IMG + 'logo.png').resize({ width: 160 }).png({ compressionLevel: 9 }).toFile(tmp);
  const before = (fs.statSync(IMG + 'logo.png').size / 1024) | 0;
  fs.renameSync(tmp, IMG + 'logo.png');
  const after = (fs.statSync(IMG + 'logo.png').size / 1024) | 0;
  console.log(`logo.png ${before} Ko -> ${after} Ko (160px, remplacé en place)`);
})().catch((e) => { console.error(e); process.exit(1); });
