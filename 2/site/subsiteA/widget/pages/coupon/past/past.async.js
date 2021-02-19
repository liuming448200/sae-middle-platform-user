return ['$rootScope', '$scope', 'globals', function ($rootScope, $scope, globals) {

	$rootScope.pageTitle = '我的已使用和过期优惠券';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
