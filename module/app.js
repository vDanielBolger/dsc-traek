var express = require('express');
var nodes = require('./routes/nodes');
var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var https = require('https');

//var logger = require('morgan');

var app = express();

var privateKey = fs.readFileSync('/data/certs/key.pem');
var sslCert = fs.readFileSync('/data/certs/certificate.pem');

//app.use(logger('dev'));

app.use(function(req, res, next){
    console.log(req.url);
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({strict: false, type: '*/*'}));

app.use('/', nodes);

// app.listen(8080, function(){
//     console.log('Listening on port 8080.');
// });

http.createServer(app).listen(8080,function(){
    console.log('Listening for HTTP traffic on port 8080.\n');
});

https.createServer(
    {   key: privateKey, 
        cert: sslCert, 
        requestCert: true, 
        rejectUnauthorized: false
    },app).listen(8443,function(req, res){
    console.log('Listening for HTTPS traffic on port 8443.\n');
});

module.exports = app; 