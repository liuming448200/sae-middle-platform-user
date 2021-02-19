return ['$scope', '$state', 'webservice', 'dialogService', 'globals', 
	function ($scope, $state, webservice, dialogService, globals) {

	$scope.addContentSubmit = function () {
		if ($scope.addContentForm.typename.$invalid) {
			if ($scope.addContentForm.typename.$error.required) {
				var tip = '内容名称不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.addContentForm.typename.$error.maxlength) {
				var tip = '内容名称长度不能超过10个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		var typename = $scope.content.typename;

		var info = {
    	typename: typename
    };
    info = angular.toJson(info);

    var infoData = {
      info: info
    };

    $scope.$emit('BUSY');
    webservice.createContentRow(infoData).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      var tip = res.message;
      if (globals.STATUS_OK === status) {
        dialogService.dialog(tip, goContentList, true);
      } else {
        $scope.$emit('TOAST', {msg: tip});
      }
    }, function (res) {
      $scope.$emit('NOTBUSY');
      $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
      var res = res;
    });
	};

	function goContentList () {
		$state.go('main.base.content.list');
	}

  if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
