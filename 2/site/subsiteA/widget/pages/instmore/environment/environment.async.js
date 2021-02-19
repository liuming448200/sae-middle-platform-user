return ['$rootScope', '$scope', '$stateParams', '$state', 'globals', 'shareService', 
	function ($rootScope, $scope, $stateParams, $state, globals, shareService) {

	$rootScope.pageTitle = '这是孩子们特别喜欢的地方';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	var from = $stateParams.from;

	$scope.back = function () {
		$state.go(from && 'instmore.environment' !== from ? from : 'institution');
	};

	$scope.share = function () {
		shareService.open();
	};

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
