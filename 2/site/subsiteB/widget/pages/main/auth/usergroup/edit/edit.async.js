return ['$scope', '$stateParams', '$state', 'webservice', 'actionListService', 'userListService', 'dialogService', 'globals', 
	function ($scope, $stateParams, $state, webservice, actionListService, userListService, dialogService, globals) {

	var group_id = $stateParams.group_id || '';

	$scope.loading = true;
  $scope.failing = false;
  $scope.empty = false;
  webservice.getUsergroupRow(group_id).then(function (res) {
		$scope.loading = false;
    var status = res.status;
    if (globals.STATUS_OK === status) {
    	$scope.usergroup = res.data;
    	$scope.usergroup.allActions = actionListService.get();
    	if (0 === $scope.usergroup.allActions.length) {
				$scope.lazy = true;
			} else {
				for (var i = 0, len = $scope.usergroup.allActions.length; i < len; i++) {
					var Action = $scope.usergroup.allActions[i];
					Action.selected = false;
					for (var j = 0, l = $scope.usergroup.actions.length; j < l; j++) {
						var selectedAction = $scope.usergroup.actions[j];
						if (selectedAction.action === Action.action) {
							Action.selected = true;
							break;
						}
					}
				}
			}
			$scope.usergroup.allUsers = userListService.get();
			if (0 === $scope.usergroup.allUsers.length) {
				$scope.relax = true;
			} else {
				for (var i = 0, len = $scope.usergroup.allUsers.length; i < len; i++) {
					var user = $scope.usergroup.allUsers[i];
					user.selected = false;
					for (var j = 0, l = $scope.usergroup.users.length; j < l; j++) {
						var selectedUser = $scope.usergroup.users[j];
						if (selectedUser.uid === user.uid) {
							user.selected = true;
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

	$scope.editUsergroupSubmit = function () {
		var group_name = $scope.usergroup.group_name;
		var group_info = $scope.usergroup.group_info;

		if (!group_name) {
			var tip = '用户组名称不能为空';
			$scope.$emit('TOAST', {msg: tip});
			return;
		} else if (group_name.length > 20) {
			var tip = '用户组名称长度不能超过20个字符';
			$scope.$emit('TOAST', {msg: tip});
			return;
		}

		if (!group_info) {
			var tip = '用户组信息不能为空';
			$scope.$emit('TOAST', {msg: tip});
			return;
		} else if (group_info.length > 30) {
			var tip = '用户组信息长度不能超过30个字符';
			$scope.$emit('TOAST', {msg: tip});
			return;
		}

		var selectedActions = [];
		angular.forEach($scope.usergroup.allActions, function (action) {
			if (action.selected) {
				var newAction = action.action;
				selectedActions.push(newAction);
			}
		});

		if (0 === selectedActions.length) {
			var tip = '请至少选择一项权限';
			$scope.$emit('TOAST', {msg: tip});
			return;
		}

		var selectedUsers = [];
		angular.forEach($scope.usergroup.allUsers, function (user) {
			if (user.selected) {
				var newUser = user.uid;
				selectedUsers.push(newUser);
			}
		});

		var actions = selectedActions.join(',');

		var uids = selectedUsers.join(',');

		var info = {
    	group_name: group_name,
    	group_info: group_info,
    	actions: actions,
    	uids: uids
    };
    info = angular.toJson(info);

    var infoData = {
    	group_id: group_id,
      info: info
    };

    $scope.$emit('BUSY');
    webservice.updateUsergroupRow(infoData).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      var tip = res.message;
      if (globals.STATUS_OK === status) {
        dialogService.dialog(tip, goUsergroupList, true);
      } else {
        $scope.$emit('TOAST', {msg: tip});
      }
    }, function (res) {
      $scope.$emit('NOTBUSY');
      $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
      var res = res;
    });
	};

	$scope.deleteUsergroup = function () {
		var group_name = $scope.usergroup.group_name || '';
    var tip = '确定删除' + group_name + '吗？';
    dialogService.dialog(tip, delUsergroup);
	};

	function goUsergroupList () {
		$state.go('main.auth.usergroup.list');
	}

	function delUsergroup () {
		$scope.$emit('BUSY');
    webservice.deleteUsergroupRow(group_id).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      if (globals.STATUS_OK === status) {
        $state.go('main.auth.usergroup.list');
      } else {
        var tip = res.message;
        $scope.$emit('TOAST', {msg: tip});
      }
    }, function (res) {
      $scope.$emit('NOTBUSY');
      $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
      var res = res;
    });
	}

  if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
