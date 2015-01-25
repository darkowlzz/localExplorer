'use strict';

var galleryApp = angular.module('galleryApp', ['ngMaterial']);

galleryApp.controller('GalleryListCtrl', function($scope, $http, $document) {
  $http.get('/music')
  .success(function(data, status, headers, config) {
    console.log('type: ', typeof(data));
    $scope.items = data;
  });

  $scope.songSelect = function (songPath) {
    $scope.selectedSongPath = songPath;
  }
});
