return ['$scope', '$state', 'webservice', 'menuListService', 'dialogService', 'globals', 
	function ($scope, $state, webservice, menuListService, dialogService, globals) {

	$scope.action = {};

	$scope.action.menus = menuListService.get();
	if (0 === $scope.action.menus.length) {
		$scope.lazy = true;
	}

	$scope.addActionSubmit = function () {
		if ($scope.addActionForm.action_name.$invalid) {
			if ($scope.addActionForm.action_name.$error.required) {
				var tip = '权限名称不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.addActionForm.action_name.$error.maxlength) {
				var tip = '权限名称长度不能超过20个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		if ($scope.addActionForm.menu_id.$invalid) {
			if ($scope.addActionForm.menu_id.$error.required) {
				var tip = '菜单分类不能为空';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		if ($scope.addActionForm.action.$invalid) {
			if ($scope.addActionForm.action.$error.required) {
				var tip = '权限字符串不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.addActionForm.action.$error.maxlength) {
				var tip = '权限字符串长度不能超过30个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

    var action_name = $scope.action.action_name;
		var menu_id = $scope.action.menu_id;
		var action = $scope.action.action;

		var info = {
    	action_name: action_name,
    	menu_id: menu_id,
    	action: action
    };
    info = angular.toJson(info);

    var infoData = {
      info: info
    };

    $scope.$emit('BUSY');
    webservice.createAcitonRow(infoData).then(function (res) {
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

	function goActionList () {
		$state.go('main.auth.action.list');
	}

  if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
