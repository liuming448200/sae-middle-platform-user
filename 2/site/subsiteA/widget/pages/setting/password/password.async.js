return ['$rootScope', '$scope', '$state', 'webservice', 'dialogService', 'globals', 
  function ($rootScope, $scope, $state, webservice, dialogService, globals) {

  $rootScope.pageTitle = '修改密码';
  $rootScope.pageImage = globals.LOGO_IMAGE;

  $scope.changePasswordSubmit = function () {
    if ($scope.changePasswordForm.oldpassword.$invalid) {
      if ($scope.changePasswordForm.oldpassword.$error.required) {
        var tip = '当前密码不能为空';
        $scope.$emit('TOAST', {msg: tip});
      } else if ($scope.changePasswordForm.oldpassword.$error.minlength) {
        var tip = '当前密码长度不能少于6个字符';
        $scope.$emit('TOAST', {msg: tip});
      } else if ($scope.changePasswordForm.oldpassword.$error.maxlength) {
        var tip = '当前密码长度不能超过16个字符';
        $scope.$emit('TOAST', {msg: tip});
      }

      return;
    }

    if ($scope.changePasswordForm.newpassword.$invalid) {
      if ($scope.changePasswordForm.newpassword.$error.required) {
        var tip = '新密码不能为空';
        $scope.$emit('TOAST', {msg: tip});
      } else if ($scope.changePasswordForm.newpassword.$error.minlength) {
        var tip = '新密码长度不能少于6个字符';
        $scope.$emit('TOAST', {msg: tip});
      } else if ($scope.changePasswordForm.newpassword.$error.maxlength) {
        var tip = '新密码长度不能超过16个字符';
        $scope.$emit('TOAST', {msg: tip});
      }

      return;
    }

    if ($scope.changePasswordForm.password.$invalid) {
      if ($scope.changePasswordForm.password.$error.required) {
        var tip = '重复新密码不能为空';
        $scope.$emit('TOAST', {msg: tip});
      } else if ($scope.changePasswordForm.password.$error.minlength) {
        var tip = '重复新密码长度不能少于6个字符';
        $scope.$emit('TOAST', {msg: tip});
      } else if ($scope.changePasswordForm.password.$error.maxlength) {
        var tip = '重复新密码长度不能超过16个字符';
        $scope.$emit('TOAST', {msg: tip});
      }

      return;
    }

    var oldpassword = $scope.oldpassword;
    var newpassword = $scope.newpassword;
    var password = $scope.password;

    if (oldpassword === newpassword) {
      var tip = '旧密码和新密码不能相同，请重新输入';
      $scope.$emit('TOAST', {msg: tip});

      return;
    }

    if (password !== newpassword) {
      var tip = '两次输入的新密码不相同，请重新输入';
      $scope.$emit('TOAST', {msg: tip});

      return;
    }

    $scope.$emit("BUSY");
    webservice.changePassword(oldpassword, newpassword).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      var tip = res.message;
      if (globals.STATUS_OK === status) {
        webservice.logout().then(function (res) {
          var status = res.status;
          var tip = res.message;
          if (globals.STATUS_OK === status) {
            $rootScope.user = undefined;
            tip = '密码修改成功，请重新登录';
            dialogService.dialog(tip, goLogin, true);
          } else {
            $scope.$emit('TOAST', {msg: tip});
          }
        }, function (res) {
          $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
          var res = res;
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

  function goLogin () {
    $state.go('login');
  }

  if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
