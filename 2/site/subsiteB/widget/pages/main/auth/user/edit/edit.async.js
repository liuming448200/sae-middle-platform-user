return ['$scope', '$stateParams', '$state', 'webservice', 'dialogService', 'globals', 'usergroupListService', 
  function ($scope, $stateParams, $state, webservice, dialogService, globals, usergroupListService) {

  var uid = $stateParams.uid || '';

  $scope.loading = true;
  $scope.failing = false;
  $scope.empty = false;
  webservice.userInfo(uid).then(function (res) {
    $scope.loading = false;
    var status = res.status;
    if (globals.STATUS_OK === status) {
      $scope.admin = res.data;
      $scope.admin.allUsergroups = usergroupListService.get();
      if (0 === $scope.admin.allUsergroups.length) {
        $scope.lazy = true;
      } else {
        for (var i = 0, len = $scope.admin.allUsergroups.length; i < len; i++) {
          var usergroup = $scope.admin.allUsergroups[i];
          usergroup.selected = false;
          for (var j = 0, l = $scope.admin.usergroups.length; j < l; j++) {
            var selectedUsergroup = $scope.admin.usergroups[j];
            if (selectedUsergroup.group_id === usergroup.group_id) {
              usergroup.selected = true;
              break;
            }
          }
        }
      }
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

  $scope.editUserSubmit = function () {
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

    var usergroups = selectedUsergroups.join(',');

    $scope.$emit('BUSY');
    webservice.setUserInfo(uid, usergroups).then(function (res) {
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
  };

  function goUserList () {
    $state.go('main.auth.user.list');
  }

  if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
