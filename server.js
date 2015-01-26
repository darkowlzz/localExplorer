#!/usr/bin/env node

var express      = require('express'),
    fs           = require('fs')
    Q            = require('q'),
    readdirrsync = require('readdirrsync'),
    _            = require('lodash'),
    path         = require('path'),
    address      = require('network-address');

var app = express();
var files, ext;

app.set('json spaces', 2);

app.use('/app', express.static(__dirname + '/app'));
app.use('/explore', express.static(process.argv[2]));

console.log('serving', process.argv[2]);

app.get('/music', function (req, res) {
  files = readdirrsync(process.argv[2]);
  ext = ['mp3'];
  filterByExtension(files, ext);
  var slicePos = process.argv[2].length;
  files.forEach(function (file, index) {
    files[index] = {
      path: '/explore/' + file.slice(slicePos),
      name: path.basename(file),
      originalPath: files[index]
    }
  });
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(files));
});

app.get('/download/:file', function (req, res) {
  var fileObj = getFileObject(req.params.file);
  res.download(fileObj.originalPath, fileObj.name, function (err) {
    if (err) {
      console.log('failed to dnld', err);
    } else {
      console.log('downloaded');
    }
  });
});

var server = app.listen(3000, function() {
  console.log('Visit %s:%d/app/ in a web browser to use localExplorer.',
              address(), server.address().port);
});

function filterByExtension(list, ext) {
  list.forEach(function (item, index) {
    if (! _.contains(ext, item.split('.').pop())) {
      list.splice(index, 1);
      filterByExtension(list, ext);
      return;
    }
  })
}

function getFileObject (name) {
  var result;
  files.some(function (file) {
    result = file;
    return file.name == name;
  });
  return result;
}
