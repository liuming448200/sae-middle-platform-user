return ['$scope', '$stateParams', '$state', 'webservice', 'contentTypeService', 'dialogService', 'globals', 
	function ($scope, $stateParams, $state, webservice, contentTypeService, dialogService, globals) {

	var menu_id = $stateParams.menu_id || '';

	$scope.loading = true;
  $scope.failing = false;
  $scope.empty = false;
  webservice.getMenuRow(menu_id).then(function (res) {
		$scope.loading = false;
    var status = res.status;
    if (globals.STATUS_OK === status) {
    	$scope.menu = res.data;
    	$scope.menu.types = contentTypeService.get();
    	if (0 === $scope.menu.types.length) {
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

	$scope.editMenuSubmit = function () {
		var menu_name = $scope.menu.menu_name;
		var tid = $scope.menu.tid;

		if (!menu_name) {
			var tip = '菜单名称不能为空';
			$scope.$emit('TOAST', {msg: tip});
			return;
		} else if (menu_name.length > 20) {
			var tip = '菜单名称长度不能超过20个字符';
			$scope.$emit('TOAST', {msg: tip});
			return;
		}

    if ($scope.lazy) {
      var tip = '内容分类列表不能为空';
      $scope.$emit('TOAST', {msg: tip});
      return;
    }

		if (!tid) {
			var tip = '内容分类不能为空';
			$scope.$emit('TOAST', {msg: tip});
			return;
		}

		var info = {
    	menu_name: menu_name,
    	tid: tid
    };
    info = angular.toJson(info);

    var infoData = {
    	menu_id: menu_id,
      info: info
    };

    $scope.$emit('BUSY');
    webservice.updateMenuRow(infoData).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      var tip = res.message;
      if (globals.STATUS_OK === status) {
        dialogService.dialog(tip, goMenuList, true);
      } else {
        $scope.$emit('TOAST', {msg: tip});
      }
    }, function (res) {
      $scope.$emit('NOTBUSY');
      $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
      var res = res;
    });
	};

	$scope.deleteMenu = function () {
		var menu_name = $scope.menu.menu_name || '';
    var tip = '确定删除' + menu_name + '吗？';
    dialogService.dialog(tip, delMenu);
	};

	function goMenuList () {
		$state.go('main.auth.menu.list');
	}

	function delMenu () {
		$scope.$emit('BUSY');
    webservice.deleteMenuRow(menu_id).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      if (globals.STATUS_OK === status) {
        $state.go('main.auth.menu.list');
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
