return ['$rootScope', '$scope', 'globals', function ($rootScope, $scope, globals) {

	$rootScope.pageTitle = '我的积分兑换记录';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
