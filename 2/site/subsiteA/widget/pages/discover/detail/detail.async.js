return ['$rootScope', '$scope', 'globals', function ($rootScope, $scope, globals) {

	$rootScope.pageTitle = '儿童成长的敏感期';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
