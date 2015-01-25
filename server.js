#!/usr/bin/env node

var express = require('express'),
    fs = require('fs')
    Q  = require('q'),
    readdirrsync = require('readdirrsync');

var app = express();

app.set('json spaces', 2);

app.use('/app', express.static(__dirname + '/app'));
app.use('/explore', express.static(process.argv[2]));

/*
app.get('/gallery', function(req, res) {
  var files = fs.readdirSync('/Users/sunny/Desktop/rec/recup/');
  console.log('file count: ', files.length);
  files.forEach(function (file, index) {
    files[index] = '/Users/sunny/Desktop/rec/recup/' + file;
  });
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(files));
});
*/

app.get('/music', function (req, res) {
  var files = readdirrsync(process.argv[2]);
  console.log('file count:', files.length);
  console.log(files);
  var slicePos = process.argv[2].length;
  files.forEach(function (file, index) {
    files[index] = '/explore/' + file.slice(slicePos);
  });
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(files));
});

console.log('Serving ' + process.argv[2]);

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});


function readDirSync(path) {
  return Q.Promise(function (resolve, reject) {
    recursive(path, function (err, files) {
      if (err) reject(err);
      resolve(files);
    });
  });
}
