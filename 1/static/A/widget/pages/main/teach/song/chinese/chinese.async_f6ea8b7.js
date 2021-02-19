define('A:widget/pages/main/teach/song/chinese/chinese.async', function(require, exports, module) {

  return ['$rootScope', '$scope', 'webservice', 'globals', function ($rootScope, $scope, webservice, globals) {
  
    $rootScope.pageTitle = '大家一起唱中文儿歌';
    $rootScope.pageImage = globals.LOGO_IMAGE;
  
    $scope.list = [];
    $scope.busy = false;
    $scope.lazy = false;
    $scope.finish = false;
  
    var limit = 30;
    var count = 0;
    $scope.offset = count * limit;
  
    var language = 'chinese';
  
    $scope.loading = true;
    $scope.failing = false;
    $scope.empty = false;
    webservice.getSongList(language, limit, $scope.offset).then(function (res) {
      $scope.loading = false;
      var status = res.status;
      if (globals.STATUS_OK === status) {
        var items = res.data.list;
        for (var i = 0; i < items.length; i++) {
          items[i].language = language;
          $scope.list.push(items[i]);
        }
        count++;
        $scope.offset = count * limit;
      } else if (globals.SPECIFIC_ERROR === status) {
        $scope.empty = true;
      } else {
        $scope.failing = true;
      }
    }, function (res) {
      $scope.loading = false;
      $scope.failing = true;
      var res = res;
    });
  
    $scope.loadMore = function () {
      $scope.busy = true;
      $scope.lazy = false;
      $scope.finish = false;
      webservice.getSongList(language, limit, $scope.offset).then(function (res) {
        $scope.busy = false;
        var status = res.status;
        if (globals.STATUS_OK === status) {
          var items = res.data.list;
          for (var i = 0; i < items.length; i++) {
            items[i].language = language;
            $scope.list.push(items[i]);
          }
          count++;
          $scope.offset = count * limit;
        } else if (globals.SPECIFIC_ERROR === status) {
          $scope.finish = true;
        } else {
          $scope.lazy = true;
        }
      }, function (res) {
        $scope.busy = false;
        $scope.lazy = true;
        var res = res;
      });
    };
  
    $scope.$on('$destroy', function () {
      $scope.scrollDisabled = true;
    });
  
    if (!$scope.$$phase) {
      $scope.$apply();
    }
  }];
  

});
