'use strict';

var galleryApp = angular.module('galleryApp', ['ngMaterial', 'ngMdIcons']);

galleryApp.controller('GalleryListCtrl', function($scope, $http, $document) {
  $http.get('/music')
  .success(function(data, status, headers, config) {
    $scope.songs = data;
  });

  $scope.songSelect = function (song) {
    console.log(song);
    $scope.currentSongId = song.id;
    $scope.selectedSongPath = song.path;
  };

  $scope.mplayer = document.getElementsByTagName('audio')[0];
  $scope.mplayer.addEventListener('ended', function () {
    $scope.currentSongId++;
    $scope.mplayer.src = $scope.songs[$scope.currentSongId].path;
    $scope.mplayer.play();
  });
});
