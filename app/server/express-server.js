var express = require('express');
var app = express();
var path = require("path");


// app.use(express.static('public'));

console.log('__dirname', __dirname);
console.log('__filename', __filename);



// app.use(express.static('/Developer/meteor/meteor-mysql-rest-demo/app/public'));
// app.use(express.static('../public')); //ng

console.log('__meteor_bootstrap__.serverDir:', __meteor_bootstrap__.serverDir);
console.log('process.cwd():', process.cwd());
// console.log("Assets.absoluteFilePath('.'):", Assets.absoluteFilePath('.'));
// console.log("Assets.absoluteFilePath('public'):", Assets.absoluteFilePath('public'));
// console.log("Assets.absoluteFilePath('index1.html'):", Assets.absoluteFilePath('index1.html'));

console.log("path.resolve('.'):", path.resolve('.')); //error


var absoluteBasePath = path.resolve(process.cwd()).split(path.sep + '.meteor')[0];

console.log("absoluteBasePath:" , absoluteBasePath + '/public');

app.use(express.static(absoluteBasePath + '/public')); //ng

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("web address http://%s:%s", host, port)

})
