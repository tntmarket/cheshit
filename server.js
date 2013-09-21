#! /bin/node

var express = require('express');
var app = express();

app.get('/', function(req, res){
   res.sendfile('src/index.html');
});

app.configure(function() {
   app.use(express.static(__dirname + '/src'));
});

app.listen(process.env.VCAP_APP_PORT || 8080);

console.log('listening on port 8080');
