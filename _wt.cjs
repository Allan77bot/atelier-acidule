const sharp=require("sharp"),fs=require("fs"),path=require("path");
(async()=>{
  const p="public/images/_writetest.png";
  await sharp({create:{width:10,height:10,channels:4,background:{r:255,g:0,b:0,alpha:1}}}).png().toFile(p);
  console.log("abs:",path.resolve(p));
  console.log("existsSync just after:",fs.existsSync(p));
})();
