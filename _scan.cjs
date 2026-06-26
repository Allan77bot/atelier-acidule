const sharp=require("sharp");
(async()=>{
  const {data,info}=await sharp("public/images/sim-petit-sac.png").ensureAlpha().raw().toBuffer({resolveWithObject:true});
  const w=info.width,h=info.height,ch=info.channels;
  console.log("asset",w,h,"ch",ch);
  const y=Math.round(h*0.62);
  let row="y=0.62  ";
  for(let x=0;x<w;x+=Math.round(w/16)){const i=(y*w+x)*ch; row+=`x${x}:g${data[i]}a${data[i+3]} `;}
  console.log(row);
  // moyenne gris/alpha par bande verticale gauche vs droite
  let lg=0,ln=0,rg=0,rn=0;
  for(let yy=Math.round(h*0.4);yy<Math.round(h*0.75);yy++)for(let xx=0;xx<w;xx++){const i=(yy*w+xx)*ch;if(data[i+3]>128){if(xx<w*0.6){lg+=data[i];ln++}else{rg+=data[i];rn++}}}
  console.log("corps gauche moy gris",(lg/ln||0).toFixed(0),"| droite",(rg/rn||0).toFixed(0));
})();
