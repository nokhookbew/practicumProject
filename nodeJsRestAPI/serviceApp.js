var express = require('express');
var croper = require('jimp');
var ocr = require('node-tesseract-ocr');
var app = express();
var fs = require("fs");

var user = {
    "user3" : {
      "name" : "asdfasdf",
      "nickname" : "zoasdfm",
      "id" : 3
    }
}
const config = {
  lang: 'tha', // 'eng'
  oem: 0, // tesseract --help-oem
  psm: 3
  // cmd: 'tesseract ./targetPic.jpg stdout -l tha --oem 0 --psm 3'
}

const pic = 'smallPictureBeefTop.jpg' // have to dynamic
var format = [
  {id: 1, name: '', ex: '', weight: ''}
];

app.get('/topProcessFormat', (req, res) => {
  topNameReader();
  topExpiredDateReader();
  topNetWeightReader();
  res.end("process")
})


app.get('/getformat', (req, res) => {
  console.log('format : ', format)
  res.json(format);
});


function topNameReader(){
  croper.read(pic, function(err, image){
    if(err){
      console.log("error")
    }
    else{
      image.crop(0,15,750,100).quality(80).write('namePicTop.jpg')
    }
  })
  ocr.recognize('./namePicTop.jpg', config)
  .then(text => {
    format[0].name = text;
    console.log('name : ', format.name);
  })
  .catch(err => {
    console.log('error:', err)
  })
}

function topExpiredDateReader(){
  croper.read(pic, function(err, image){
  if(err){ 
    console.log("error") 
  }
  else{
      image.crop(350,218,420,80).quality(80).write('expiredDatePicTop.jpg')
    }
  })
  ocr.recognize('./expiredDatePicTop.jpg', config)
  .then(text => {
    format[0].ex = text
    console.log('expired Date : ', format.ex);
  })
  .catch(err => {
    console.log('error:', err)
  })
}

function topNetWeightReader(){
    croper.read(pic, function(err, image){
    if(err){
      console.log("error")
    }
    else{
      image.crop(0,480,760,100).quality(80).write('netWeightPicTop.jpg')
    }
  })
  ocr.recognize('./netWeightPicTop.jpg', config)
  .then(text => {
    format[0].weight = text
    console.log('net weight : ', text);
  })
  .catch(err => {
    console.log('error:', err)
  })
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
  var port = server.address().port
  console.log("Application run At port", port);
});
        