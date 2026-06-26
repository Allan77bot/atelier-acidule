const sharp=require("sharp");
const PREV="Ref/_preview/";
(async()=>{
  const f="public/images/sim-petit-sac.png";
  const m=await sharp(f).metadata(); console.log("asset",m.width,m.height,"ch",m.channels,"alpha",m.hasAlpha);
  // alpha de l asset, rendu opaque
  await sharp(f).ensureAlpha().extractChannel(3).toColourspace("b-w").png().toFile(PREV+"ASSETALPHA_petit.png");
  // rgb (gris) de l asset sur fond rouge pour voir l opacite
  await sharp({create:{width:m.width,height:m.height,channels:4,background:{r:200,g:0,b:0,alpha:1}}})
    .composite([{input:f}]).png().toFile(PREV+"ASSETonRED_petit.png");
})();
