const sharp=require("sharp");
const SRC={petit:"Ref/PhotoClient/Simulateur_ PetitSac.png",grand:"Ref/PhotoClient/Simulateur_ LongSac.png",pochette:"Ref/PhotoClient/Simulateur_ProtegeLivre.png"};
(async()=>{
 for(const [k,p] of Object.entries(SRC)){
   const {data,info}=await sharp(p).removeAlpha().raw().toBuffer({resolveWithObject:true});
   const w=info.width,h=info.height,ch=info.channels;
   const L=(x,y)=>{const i=(y*w+x)*ch;return Math.round(0.299*data[i]+0.587*data[i+1]+0.114*data[i+2]);};
   // points: coin(fond), centre(corps), bas-droite(ombre probable), bord-bas
   console.log(k,"coin",L(5,5),"centre",L(w>>1,h>>1),
     "ombreBD",L(Math.round(w*0.72),Math.round(h*0.78)),
     "ombreD",L(Math.round(w*0.85),Math.round(h*0.55)),
     "basG",L(Math.round(w*0.25),Math.round(h*0.8)));
 }
})();
