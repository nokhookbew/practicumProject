var express = require('express');
var croper = require('jimp');
var ocr = require('node-tesseract-ocr');
var app = express();
var fs = require("fs");
var multer = require('multer')

const path = require('path');
const pic = 'uploadImage.jpg' 
var formatTop = [ {id: 1, name: '', ex: '', weight: ''} ];
var formatTessco = [ {id: 1, name: '', ex: '', weight: ''} ];

// set storage engin
const storage = multer.diskStorage({
  destination: '',
  filename: function(req, file, callback){
    callback(null, file.fieldname + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    checkFileType(file, callback)
  }
  } ).single('uploadImage');

function checkFileType(file, callback){
  const fileTypes = /jpg/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  if(extname){
    return callback(null,true);
  } 
  else {
    callback('Error: Images Only!');
  }
}

const config = {
  lang: 'tha+eng', // 'eng'
  oem: 0, // tesseract --help-oem
  psm: 3
  // cmd: 'tesseract ./targetPic.jpg stdout -l tha --oem 0 --psm 3'
}
const config7 = {
  lang: 'tha+eng', // 'eng'
  oem: 0, // tesseract --help-oem
  psm: 7
  // cmd: 'tesseract ./targetPic.jpg stdout -l tha --oem 0 --psm 7'
}

// croper.read('uploadImage.jpg', (err, image) => {
//   if(err){
//       console.log("resize fail")
//   }
//   else{
//       image.resize(709, 608)
//       .quality(80)
//       .write('uploadImage1.jpg')
//   }
// })

app.post('/uploadPic', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      console.log('err')
    }
    else{
      console.log(req.file);
    }
  })
});

app.get('/topProcessFormat', async (req, res) => {
  formatTop[0].name = await topNameReader();
  formatTop[0].ex = await topExpiredDateReader();
  formatTop[0].weight = await topNetWeightReader();
  res.json(formatTop);
})

app.get('/tesscoProcessFormat', async (req, res) =>{
  formatTessco[0].name =  await tesscoNameReader();
  formatTessco[0].ex = await tesscoExpiredDateReader();
  formatTessco[0].weight = await tesscoNetWeightReader();
  res.json(formatTessco);
})


function topNameReader(){
  return new Promise((resolve, reject) => {

    croper.read(pic, function(err, image){
      if(err){
        console.log("error")
      }
      else{
        image.crop(0,15,750,100).quality(80).write('topSubPic/namePicTop.jpg')
      }
    })
    ocr.recognize('./topSubPic/namePicTop.jpg', config7)
    .then(text => {
      resolve(text)
    })
    .catch(err => {
      reject(err)
    })
  });

}

function topExpiredDateReader(){
  return new Promise((resolve, reject) => {
    croper.read(pic, function(err, image){
      if(err){ 
        console.log("error") 
      }
      else{
          image.crop(350,218,420,80).quality(80).write('topSubPic/expiredDatePicTop.jpg')
        }
      })
      ocr.recognize('./topSubPic/expiredDatePicTop.jpg', config)
      .then(text => {
        resolve(text)
      })
      .catch(err => {
        reject(err)
      })
  });
}

function topNetWeightReader(){
  return new Promise((resolve, reject) => {
    croper.read(pic, function(err, image){
      if(err){
        console.log("error")
      }
      else{
        image.crop(0,480,760,100).quality(80).write('topSubPic/netWeightPicTop.jpg')
      }
    })
    ocr.recognize('./topSubPic/netWeightPicTop.jpg', config)
    .then(text => {
      resolve(text)
    })
    .catch(err => {
      reject(err)
    })
  })
}

function tesscoNameReader(){
  return new Promise((resolve, reject) => {
    croper.read(pic, function(err, image){
      if(err){
        console.log("error")
      }
      else{
        image.crop(0,7,290,90).quality(80).write('tesscoSubPic/namePicTessco.jpg')
      }
    })
    ocr.recognize('./tesscoSubPic/namePicTessco.jpg', config7)
    .then(text => {
      resolve(text)
    })
    .catch(err => {
      reject(err)
    })
  });
}

function tesscoExpiredDateReader(){
    return new Promise((resolve, reject) => {
      croper.read(pic, function(err, image){
        if(err){
          console.log("error")
        }
        else{
          image.crop(300,170,180,50).quality(80).write('tesscoSubPic/expiredDatePicTessco.jpg')
        }
      })
      ocr.recognize('./tesscoSubPic/expiredDatePicTessco.jpg', config)
      .then(text => {
        resolve(text)
      })
      .catch(err => {
        reject(err)
      })
    }); 
}

function tesscoNetWeightReader(){
  return new Promise((resolve, reject) => {
    croper.read(pic, function(err, image){
      if(err){
        console.log("error")
      }
      else{
        image.crop(0,210,480,100).quality(80).write('tesscoSubPic/netWeightPicTessco.jpg')
      }
    })
    ocr.recognize('./tesscoSubPic/netWeightPicTessco.jpg', config)
    .then(text => {
      resolve(text)
    })
    .catch(err => {
      reject(err)
    })
  });
}


const PORT = 8081
var server = app.listen(PORT, function() {
  console.log("Application run At port", PORT);
});
        

