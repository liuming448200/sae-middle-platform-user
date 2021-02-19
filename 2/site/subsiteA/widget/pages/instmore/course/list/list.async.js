return ['$rootScope', '$scope', 'globals', function ($rootScope, $scope, globals) {

	$rootScope.pageTitle = '丰富多彩的课程';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	$scope.$on('$destroy', function () {
		$scope.scrollDisabled = true;
	});

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
