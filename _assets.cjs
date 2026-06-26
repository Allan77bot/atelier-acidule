const sharp=require("sharp"); const fs=require("fs");
const OUT="Ref/_preview/"; fs.mkdirSync(OUT,{recursive:true});
const SRC={petit:"Ref/PhotoClient/Simulateur_ PetitSac.png",grand:"Ref/PhotoClient/Simulateur_ LongSac.png",pochette:"Ref/PhotoClient/Simulateur_ProtegeLivre.png"};
const T=188,HOLE=0.0015;
// morpho separable sur Uint8 (0/255)
function maxAxis(s,w,h,r,horiz){const d=new Uint8Array(w*h);
  if(horiz){for(let y=0;y<h;y++){const o=y*w;for(let x=0;x<w;x++){let m=0,a=Math.max(0,x-r),b=Math.min(w-1,x+r);for(let k=a;k<=b;k++)if(s[o+k]>m)m=s[o+k];d[o+x]=m;}}}
  else{for(let x=0;x<w;x++)for(let y=0;y<h;y++){let m=0,a=Math.max(0,y-r),b=Math.min(h-1,y+r);for(let k=a;k<=b;k++){const v=s[k*w+x];if(v>m)m=v;}d[y*w+x]=m;}}return d;}
function minAxis(s,w,h,r,horiz){const d=new Uint8Array(w*h);
  if(horiz){for(let y=0;y<h;y++){const o=y*w;for(let x=0;x<w;x++){let m=255,a=Math.max(0,x-r),b=Math.min(w-1,x+r);for(let k=a;k<=b;k++)if(s[o+k]<m)m=s[o+k];d[o+x]=m;}}}
  else{for(let x=0;x<w;x++)for(let y=0;y<h;y++){let m=255,a=Math.max(0,y-r),b=Math.min(h-1,y+r);for(let k=a;k<=b;k++){const v=s[k*w+x];if(v<m)m=v;}d[y*w+x]=m;}}return d;}
const dilate=(s,w,h,r)=>maxAxis(maxAxis(s,w,h,r,true),w,h,r,false);
const erode =(s,w,h,r)=>minAxis(minAxis(s,w,h,r,true),w,h,r,false);
async function build(slug,src){
  const {data,info}=await sharp(src).removeAlpha().raw().toBuffer({resolveWithObject:true});
  const w=info.width,h=info.height,ch=info.channels,N=w*h;
  const light=new Uint8Array(N);
  for(let i=0;i<N;i++) light[i]=(0.299*data[i*ch]+0.587*data[i*ch+1]+0.114*data[i*ch+2]>T)?1:0;
  const bg=new Uint8Array(N),st=[]; const seed=idx=>{if(light[idx]&&!bg[idx]){bg[idx]=1;st.push(idx);}};
  for(let x=0;x<w;x++){seed(x);seed((h-1)*w+x);}for(let y=0;y<h;y++){seed(y*w);seed(y*w+w-1);}
  while(st.length){const idx=st.pop(),x=idx%w,y=(idx/w)|0;if(x>0)seed(idx-1);if(x<w-1)seed(idx+1);if(y>0)seed(idx-w);if(y<N-w)seed(idx+w);}
  const seen=new Uint8Array(N),thr=HOLE*N;
  for(let s=0;s<N;s++){if(!light[s]||bg[s]||seen[s])continue;const comp=[s];seen[s]=1;let qi=0;
    while(qi<comp.length){const idx=comp[qi++],x=idx%w,y=(idx/w)|0,nb=[];if(x>0)nb.push(idx-1);if(x<w-1)nb.push(idx+1);if(y>0)nb.push(idx-w);if(y<N-w)nb.push(idx+w);
      for(const n of nb)if(light[n]&&!bg[n]&&!seen[n]){seen[n]=1;comp.push(n);}}
    if(comp.length>thr)for(const idx of comp)bg[idx]=1;}
  const texA=new Uint8Array(N); for(let i=0;i<N;i++)texA[i]=bg[i]?0:255;
  // texture eclaircie
  const gray=Buffer.alloc(N);
  for(let i=0;i<N;i++){let v=0.299*data[i*ch]+0.587*data[i*ch+1]+0.114*data[i*ch+2];v=(v-45)/160*255;v=Math.max(0,Math.min(255,v));v=255*Math.pow(v/255,0.5);gray[i]=v;}
  await sharp(gray,{raw:{width:w,height:h,channels:1}}).joinChannel(Buffer.from(texA),{raw:{width:w,height:h,channels:1}}).png().toFile(OUT+slug+"-tex.png");
  // silhouette = close(texA) ; petit (trait) demande un gros rayon
  const r=slug==="petit"?22:8;
  const sil=erode(dilate(texA,w,h,r),w,h,r);
  await sharp(Buffer.from(new Uint8Array(N*3).fill(255)),{raw:{width:w,height:h,channels:3}}).joinChannel(Buffer.from(sil),{raw:{width:w,height:h,channels:1}}).png().toFile(OUT+slug+"-mask.png");
  return {w,h,sil};
}
function bands(w,h,cols){const rgb=Buffer.alloc(w*h*3),seg=Math.ceil(h/cols.length);
  for(let y=0;y<h;y++){const c=cols[Math.min(cols.length-1,(y/seg)|0)];for(let x=0;x<w;x++){const i=(y*w+x)*3;rgb[i]=c[0];rgb[i+1]=c[1];rgb[i+2]=c[2];}}return rgb;}
(async()=>{
  const pal={petit:[[0xf4,0xcf,0x3f]],grand:[[0x8f,0xa0,0x6a],[0xf4,0xcf,0x3f],[0xc7,0x5c,0x39]],pochette:[[0xc7,0x5c,0x39],[0x7f,0xa7,0xc4]]};
  for(const [slug,src] of Object.entries(SRC)){
    const {w,h,sil}=await build(slug,src);
    const colored=await sharp(bands(w,h,pal[slug]),{raw:{width:w,height:h,channels:3}}).joinChannel(Buffer.from(sil),{raw:{width:w,height:h,channels:1}}).png().toBuffer();
    const tex=await sharp(OUT+slug+"-tex.png").toBuffer();
    await sharp({create:{width:w,height:h,channels:4,background:{r:225,g:225,b:225,alpha:1}}})
      .composite([{input:colored},{input:tex,blend:"multiply"}]).png().toFile(OUT+"FINAL_"+slug+".png");
    console.log("ok",slug);
  }
})().catch(e=>{console.error(e);process.exit(1);});
