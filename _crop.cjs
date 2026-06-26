const sharp=require("sharp");
(async()=>{
  const src="Ref/PhotoClient/Simulateur_ PetitSac.png";
  const m=await sharp(src).metadata(); console.log("src",m.width,m.height);
  // quadrant bas-droite agrandi
  await sharp(src).extract({left:Math.round(m.width*0.5),top:Math.round(m.height*0.5),width:Math.round(m.width*0.5),height:Math.round(m.height*0.5)}).png().toFile("Ref/_preview/SRC_petit_BD.png");
  // image entiere reduite pour vue d ensemble nette
  await sharp(src).resize(400,400,{fit:"inside"}).png().toFile("Ref/_preview/SRC_petit_full.png");
})();
