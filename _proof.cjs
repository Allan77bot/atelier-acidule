const sharp=require("sharp");
const OUT="Ref/_preview/";
const SAPIN={r:0x2f,g:0x43,b:0x34,alpha:1};
function bands(w,h,cols){const rgb=Buffer.alloc(w*h*3),seg=Math.ceil(h/cols.length);
  for(let y=0;y<h;y++){const c=cols[Math.min(cols.length-1,(y/seg)|0)];for(let x=0;x<w;x++){const i=(y*w+x)*3;rgb[i]=c[0];rgb[i+1]=c[1];rgb[i+2]=c[2];}}return rgb;}
const hex=s=>[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)];
async function proof(slug,cols,name){
  const tex=`public/images/sim-${slug}-tex.png`, mask=`public/images/sim-${slug}-mask.png`;
  const {width:w,height:h}=await sharp(tex).metadata();
  const alpha=await sharp(mask).ensureAlpha().extractChannel(3).raw().toBuffer(); // alpha de la silhouette
  const colored=await sharp(bands(w,h,cols.map(hex)),{raw:{width:w,height:h,channels:3}})
    .joinChannel(alpha,{raw:{width:w,height:h,channels:1}}).png().toBuffer();
  await sharp({create:{width:w,height:h,channels:4,background:SAPIN}})
    .composite([{input:colored},{input:await sharp(tex).toBuffer(),blend:"multiply"}])
    .png().toFile(OUT+"PROOF_"+name+".png");
  console.log("proof",name);
}
(async()=>{
  await proof("petit-sac",["#f4cf3f","#8fa06a"],"petit_defaut");   // palette par defaut (2 fils)
  await proof("grand-sac",["#f4cf3f","#8fa06a","#c75c39"],"grand_limonade"); // 3 fils
  await proof("pochette-livres",["#7fa7c4"],"pochette_uni"); // 1 fil = uni
})();
