return ['$rootScope', '$scope', '$state', 'globals', 'shareService', function ($rootScope, $scope, $state, globals, shareService) {

	$rootScope.pageTitle = '风度小骑士';
	$rootScope.pageImage = globals.LOGO_IMAGE;

 	$scope.share = function () {
		shareService.open();
	};

	$scope.goOrder = function () {
		$state.go('order', {from: $state.current.name});
	};

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
