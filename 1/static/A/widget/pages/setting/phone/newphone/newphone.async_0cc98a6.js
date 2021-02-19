define('A:widget/pages/setting/phone/newphone/newphone.async', function(require, exports, module) {

  return ['$rootScope', '$scope', '$state', 'webservice', 'globals', 'checkMobileService', 
    function ($rootScope, $scope, $state, webservice, globals, checkMobileService) {
  
    $rootScope.pageTitle = '新手机号码';
    $rootScope.pageImage = globals.LOGO_IMAGE;
  
    $scope.checkMobileSubmit = function () {
      if ($scope.checkMobileForm.mobile.$invalid) {
        if ($scope.checkMobileForm.mobile.$error.required) {
          var tip = '手机号码不能为空';
          $scope.$emit('TOAST', {msg: tip});
        } else if ($scope.checkMobileForm.mobile.$error.minlength) {
          var tip = '手机号码长度不能少于11个字符';
          $scope.$emit('TOAST', {msg: tip});
        } else if ($scope.checkMobileForm.mobile.$error.maxlength) {
          var tip = '手机号码长度不能超过11个字符';
          $scope.$emit('TOAST', {msg: tip});
        }
  
        return;
      }
  
      var mobile = $scope.mobile;
  
      $scope.$emit("BUSY");
      webservice.mobileCheckExist(mobile).then(function (res) {
        $scope.$emit('NOTBUSY');
        var status = res.status;
        var tip = res.message;
        if (globals.STATUS_OK === status) {
          checkMobileService.set(false);
          $state.go('setting.phone.verifycode', {
            mobile: mobile
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
  

});
