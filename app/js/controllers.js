'use strict';

var galleryApp = angular.module('galleryApp', ['ngMaterial', 'ngMdIcons']);

galleryApp.controller('GalleryListCtrl', function($scope, $http, $document) {
  $http.get('/music')
  .success(function(data, status, headers, config) {
    $scope.items = data;
  });

  $scope.songSelect = function (songPath) {
    $scope.selectedSongPath = songPath;
  };
});
