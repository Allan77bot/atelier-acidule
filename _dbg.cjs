const sharp=require("sharp");
const OUT="Ref/_preview/";
(async()=>{
  for(const slug of ["grand","petit","pochette"]){
    const f=async(p)=>{const {data,info}=await sharp(p).raw().toBuffer({resolveWithObject:true});
      const w=info.width,h=info.height,ch=info.channels,i=((h>>1)*w+(w>>1))*ch;
      return `ch${ch} center=[${data[i]},${data[i+1]},${data[i+2]}${ch>3?","+data[i+3]:""}]`;};
    console.log(slug,"TEX ",await f(OUT+slug+"-tex.png"));
    console.log(slug,"MASK",await f(OUT+slug+"-mask.png"));
    console.log(slug,"FIN ",await f(OUT+"FINAL_"+slug+".png"));
  }
})();
