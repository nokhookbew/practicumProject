var express = require('express');
var croper = require('jimp');
var ocr = require('node-tesseract-ocr');
var app = express();
var fs = require("fs");


var multer = require('multer')
app.use(multer());

var user = [{
    "user3" : {
      "name" : "asdfasdf",
      "nickname" : "zoasdfm",
      "id" : 3
    }
}]
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

const picTop = 'smallPictureBeefTop.jpg' // have to dynamic
const picTessco = 'smallPictureInternalOrganTesco.jpg'

var formatTop = [
  {id: 1, name: '', ex: '', weight: ''}
];

var formatTessco = [
  {id: 1, name: '', ex: '', weight: ''}
];



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
  // res.end("tessco process")
})

app.get('/getFormatTop', (req, res) => {
  console.log('format : ', formatTop)
  res.json(formatTop);
});

app.get('/getFormatTessco', (req, res) => {
  console.log('format : ', formatTessco)
  res.json(formatTessco);
});


function topNameReader(){
  return new Promise((resolve, reject) => {
    croper.read(picTop, function(err, image){
      if(err){
        console.log("error")
      }
      else{
        image.crop(0,15,750,100).quality(80).write('namePicTop.jpg')
      }
    })
    ocr.recognize('./namePicTop.jpg', config7)
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
    croper.read(picTop, function(err, image){
      if(err){ 
        console.log("error") 
      }
      else{
          image.crop(350,218,420,80).quality(80).write('expiredDatePicTop.jpg')
        }
      })
      ocr.recognize('./expiredDatePicTop.jpg', config)
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
    croper.read(picTop, function(err, image){
      if(err){
        console.log("error")
      }
      else{
        image.crop(0,480,760,100).quality(80).write('netWeightPicTop.jpg')
      }
    })
    ocr.recognize('./netWeightPicTop.jpg', config)
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
    croper.read(picTessco, function(err, image){
      if(err){
        console.log("error")
      }
      else{
        image.crop(0,7,290,90).quality(80).write('namePicTessco.jpg')
      }
    })
    ocr.recognize('./namePicTessco.jpg', config7)
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
      croper.read(picTessco, function(err, image){
        if(err){
          console.log("error")
        }
        else{
          image.crop(300,170,180,50).quality(80).write('expiredDatePicTessco.jpg')
        }
      })
      ocr.recognize('./expiredDatePicTessco.jpg', config)
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
    croper.read(picTessco, function(err, image){
      if(err){
        console.log("error")
      }
      else{
        image.crop(0,210,480,100).quality(80).write('netWeightPicTessco.jpg')
      }
    })
    ocr.recognize('./netWeightPicTessco.jpg', config)
    .then(text => {
      resolve(text)
    })
    .catch(err => {
      reject(err)
    })
  });
  
}
// read data from json file
app.get('/getUsers', function (req, res) {
  fs.readFile( __dirname + "/" + "user.json", "utf8", function (err, data) {
    console.log(data);
    res.end(data);
  });
});

// get user form ID in json file
app.get('/getUsers/:id', function (req, res) {
  fs.readFile( __dirname + "/" + "user.json", "utf8", function (err, data){
    var users = JSON.parse(data);
    var user = users["user" + req.params.id]
    console.log(user);
    res.end(JSON.stringify(user));
  });
});

// app.post('/file_upload', upload.single("file"), function (req, res) {
//   var file = __dirname + "/" + req.file.originalname;
//   fs.readFile( req.file.path, function (err, data) {
//        fs.writeFile(file, data, function (err) {
//         if( err ){
//              console.error( err );
//              response = {
//                   message: 'Sorry, file couldn\'t be uploaded.',
//                   filename: req.file.originalname
//              };
//         }else{
//               response = {
//                   message: 'File uploaded successfully',
//                   filename: req.file.originalname
//              };
//          }
//          res.end( JSON.stringify( response ) );
//       });
//   });
// })

// post user 3
app.post('/addUser', function (req, res) {
  fs.readFile( __dirname + "/" + "user.json", "utf8", function (err, data) {
    data = JSON.parse(data); //cast data to JSON object
    data["user3"] = user["user3"];
    console.log(data);
    res.end(JSON.stringify(data))
  })
})

const PORT = 8081
var server = app.listen(PORT, function() {
  console.log("Application run At port", PORT);
});
        

