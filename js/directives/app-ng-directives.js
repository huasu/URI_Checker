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
      $scope.finalUrl = '';
      $scope.methodsList = ['get', 'head', 'jsonp'];
      $scope.method = urlFactory.getMethod();

      $scope.updateMethod = function(){
        urlFactory.setMethod($scope.method);
        this.updateURL();
      };

      $scope.updateURL = function(){
        $scope.finalUrl = $scope.url;
        if ($scope.method == 'jsonp' && 
            $scope.url.indexOf("callback=JSON_CALLBACK") === -1){
              $scope.finalUrl = $scope.finalUrl+"&callback=JSON_CALLBACK";
        }
      };

      $scope.search = function(){
        if ($scope.url.length == 0) {
          return null;
        }
        $scope.searched = true;

        // var now = new Date();
        // console.log("Search pressed: "+now);

        urlFactory.callURL($scope.finalUrl)
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
 * Section for searching the Open Movie Database for movies
 */
.directive('searchOmdb', function(){
  return {
    restrict: 'AE',
    scope: {
      title: '@',
      url: '@',
      queryname: '@'
    },

    templateUrl: 'templates/searchByQuery.html',
    controller: function($scope, $element, urlFactory){
      $scope.hideResults = false;
      $scope.url = '';
      $scope.query = '';
      $scope.searched = false;
      $scope.baseurl = 'http://www.omdbapi.com/?';
      $scope.type = 'JSONP';

      $scope.updateURL = function(){
        if ($scope.query.length === 0) {
          this.url = '';
        }
        var title = this.query.split(' ').join('+');
        this.url  = this.baseurl + 't=' + title + '&r=json&callback=JSON_CALLBACK';
      };

      $scope.search = function(){
        if ($scope.query.length == 0) {
          return null;
        }
        $scope.searched = true;
        // var now = new Date();
        // console.log("Search pressed: "+now);

        urlFactory.callURL(this.url)
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
 * Section for searching the Open Movie Database for movies
 * http://www.broadbandmap.gov/developer/api/demographics-api-by-geography-type-and-geography-name
 * http://www.broadbandmap.gov/broadbandmap/demographic/jun2014/county/names/montgomery?format=jsonp&callback=JSON_CALLBACK
 */
.directive('searchNatbrmap', function(){
  return {
    restrict: 'AE',
    scope: {
      title: '@',
      url: '@',
      queryname: '@'
    },

    templateUrl: 'templates/searchByQuery.html',
    controller: function($scope, $element, urlFactory){
      $scope.hideResults = false;
      $scope.url = '';
      $scope.query = '';
      $scope.searched = false;
      $scope.baseurl = 'http://www.broadbandmap.gov/broadbandmap/demographic/jun2014/county/names/';
      $scope.type = 'JSONP';

      $scope.updateURL = function(){
        if ($scope.query.length === 0) {
          this.url = '';
        }
        var title = this.query.split(' ').join('+');
        this.url  = this.baseurl + this.query + '?format=jsonp&callback=JSON_CALLBACK';
      };

      $scope.search = function(){
        if ($scope.query.length == 0) {
          return null;
        }
        $scope.searched = true;
        // var now = new Date();
        // console.log("Search pressed: "+now);

        urlFactory.callURL(this.url)
          .then(function(data){
            $scope.data = data
          }, function(data){
            alert(data)
          })
      }

    }
  }
})
