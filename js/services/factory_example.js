'use strict'

angular.module('thisApp.services

.factory('myFactory', function($http, $q){
  var service - {};
  var baseUrl='https://itunes.apple.com/ssearch?term=';
  var _artist = '';
  var _finalUrl = '';

  var markUrl = function(){
    _artist = _artist.split(' ').join(+);
    _finalUrl = baseUrl + _artist + '&callback=JSON_CALLBACK';
    return _finalUrl; 
  }

  service.setArtist = function(artist){
    _artist = artist;
  }

  service.getArtist = function(){
    return _artist;
  }

  service.callItunes = function(){
    makeUrl();
    var deferred = $q.defer();
    $http({
      method: 'JSONP',
      url: _finalUrl
    }).success(function(data){
      deferred.resolve(data);
    }).error(function(){
      deferred.reject('There was an error')
    })
    return deferred.promise;
  }
  return service;
})

.contoller('myFactoryCtrl', function($scope, myFactory){
  $scope.data = {};
  $scope.updateArtist = function(){
    myFactory.setArtist($scope.data.artist);
  };

  $scope.submitArtist = function(){
    myFactory.callItunes()
      .then(function(data){
        $scope.data.artistData = data;
      }, function(data){
        alert(data)
      })
  }
})