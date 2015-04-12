"use strict"; 

angular.module('urlCheckApp.directives',[])
.directive('appFooter', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/footer.html'
  }
})

//http://stackoverflow.com/questions/17470790/how-to-use-a-keypress-event-in-angularjs
.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
})

.directive('searchUrl', function(){
  return {
    restrict: 'AE',
    scope: {
      title: '@',
      url: '@',
    },
    templateUrl: 'templates/searchURL.html',
    controller: function($scope, $element, omdbFactory){
      $scope.hideResults = false;
      $scope.urlDisplay = '';
      $scope.movie = '';
      $scope.searched = false;

      $scope.search = function(){
        if ($scope.movie.length == 0) {
          return null;
        }
        $scope.searched = true;
        var now = new Date();
        console.log("Search pressed: "+now);
        omdbFactory.setTitle($scope.movie);
        $scope.urlDisplay = omdbFactory.composeURL();
        omdbFactory.callURL()
          .then(function(data){
            $scope.data = data
          }, function(data){
            alert(data)
          })
      }

    }
  }
})
