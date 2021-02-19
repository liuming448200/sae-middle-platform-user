return ['$rootScope', '$scope', '$state', 'globals', function ($rootScope, $scope, $state, globals) {

	$rootScope.pageTitle = '支付成功';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	$scope.goCourse = function () {
		$state.go('institution.course');
	};

	$scope.goActivity = function () {
		$state.go('institution.activity');
	};

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
