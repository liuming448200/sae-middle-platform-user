return ['$rootScope', '$scope', '$state', 'webservice', 'globals', 
  function ($rootScope, $scope, $state, webservice, globals) {

  $rootScope.pageTitle = '方向教育';
  $rootScope.pageImage = globals.LOGO_IMAGE;

  var defaultUserInfo = {
    nickname: '家长您好',
    head_portrait: __uri('static/images/portrait.png')
  };

  var defaultChildInfo = {
    nickname: '我们将和您一起帮助孩子找到适合自己的发展方向',
    birthday: undefined
  };

  $scope.head_portrait = defaultUserInfo.head_portrait;

  if ($rootScope.user) {
    $scope.userInfo = angular.copy($rootScope.user.extra);
    if (!$scope.userInfo.nickname) {
      webservice.getUserInfoMoreRow().then(function (res) {
        var status = res.status;
        var tip = res.message;
        if (globals.STATUS_OK === status) {
          $scope.userInfo = res.data;
          $rootScope.user.extra = $scope.userInfo;
          if ($scope.userInfo.head_portrait) {
            $scope.head_portrait = webservice.downloadFile($scope.userInfo.head_portrait);
          } else {
            $scope.head_portrait = __uri('static/images/portrait.png');
          }
        } else {
          $scope.userInfo = defaultUserInfo;
        }
      }, function (res) {
        $scope.userInfo = defaultUserInfo;
        $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
        var res = res;
      });
    } else {
      if ($scope.userInfo.head_portrait) {
        $scope.head_portrait = webservice.downloadFile($scope.userInfo.head_portrait);
      } else {
        $scope.head_portrait = __uri('static/images/portrait.png');
      }
    }

    $scope.childInfo = angular.copy($rootScope.user.child);
    if (!$scope.childInfo.cid) {
      webservice.getChildInfoRow().then(function (res) {
        var status = res.status;
        var tip = res.message;
        if (globals.STATUS_OK === status) {
          $scope.childInfo = res.data;
          $rootScope.user.child = $scope.childInfo;
        } else if (globals.SPECIFIC_ERROR === status) {
          $scope.childInfo = defaultChildInfo;
        } else {
          $scope.childInfo = defaultChildInfo;
        }
      }, function (res) {
        $scope.childInfo = defaultChildInfo;
        $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
        var res = res;
      });
    }
  } else {
    $scope.userInfo = defaultUserInfo;
    $scope.childInfo = defaultChildInfo;
  }

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
