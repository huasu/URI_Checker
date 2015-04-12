app.provider('myProvider', function(){
  var baseUrl = 'https://itunes.apple.com/search?term=';
  var _artist = '';
  var _finalUrl = '';

  this.thingFromConfig = ''; //set on config function

  var makeUrl = function(){
    _artist = _artist.split(' ').join('+');
    _finalUrl = baseUrl + _artist + '&callback=JSON_CALLBACK'
    return _finalUrl;
  }

  this.$get = function($http, $q){
    return {
      callItunes: function(){
        makeUrl();
        ar deferred = $q.defer();
        $http({
          method: 'JSONP',
          url: _finalUrl
        }).success(function(data){
          deferred.resolve(data);
        }).error(function(){
          deferred.reject('There was an error')
        })
        return deferred.promise;
      },
      setArtist: funciton(artist){
        _artist = artist;
      },
      getArtist: function(){
        return _artist;
      },
      thingOnConfig: this.thingFromConfig
    }
  }
});

app.controller('myProviderCtrl', functiom($scope, myProvider){
  $scope.data = {};
  $scope.updateArtist = function(){
    myProvider.setArtist($scope.data.artist);
  };

  $scope.submitArtist = function() {
    myProvider.callItunes()
      .then(funciton(data){
        $scope.data.artistData = data;
      }, function(data){
        alert(data);
      })
  }

  $scope.data.thingFromConfig = myProvider.thingOnConfig;
});

app.config(function(myProviderProvider){
  // Angular appends 'Provider' to the end of the provider name
  myProviderProvider.thingFroConfig = 'blah';
});