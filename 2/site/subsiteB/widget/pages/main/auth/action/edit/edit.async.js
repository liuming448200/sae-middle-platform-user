return ['$scope', '$stateParams', '$state', 'webservice', 'menuListService', 'dialogService', 'globals', 
	function ($scope, $stateParams, $state, webservice, menuListService, dialogService, globals) {

	var action_id = $stateParams.action_id || '';

	$scope.loading = true;
  $scope.failing = false;
  $scope.empty = false;
  webservice.getActionRow(action_id).then(function (res) {
		$scope.loading = false;
    var status = res.status;
    if (globals.STATUS_OK === status) {
    	$scope.action = res.data;
    	$scope.action.menus = menuListService.get();
    	if (0 === $scope.action.menus.length) {
				$scope.lazy = true;
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

	$scope.editActionSubmit = function () {
		var action_name = $scope.action.action_name;
		var menu_id = $scope.action.menu_id;
		var action = $scope.action.action;

		if (!action_name) {
			var tip = '权限名称不能为空';
			$scope.$emit('TOAST', {msg: tip});
			return;
		} else if (action_name.length > 20) {
			var tip = '权限名称长度不能超过20个字符';
			$scope.$emit('TOAST', {msg: tip});
			return;
		}

		if ($scope.lazy) {
      var tip = '菜单分类列表不能为空';
      $scope.$emit('TOAST', {msg: tip});
      return;
    }

    if (!menu_id) {
			var tip = '菜单分类不能为空';
			$scope.$emit('TOAST', {msg: tip});
			return;
		}

		if (!action) {
			var tip = '权限字符串不能为空';
			$scope.$emit('TOAST', {msg: tip});
			return;
		} else if (action.length > 30) {
			var tip = '权限字符串长度不能超过30个字符';
			$scope.$emit('TOAST', {msg: tip});
			return;
		}

    var info = {
    	action_name: action_name,
    	menu_id: menu_id,
    	action: action
    };
    info = angular.toJson(info);

    var infoData = {
    	action_id: action_id,
      info: info
    };

    $scope.$emit('BUSY');
    webservice.updateActionRow(infoData).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      var tip = res.message;
      if (globals.STATUS_OK === status) {
        dialogService.dialog(tip, goActionList, true);
      } else {
        $scope.$emit('TOAST', {msg: tip});
      }
    }, function (res) {
      $scope.$emit('NOTBUSY');
      $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
      var res = res;
    });
	};

	$scope.deleteAction = function () {
		var action_name = $scope.action.action_name || '';
    var tip = '确定删除' + action_name + '吗？';
    dialogService.dialog(tip, delAction);
	};

	function goActionList () {
		$state.go('main.auth.action.list');
	}

	function delAction () {
		$scope.$emit('BUSY');
    webservice.deleteActionRow(action_id).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      if (globals.STATUS_OK === status) {
        $state.go('main.auth.action.list');
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
