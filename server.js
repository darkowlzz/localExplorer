#!/usr/bin/env node

process.env.TMPDIR = 'tmp';

var express      = require('express'),
    fs           = require('fs')
    Q            = require('q'),
    readdirrsync = require('readdirrsync'),
    _            = require('lodash'),
    path         = require('path'),
    address      = require('network-address'),
    multer       = require('multer'),
    multipart    = require('connect-multiparty'),
    multipartMiddleware = multipart(),
    router       = express.Router();

var app = express();
var files, ext;

app.set('json spaces', 2);

app.use('/app', express.static(__dirname + '/app'));
app.use('/explore', express.static(process.argv[2]));
app.use(multer({dest: './uploads/'}));

console.log('serving', process.argv[2]);

router.post('/upload', function (req, res) {
  /*
  flow.post(req, function(status, filename, original_filename, identifier) {
    console.log('POST', status, original_filename, identifier);
  });
  */
  console.log('hit upload');
  console.log(req.body);
  console.dir(req.files);
  //res.status(status).send();
  res.end('thanks');
});

router.get('/music', function (req, res) {
  files = readdirrsync(process.argv[2]);
  ext = ['mp3'];
  filterByExtension(files, ext);
  var slicePos = process.argv[2].length;
  files.forEach(function (file, index) {
    files[index] = {
      path: '/explore/' + file.slice(slicePos),
      name: path.basename(file),
      originalPath: files[index],
      id: index
    }
  });
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(files));
});

router.get('/download/:file', function (req, res) {
  var fileObj = getFileObject(req.params.file);
  res.download(fileObj.originalPath, fileObj.name, function (err) {
    if (err) {
      console.log('failed to dnld', err);
    } else {
      console.log('downloaded');
    }
  });
});

app.use('/', router);

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
