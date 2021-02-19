return ['$rootScope', '$scope', 'globals', function ($rootScope, $scope, globals) {

	$rootScope.pageTitle = '每月都有精彩的活动';
	$rootScope.pageImage = globals.LOGO_IMAGE;
	
	$scope.$on('$destroy', function () {
		$scope.scrollDisabled = true;
	});

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
