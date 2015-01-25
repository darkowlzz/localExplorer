#!/usr/bin/env node

var express      = require('express'),
    fs           = require('fs')
    Q            = require('q'),
    readdirrsync = require('readdirrsync'),
    _            = require('lodash'),
    path         = require('path');

var app = express();

app.set('json spaces', 2);

app.use('/app', express.static(__dirname + '/app'));
app.use('/explore', express.static(process.argv[2]));

app.get('/music', function (req, res) {
  var files = readdirrsync(process.argv[2]);
  var ext;
  filterByExtension(files, ['mp3']);
  var slicePos = process.argv[2].length;
  files.forEach(function (file, index) {
    files[index] = {
      path: '/explore/' + file.slice(slicePos),
      name: path.basename(file)
    }
  });
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(files));
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
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
