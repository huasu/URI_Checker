"use strict"; 

angular.module('urlCheckApp.services',[])
.factory('omdbFactory', function($http, $q){
  var service = {};
  var _baseurl = 'http://www.omdbapi.com/?';
  var _title = '';
  var _type = 'json';
  var _method = 'JSONP';
  // var _method = 'JSON';
  var _finalUrl;
// http://www.omdbapi.com/?t=buffy&y=&plot=short&r=json

  var makeUrl = function(){
    _title = _title.split(' ').join('+');
    _finalUrl = _baseurl + 't=' + _title + '&r=' + _type+'&callback=JSON_CALLBACK';
    return _finalUrl; 
  }

  service.composeURL = function(){
    return makeUrl();
  }
  
  service.setTitle = function(title){
    _title = title;
  }

  service.getTitle = function(){
    return _title;
  }

  service.setMethod = function(method){
    _method = method;
  }

  service.getMethod = function(method){
    return method;
  }

  service.callURL = function(){
    makeUrl();
    var deferred = $q.defer();
    $http({
      method: _method,
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


