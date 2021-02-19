return ['$scope', '$stateParams', '$state', 'webservice', 'dialogService', 'globals', 'usergroupListService', 
  function ($scope, $stateParams, $state, webservice, dialogService, globals, usergroupListService) {

  $scope.admin = {};

  $scope.admin.allUsergroups = usergroupListService.get();
  if (0 === $scope.admin.allUsergroups.length) {
    $scope.lazy = true;
  } else {
    angular.forEach($scope.admin.allUsergroups, function (usergroup) {
      usergroup.selected = false;
    });
  }

  $scope.addUserSubmit = function () {
    if ($scope.addUserForm.mobile.$invalid) {
      if ($scope.addUserForm.mobile.$error.required) {
        var tip = '手机号码不能为空';
        $scope.$emit('TOAST', {msg: tip});
      } else if ($scope.addUserForm.mobile.$error.minlength) {
        var tip = '手机号码长度不能少于11个字符';
        $scope.$emit('TOAST', {msg: tip});
      } else if ($scope.addUserForm.mobile.$error.maxlength) {
        var tip = '手机号码长度不能超过11个字符';
        $scope.$emit('TOAST', {msg: tip});
      }

      return;
    }

    if ($scope.addUserForm.username.$invalid) {
      if ($scope.addUserForm.username.$error.required) {
        var tip = '用户名不能为空';
        $scope.$emit('TOAST', {msg: tip});
      } else if ($scope.addUserForm.username.$error.minlength) {
        var tip = '用户名长度不能少于6个字符';
        $scope.$emit('TOAST', {msg: tip});
      } else if ($scope.addUserForm.username.$error.maxlength) {
        var tip = '用户名长度不能超过16个字符';
        $scope.$emit('TOAST', {msg: tip});
      }

      return;
    }

    if ($scope.addUserForm.password.$invalid) {
      if ($scope.addUserForm.password.$error.required) {
        var tip = '密码不能为空';
        $scope.$emit('TOAST', {msg: tip});
      } else if ($scope.addUserForm.password.$error.minlength) {
        var tip = '密码长度不能少于6个字符';
        $scope.$emit('TOAST', {msg: tip});
      } else if ($scope.addUserForm.password.$error.maxlength) {
        var tip = '密码长度不能超过16个字符';
        $scope.$emit('TOAST', {msg: tip});
      }

      return;
    }

    var selectedUsergroups = [];
    angular.forEach($scope.admin.allUsergroups, function (usergroup) {
      if (usergroup.selected) {
        var newUsergroup = usergroup.group_id;
        selectedUsergroups.push(newUsergroup);
      }
    });

    if (0 === selectedUsergroups.length) {
      var tip = '请至少选择一个用户组';
      $scope.$emit('TOAST', {msg: tip});
      return;
    }

    var mobile = $scope.admin.mobile;
    var username = $scope.admin.username;
    var password = $scope.admin.password;

    var usergroups = selectedUsergroups.join(',');

    $scope.$emit('BUSY');
    webservice.addUser(mobile, username, password, usergroups).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      var tip = res.message;
      if (globals.STATUS_OK === status) {
        dialogService.dialog(tip, goUserList, true);
      } else {
        $scope.$emit('TOAST', {msg: tip});
      }
    }, function (res) {
      $scope.$emit('NOTBUSY');
      $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
      var res = res;
    });

    function goUserList () {
      $state.go('main.auth.user.list');
    }
  };

  if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
