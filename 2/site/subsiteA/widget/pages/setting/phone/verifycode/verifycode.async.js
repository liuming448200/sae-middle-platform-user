return ['$rootScope', '$scope', '$stateParams', '$state', 'webservice', 'globals', 'checkMobileService', 'checkMobileVerifyCodeService', 
  function ($rootScope, $scope, $stateParams, $state, webservice, globals, checkMobileService, checkMobileVerifyCodeService) {

  $rootScope.pageTitle = '发送手机验证码';
  $rootScope.pageImage = globals.LOGO_IMAGE;

  var mobileExist = checkMobileService.get();
  if (!!mobileExist) {
    $state.go('setting.phone');
    return;
  }

  checkMobileService.set(true);

  $scope.mobile = $stateParams.mobile;

  webservice.sendSMS($scope.mobile).then(function (res) {
    var status = res.status;
    var tip = res.message;
    if (globals.STATUS_OK !== status) {
      $scope.$emit('TOAST', {msg: tip});
    }
  }, function (res) {
    $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
    var res = res;
  });

  $scope.checkVerifyCodeSubmit = function () {
    if ($scope.checkVerifyCodeForm.verifyCode.$invalid) {
      if ($scope.checkVerifyCodeForm.verifyCode.$error.required) {
        var tip = '手机验证码不能为空';
        $scope.$emit('TOAST', {msg: tip});
      } else if ($scope.checkVerifyCodeForm.verifyCode.$error.minlength) {
        var tip = '手机验证码长度不能少于6个字符';
        $scope.$emit('TOAST', {msg: tip});
      } else if ($scope.checkVerifyCodeForm.verifyCode.$error.maxlength) {
        var tip = '手机验证码长度不能超过6个字符';
        $scope.$emit('TOAST', {msg: tip});
      }

      return;
    }

    var verifyCode = $scope.verifyCode;

    $scope.$emit("BUSY");
    webservice.verifySMS($scope.mobile, verifyCode).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      var tip = res.message;
      if (globals.STATUS_OK === status) {
        checkMobileVerifyCodeService.set(true);
        $state.go('setting.phone.changemobile', {
          mobile: $scope.mobile
        });
      } else {
        $scope.$emit('TOAST', {msg: tip});
      }
    }, function (res) {
      $scope.$emit('NOTBUSY');
      $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
      var res = res;
    });
  };

  if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
