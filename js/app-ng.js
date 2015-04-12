"use strict"; 

angular.module('urlCheckApp',[
  'urlCheckApp.directives',
  'urlCheckApp.services'
])
.controller('appCtrl', ['$scope', function($scope){
   $scope.date = new Date();
}])

