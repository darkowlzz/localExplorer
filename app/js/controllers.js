'use strict';

musicApp.controller('musicCtrl', function($scope, $http, $document, $mdSidenav) {
  $scope.showPlayer = false;
  $scope.currentSong = {};

  $http.get('/music')
  .success(function(data, status, headers, config) {
    $scope.songs = data;
  });

  $scope.songSelect = function (song) {
    $scope.currentSongId = song.id;
    $scope.selectedSongPath = song.path;
    $scope.currentSong = song;
  };

  $scope.mplayer = document.getElementsByTagName('audio')[0];
  $scope.mplayer.addEventListener('ended', function () {
    $scope.currentSongId++;
    $scope.currentSong = $scope.songs[$scope.currentSongId];
    $scope.mplayer.src = $scope.currentSong.path;
    $scope.mplayer.play();
  });

  $scope.toggleLeft = function () {
    $mdSidenav('left').toggle()
                       .then(function () {

                       });
  }
});
