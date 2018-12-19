var fs =  require('fs') // fs = file system
var readMe = fs.readFileSync('topChicken.txt','utf8');
readMe = readMe.trim();
var index = readMe.indexOf("ธิ");

// console.log(readMe);
// console.log(index);
// console.log(readMe.substr(index + 3));

var ss = readMe.substr(index + 3);
var arr = ss.split(" ");
console.log(arr[0]);
console.log(arr[1]);
console.log(arr[2]);
console.log(arr[3]);
