var jimp = require('jimp');

jimp.read('./picAndOcr/smallPictureInternalOrganTesco.jpg', function(err, image) {
  if(err){
    console.log("error");
  }
  else{
    // image.crop(300,170,200,60) // : วันหมดอายุ จากรูปเล็ก
    image.crop(0,210,480,100) // : นำ้หนักสุทธิ จากรูปเล็ก
    // image.crop(0,7,290,100) // : ชื่ออาหาร จากรูปเล็ก
    // image.crop(150,850,300,80) : ชื่ออาหารจากรูปใหญ่ (ไม่ได้ใช้)
   
    // .crop(x, y, w, h)
    .quality(80)
    .write('targetPic.jpg')
  }
})
