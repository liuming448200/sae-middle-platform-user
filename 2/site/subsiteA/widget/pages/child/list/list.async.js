return ['$rootScope', '$scope', '$state', 'webservice', 'globals', function ($rootScope, $scope, $state, webservice, globals) {

  $rootScope.pageTitle = '查看孩子信息';
  $rootScope.pageImage = globals.LOGO_IMAGE;

  $scope.list = [];
  $scope.loading = true;
  $scope.failing = false;
  $scope.empty = false;

  var limit = 10;
  var count = 0;
  $scope.offset = count * limit;

  webservice.getChildInfoList().then(function (res) {
    $scope.loading = false;
    var status = res.status;
    var tip = res.message;
    if (globals.STATUS_OK === status) {
      var items = res.data.list;
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (!!item.head_portrait) {
          item.head_portrait = webservice.downloadFile(item.head_portrait);
        }
        $scope.list.push(item);
      }
      count++;
      $scope.offset = count * limit;
    } else if (globals.SPECIFIC_ERROR === status) {
      $scope.empty = true;
      $state.go('child.add', {from: $state.current.name, current: 1});
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
    webservice.getChildInfoList(limit, $scope.offset).then(function (res) {
      $scope.busy = false;
      var status = res.status;
      if (globals.STATUS_OK === status) {
        var items = res.data.list;
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          if (!!item.head_portrait) {
            item.head_portrait = webservice.downloadFile(item.head_portrait);
          }
          $scope.list.push(item);
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
