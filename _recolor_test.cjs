const sharp = require("sharp");
const fs = require("fs");
const dir = "Ref/PhotoClient/";
const out = "Ref/_preview/";
fs.mkdirSync(out, {recursive:true});

const imgs = {
  grand: dir + "Simulateur_ LongSac.png",
  pochette: dir + "Simulateur_ProtegeLivre.png",
  petit: dir + "Simulateur_ PetitSac.png",
};

(async () => {
  for (const [k,p] of Object.entries(imgs)) {
    const m = await sharp(p).metadata();
    console.log(k, m.width+"x"+m.height, "hasAlpha="+m.hasAlpha);
  }

  // --- Test 1 : teinte unique par multiply sur le long sac gris ---
  const base = sharp(imgs.grand);
  const { width:w, height:h } = await base.metadata();
  const color = {r:0xc7,g:0x5c,b:0x39}; // terracotta
  const layer = await sharp({create:{width:w,height:h,channels:4,background:{...color,alpha:1}}}).png().toBuffer();
  await sharp(imgs.grand).composite([{input:layer, blend:"multiply"}]).png().toFile(out+"grand_mono.png");

  // --- Test 2 : 3 bandes horizontales (sapin / citron / terracotta) ---
  const bands = [{r:0x2f,g:0x43,b:0x34},{r:0xf4,g:0xcf,b:0x3f},{r:0xc7,g:0x5c,b:0x39}];
  const th = Math.ceil(h/3);
  const bandLayers = bands.map((c,i)=>({
    input: { create:{width:w,height:Math.min(th,h-i*th),channels:4,background:{...c,alpha:1}} },
    top: i*th, left:0, blend:"multiply"
  }));
  await sharp(imgs.grand).composite(bandLayers).png().toFile(out+"grand_bandes.png");

  // --- Test 3 : silhouette pleine du petit sac (trait -> remplissage) ---
  // alpha -> flou -> seuil dur, pour fermer les trous entre mailles
  const alpha = await sharp(imgs.petit).ensureAlpha().extractChannel("alpha")
    .blur(6).threshold(40).toBuffer(); // blanc = silhouette
  await sharp(imgs.petit).metadata().then(async pm=>{
    // visualiser la silhouette sur fond magenta pour juger
    const mag = await sharp({create:{width:pm.width,height:pm.height,channels:4,background:{r:255,g:0,b:255,alpha:1}}}).png().toBuffer();
    await sharp(mag).joinChannel(alpha).png().toFile(out+"petit_silhouette.png");
  });

  console.log("OK");
})().catch(e=>{console.error(e); process.exit(1);});
