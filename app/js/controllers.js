'use strict';

var galleryApp = angular.module('galleryApp', []);

galleryApp.controller('GalleryListCtrl', function($scope, $http) {
  $http.get('/music')
  .success(function(data, status, headers, config) {
    console.log('type: ', typeof(data));
    $scope.items = data;
  });
});
