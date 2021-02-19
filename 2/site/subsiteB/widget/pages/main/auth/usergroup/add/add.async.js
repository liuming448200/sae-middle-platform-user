return ['$scope', '$state', 'webservice', 'actionListService', 'userListService', 'dialogService', 'globals', 
	function ($scope, $state, webservice, actionListService, userListService, dialogService, globals) {

	$scope.usergroup = {};

	$scope.usergroup.allActions = actionListService.get();
	if (0 === $scope.usergroup.allActions.length) {
		$scope.lazy = true;
	} else {
		angular.forEach($scope.usergroup.allActions, function (action) {
			action.selected = false;
		});
	}

	$scope.usergroup.allUsers = userListService.get();
	if (0 === $scope.usergroup.allUsers.length) {
		$scope.relax = true;
	} else {
		angular.forEach($scope.usergroup.allUsers, function (user) {
			user.selected = false;
		});
	}

	$scope.addUsergroupSubmit = function () {
		if ($scope.addUsergroupForm.group_name.$invalid) {
			if ($scope.addUsergroupForm.group_name.$error.required) {
				var tip = '用户组名称不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.addUsergroupForm.group_name.$error.maxlength) {
				var tip = '用户组名称长度不能超过20个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		if ($scope.addUsergroupForm.group_info.$invalid) {
			if ($scope.addUsergroupForm.group_info.$error.required) {
				var tip = '用户组信息不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.addUsergroupForm.group_info.$error.maxlength) {
				var tip = '用户组信息长度不能超过30个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

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

		var group_name = $scope.usergroup.group_name;
		var group_info = $scope.usergroup.group_info;

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
      info: info
    };

		$scope.$emit('BUSY');
    webservice.createUsergroupRow(infoData).then(function (res) {
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

	function goUsergroupList () {
		$state.go('main.auth.usergroup.list');
	}

  if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
