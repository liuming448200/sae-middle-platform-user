return ['$rootScope', '$scope', 'globals', function ($rootScope, $scope, globals) {

	$rootScope.pageTitle = '活动订单列表';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	$scope.toggle = function () {
		$scope.toggleFlag = !$scope.toggleFlag;
	};

	$scope.select = function () {
		$scope.toggleFlag = false;
	};

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
