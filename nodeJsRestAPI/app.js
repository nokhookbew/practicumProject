var express = require('express');
var app = express();
var fs = require("fs");

var user = {
    "user3" : {
      "name" : "asdfasdf",
      "nickname" : "zoasdfm",
      "id" : 3
    }
}

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
  console.log("Application run At http://%s:%s", host, port);
});
