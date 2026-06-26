const sharp=require("sharp"); const fs=require("fs");
const OUT="public/images/", PREV="Ref/_preview/";
const SRC={ "petit-sac":"Ref/PhotoClient/Simulateur_ PetitSac.png", "grand-sac":"Ref/PhotoClient/Simulateur_ LongSac.png", "pochette-livres":"Ref/PhotoClient/Simulateur_ProtegeLivre.png" };
const D=140, SIZE=700;                 // D = seuil "encre" (corps+traits) ; l ombre lisse est > D
function maxAxis(s,w,h,r,hz){const d=new Uint8Array(w*h);
  if(hz){for(let y=0;y<h;y++){const o=y*w;for(let x=0;x<w;x++){let m=0,a=Math.max(0,x-r),b=Math.min(w-1,x+r);for(let k=a;k<=b;k++)if(s[o+k]>m)m=s[o+k];d[o+x]=m;}}}
  else{for(let x=0;x<w;x++)for(let y=0;y<h;y++){let m=0,a=Math.max(0,y-r),b=Math.min(h-1,y+r);for(let k=a;k<=b;k++){const v=s[k*w+x];if(v>m)m=v;}d[y*w+x]=m;}}return d;}
function minAxis(s,w,h,r,hz){const d=new Uint8Array(w*h);
  if(hz){for(let y=0;y<h;y++){const o=y*w;for(let x=0;x<w;x++){let m=255,a=Math.max(0,x-r),b=Math.min(w-1,x+r);for(let k=a;k<=b;k++)if(s[o+k]<m)m=s[o+k];d[o+x]=m;}}}
  else{for(let x=0;x<w;x++)for(let y=0;y<h;y++){let m=255,a=Math.max(0,y-r),b=Math.min(h-1,y+r);for(let k=a;k<=b;k++){const v=s[k*w+x];if(v<m)m=v;}d[y*w+x]=m;}}return d;}
const dil=(s,w,h,r)=>maxAxis(maxAxis(s,w,h,r,true),w,h,r,false);
const ero=(s,w,h,r)=>minAxis(minAxis(s,w,h,r,true),w,h,r,false);
async function build(slug,src){
  const {data,info}=await sharp(src).removeAlpha().raw().toBuffer({resolveWithObject:true});
  const w=info.width,h=info.height,ch=info.channels,N=w*h;
  const lum=new Float32Array(N); for(let i=0;i<N;i++) lum[i]=0.299*data[i*ch]+0.587*data[i*ch+1]+0.114*data[i*ch+2];
  const ink=new Uint8Array(N); for(let i=0;i<N;i++) ink[i]= lum[i]<D ?255:0;
  // silhouette = fermeture de l encre (comble mailles + traits), trous d anses restent ouverts
  const r = slug==="petit-sac"?20:10;
  const sil = ero(dil(ink,w,h,r),w,h,r);
  // texture : encre eclaircie sur transparent (lignes foncees = ombres en multiply ; mailles claires = couleur vive)
  const gray=Buffer.alloc(N), ta=Buffer.alloc(N);
  for(let i=0;i<N;i++){ ta[i]=ink[i]; let v=(lum[i]-45)/160*255; v=Math.max(0,Math.min(255,v)); v=255*Math.pow(v/255,0.5); gray[i]=v; }
  await sharp(gray,{raw:{width:w,height:h,channels:1}}).joinChannel(ta,{raw:{width:w,height:h,channels:1}})
    .resize(SIZE,SIZE,{fit:"inside"}).png({compressionLevel:9}).toFile(OUT+"sim-"+slug+"-tex.png");
  await sharp(Buffer.from(new Uint8Array(N*3).fill(255)),{raw:{width:w,height:h,channels:3}}).joinChannel(Buffer.from(sil),{raw:{width:w,height:h,channels:1}})
    .resize(SIZE,SIZE,{fit:"inside"}).png({compressionLevel:9}).toFile(OUT+"sim-"+slug+"-mask.png");
  console.log("ecrit",slug);
}
function bands(w,h,cols){const rgb=Buffer.alloc(w*h*3),seg=Math.ceil(h/cols.length);
  for(let y=0;y<h;y++){const c=cols[Math.min(cols.length-1,(y/seg)|0)];for(let x=0;x<w;x++){const i=(y*w+x)*3;rgb[i]=c[0];rgb[i+1]=c[1];rgb[i+2]=c[2];}}return rgb;}
const hex=s=>[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)];
async function proof(slug,cols,name){
  const tex=OUT+`sim-${slug}-tex.png`, mask=OUT+`sim-${slug}-mask.png`;
  const {width:w,height:h}=await sharp(tex).metadata();
  const alpha=await sharp(mask).ensureAlpha().extractChannel(3).raw().toBuffer();
  const colored=await sharp(bands(w,h,cols.map(hex)),{raw:{width:w,height:h,channels:3}}).joinChannel(alpha,{raw:{width:w,height:h,channels:1}}).png().toBuffer();
  await sharp({create:{width:w,height:h,channels:4,background:{r:0x2f,g:0x43,b:0x34,alpha:1}}})
    .composite([{input:colored},{input:await sharp(tex).toBuffer(),blend:"multiply"}]).png().toFile(PREV+"PROOF_"+name+".png");
}
(async()=>{
  for(const [slug,src] of Object.entries(SRC)) await build(slug,src);
  await proof("petit-sac",["#f4cf3f","#8fa06a"],"petit_defaut");
  await proof("grand-sac",["#f4cf3f","#8fa06a","#c75c39"],"grand_limonade");
  await proof("pochette-livres",["#7fa7c4"],"pochette_uni");
  console.log("proofs ok");
})().catch(e=>{console.error(e);process.exit(1);});
