var express = require('express');
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
}

app.get('/testOCR', function(req, res){
  ocr.recognize('./targetPic.jpg', config)
  .then(text => { 
    console.log('Result:', text)
    res.end(text)
  })
  .catch(err => {
    console.log('error:', err)
  })
})

app.get('/api/youtube', function(req, res){
  console.log("hello")
});

app.get('/getUsers', function (req, res) {
  fs.readFile( __dirname + "/" + "user.json", "utf8", function (err, data) {
    console.log(data);
    res.end(data);
  });
});

app.get('/getUsers/:id', function (req, res) {
  fs.readFile( __dirname + "/" + "user.json", "utf8", function (err, data){
    var users = JSON.parse(data);
    var user = users["user" + req.params.id]
    console.log(user);
    res.end(JSON.stringify(user));
  });
});

app.post('/addUser', function (req, res) {
  fs.readFile( __dirname + "/" + "user.json", "utf8", function (err, data) {
    data = JSON.parse(data); //cast data to JSON object
    data["user3"] = user["user3"];
    console.log(data);
    res.end(JSON.stringify(data))
  })
})


var server = app.listen(8081, function() {
  var host = server.address().address
  var port = server.address().port
  console.log("Application run At port", host, port);
});
        