return ['$rootScope', '$scope', 'globals', function ($rootScope, $scope, globals) {

	$rootScope.pageTitle = '记录孩子的成长';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
