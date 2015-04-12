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
/**
 * Section for searching the Open Movie Database for movies
 */
.directive('searchOmdb', function(){
  return {
    restrict: 'AE',
    scope: {
      title: '@',
      url: '@',
    },
    templateUrl: 'templates/searchByQuery.html',
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
/**
 * Generic retreival of URLs
 * if the http method is jsonp, the callback will be added.
 */
.directive('searchUrl', function(){
  return {
    restrict: 'AE',
    scope: {
      title: '@',
    },
    templateUrl: 'templates/searchByURL.html',
    controller: function($scope, $element, urlFactory){
      $scope.hideResults = false;
      $scope.searched = false;
      $scope.url = '';
      $scope.urlDisplay = '';
      $scope.methodsList = ['get', 'head', 'jsonp'];
      $scope.method = urlFactory.getMethod();

      $scope.updateMethod = function(){
        urlFactory.setMethod($scope.method);
        this.updateURL();
      };

      $scope.updateURL = function(){
        $scope.urlDisplay = $scope.url;
        if ($scope.method == 'jsonp' && 
            $scope.url.indexOf("callback=JSON_CALLBACK") === -1){
              $scope.urlDisplay = $scope.urlDisplay+"&callback=JSON_CALLBACK";
        }
      };

      $scope.search = function(){
        if ($scope.url.length == 0) {
          return null;
        }
        $scope.searched = true;

        // var now = new Date();
        // console.log("Search pressed: "+now);

        urlFactory.callURL($scope.url)
          .then(function(data){
            $scope.data = data
          }, function(data){
            alert(data)
          })
      }

    }
  }
})
