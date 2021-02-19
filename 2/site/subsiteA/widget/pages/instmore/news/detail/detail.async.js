return ['$rootScope', '$scope', 'globals', function ($rootScope, $scope, globals) {

	$rootScope.pageTitle = '宝宝几岁开始学才艺';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	$scope.showMore = function () {
		$scope.moreFlag = true;
	};

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
