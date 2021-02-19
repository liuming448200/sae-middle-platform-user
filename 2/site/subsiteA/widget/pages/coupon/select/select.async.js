return ['$rootScope', '$scope', '$stateParams', '$state', 'globals', 
	function ($rootScope, $scope, $stateParams, $state, globals) {

	$rootScope.pageTitle = '选择可用的优惠券';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	var from = $stateParams.from;

	$scope.useCoupon = function () {
		$state.go('order', {from:from});
	};

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
