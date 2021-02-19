return ['$scope', '$state', 'webservice', 'contentTypeService', 'dialogService', 'globals', 
	function ($scope, $state, webservice, contentTypeService, dialogService, globals) {

	$scope.menu = {};

	$scope.menu.types = contentTypeService.get();
	if (0 === $scope.menu.types.length) {
		$scope.lazy = true;
	}

	$scope.addMenuSubmit = function () {
		if ($scope.addMenuForm.menu_name.$invalid) {
			if ($scope.addMenuForm.menu_name.$error.required) {
				var tip = '菜单名称不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.addMenuForm.menu_name.$error.maxlength) {
				var tip = '菜单名称长度不能超过20个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		if ($scope.addMenuForm.content_type.$invalid) {
			if ($scope.addMenuForm.content_type.$error.required) {
				var tip = '内容分类不能为空';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		var menu_name = $scope.menu.menu_name;
		var tid = $scope.menu.tid;

		var info = {
    	menu_name: menu_name,
    	tid: tid
    };
    info = angular.toJson(info);

    var infoData = {
      info: info
    };

    $scope.$emit('BUSY');
    webservice.createMenuRow(infoData).then(function (res) {
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

	function goMenuList () {
		$state.go('main.auth.menu.list');
	}

  if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
