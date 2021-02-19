return ['$rootScope', '$scope', '$stateParams', '$state', 'globals', 
	function ($rootScope, $scope, $stateParams, $state, globals) {

	$rootScope.pageTitle = '会员级别与积分说明';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	var from = $stateParams.from;
	if (!from) {
		window.history.back();
		return;
	}

	$scope.back = function () {
		$state.go(from);
	};

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
