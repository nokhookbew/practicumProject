var jimp = require('jimp');


jimp.read('./picAndOcr/smallPictureBeefTop.jpg', (err, image) => {
    if(err){
        console.log("resize fail")
    }
    else{
        image.resize(709, 608)
        .quality(80)
        .write('resize.jpg')
    }

})

jimp.read('resize.jpg', function(err, image){
    if(err){
        console.log("error");
    }
    else{
        // image.crop(0,15,750,100) // : ชื่ออาหาร จากรูปเล็ก
        // image.crop(350,218,420,80) // : วันหมดอายุ จากรูปเล็ก
        image.crop(0,480,760,100) // : นำ้หนักสุทธิ จากรูเล็ก

        .quality(80)
        .write('targetPicTop.jpg')
    }
})