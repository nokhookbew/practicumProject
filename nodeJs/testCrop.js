var jimp = require('jimp');

jimp.read('23863.jpg',function(err, image) {
  if(err){
    console.log("error");
  }
  else{
  image.crop(300,170,200,60)
    // image.crop(150,850,300,80) : big picture crop to name
    // image.crop(0,7,290,100) : small picture crop to name
    // x, y, w, h
    .quality(80)
    // .write('new23862.jpg') : big picture
    // .write('new23863.jpg') : name of label from small picture
    .write('new23864.jpg')
  }
})
