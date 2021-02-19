return ['$rootScope', '$scope', '$stateParams', '$state', 'webservice', 'dialogService', 'globals', 'checkMobileVerifyCodeService', 
  function ($rootScope, $scope, $stateParams, $state, webservice, dialogService, globals, checkMobileVerifyCodeService) {

  $rootScope.pageTitle = '修改手机号码';
  $rootScope.pageImage = globals.LOGO_IMAGE;

  var verifyCodeChecked = checkMobileVerifyCodeService.get();
  if (!verifyCodeChecked) {
    $state.go('setting.phone');
    return;
  }

  checkMobileVerifyCodeService.set(false);

  $scope.mobile = $stateParams.mobile;

  $scope.changeMobileSubmit = function () {
    $scope.$emit("BUSY");
    webservice.changeMobile($scope.mobile).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      var tip = res.message;
      if (globals.STATUS_OK === status) {
        $rootScope.user.mobile = $scope.mobile;
        dialogService.dialog(tip, goSetting, true);
      } else {
        $scope.$emit('TOAST', {msg: tip});
      }
    }, function (res) {
      $scope.$emit('NOTBUSY');
      $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
      var res = res;
    });
  };

  function goSetting () {
    $state.go('setting');
  }

  if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
