const sharp = require("sharp");
(async () => {
  for (const [k,p] of Object.entries({
    grand:"Ref/PhotoClient/Simulateur_ LongSac.png",
    pochette:"Ref/PhotoClient/Simulateur_ProtegeLivre.png",
    petit:"Ref/PhotoClient/Simulateur_ PetitSac.png"})) {
    const { data, info } = await sharp(p).raw().toBuffer({resolveWithObject:true});
    const ch = info.channels, w=info.width, h=info.height;
    const lum=(x,y)=>{const i=(y*w+x)*ch;return Math.round(0.299*data[i]+0.587*data[i+1]+0.114*data[i+2]);};
    // coins (fond) + centre (sac)
    console.log(k,
      "coins:", [[2,2],[w-3,2],[2,h-3],[w-3,h-3]].map(([x,y])=>lum(x,y)).join(","),
      "| centre:", lum(w>>1,h>>1),
      "| histo>180:", (()=>{let c=0;for(let i=0;i<data.length;i+=ch) if(0.299*data[i]+0.587*data[i+1]+0.114*data[i+2]>180)c++; return Math.round(100*c/(w*h))+"%";})()
    );
  }
})();
