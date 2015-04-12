"use strict"; 

angular.module('urlCheckApp.services',[])

.factory('urlFactory', function($http, $q){
  var service = {};
  var _method = 'jsonp';

  service.setMethod = function(method){
    _method = method;
  }
  service.getMethod = function(){
    return _method;
  }
  
  service.callURL = function(finalUrl){
    var deferred = $q.defer();
    $http({
      method: _method,
      url: finalUrl
    }).success(function(data){
      deferred.resolve(data);
    }).error(function(){
      deferred.reject('There was an error')
    })
    return deferred.promise;
  }
  return service;
})

// .factory('queryFactory', function($http, $q){
//   var service = {};
//   var _method = 'JSONP';
//   // var _method = 'JSON';
// // http://www.omdbapi.com/?t=buffy&y=&plot=short&r=json
  
//   service.setMethod = function(method){
//     _method = method;
//   }

//   service.getMethod = function(method){
//     return method;
//   }

//   service.callURL = function(finalUrl){
//     var deferred = $q.defer();
//     $http({
//       method: _method,
//       url: finalUrl
//     }).success(function(data){
//       deferred.resolve(data);
//     }).error(function(){
//       deferred.reject('There was an error')
//     })
//     return deferred.promise;
//   }
//   return service;
// })


