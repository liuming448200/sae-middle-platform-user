return ['$rootScope', '$scope', '$state', 'webservice', 'globals', 
  function ($rootScope, $scope, $state, webservice, globals) {

  $rootScope.pageTitle = '方向教育';
  $rootScope.pageImage = globals.LOGO_IMAGE;

  if ($rootScope.user) {
    $scope.isLogin = true;
  } else {
    $scope.isLogin = false;
  }

  $scope.exit = function () {
    $scope.$emit("BUSY");
    webservice.logout().then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      var tip = res.message;
      if (globals.STATUS_OK === status) {
        $rootScope.user = undefined;
        $state.go('login');
      } else {
        $scope.$emit('TOAST', {msg: tip});
      }
    }, function (res) {
      $scope.$emit('NOTBUSY');
      $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
      var res = res;
    });
  };

  $scope.go = function () {
    $state.go('setting.me', {from: $state.current.name});
  };

  if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
