'use strict';

musicApp.controller('musicCtrl', function($scope, $http, $document,
                                          $mdSidenav, $mdDialog) {
  $scope.showPlayer = false;
  $scope.currentSong = {};
  $scope.searchON = false;
  $scope.playing = false;
  $scope.playIcon = 'play_arrow';
  var mplayer = document.getElementsByTagName('audio')[0];
  var musicName = document.getElementById('musicName');

  $http.get('/music')
  .success(function(data, status, headers, config) {
    $scope.songs = data;
  });

  $scope.songSelect = function (song) {
    $scope.currentSongId = song.id;
    $scope.selectedSongPath = song.path;
    $scope.currentSong = song;
    mplayer.play();
    $scope.playing = true;
  };

  function updateTitle () {
    musicName.innerHTML = $scope.currentSong.name;
  }

  function updatePlayIcon () {
    if ($scope.playing) {
      $scope.playIcon = 'pause';
    } else {
      $scope.playIcon = 'play_arrow';
    }
  }

  $scope.togglePlay = function () {
    if ($scope.playing) {
      mplayer.pause();
      $scope.playing = false;
    } else {
      mplayer.play();
      $scope.playing = true;
    }
    updatePlayIcon();
  };

  $scope.playPrevious = function () {
    $scope.currentSongId--;
    $scope.currentSong = $scope.songs[$scope.currentSongId];
    mplayer.src = $scope.currentSong.path;
    mplayer.play();
    $scope.playing = true;
    updateTitle();
  };

  $scope.playNext = function () {
    $scope.currentSongId++;
    $scope.currentSong = $scope.songs[$scope.currentSongId];
    mplayer.src = $scope.currentSong.path;
    mplayer.play();
    $scope.playing = true;
    updateTitle();
  };

  mplayer.addEventListener('ended', function () {
    $scope.currentSongId++;
    $scope.currentSong = $scope.songs[$scope.currentSongId];
    mplayer.src = $scope.currentSong.path;
    mplayer.play();
    $scope.playing = true;
    updateTitle();
  });

  $scope.toggleLeft = function () {
    $mdSidenav('left').toggle()
                       .then(function () {

                       });
  };

  $scope.toggleSearch = function () {
    $scope.searchON = ! $scope.searchON;
  };

  $scope.showFileUpload = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'upload.tmpl.html',
      targetEvent: ev
    })
    .then(function(answer) {

    });
  };

});

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}
