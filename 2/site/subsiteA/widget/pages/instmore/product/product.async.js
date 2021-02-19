return ['$rootScope', '$scope', '$stateParams', '$state', 'globals', 'shareService', 
	function ($rootScope, $scope, $stateParams, $state, globals, shareService) {

	$rootScope.pageTitle = '购买课程';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	var from = $stateParams.from;

	$scope.back = function () {
		$state.go(from && 'instmore.product' !== from ? from : 'institution');
	};

	$scope.share = function () {
		shareService.open();
	};

	$scope.goOrder = function () {
		$state.go('order', {from: $state.current.name});
	};

	$scope.$on('$destroy', function () {
		$scope.scrollDisabled = true;
	});

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
