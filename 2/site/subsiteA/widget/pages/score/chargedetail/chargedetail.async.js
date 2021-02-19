return ['$rootScope', '$scope', '$stateParams', '$state', '$timeout', 'globals', 'dialogService', 
	function ($rootScope, $scope, $stateParams, $state, $timeout, globals, dialogService) {

	$rootScope.pageTitle = '兑换商品详情';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	var close;

	$scope.charge = function () {
		var tip = '确定兑换吗？';
		dialogService.dialog(tip, chargeCoupon);
	};

	function chargeCoupon () {
		close = $timeout(function () {
			var tip = '兑换成功';
			dialogService.dialog(tip, chargeSuccess, true);
			$timeout.cancel(close);
      close = undefined;
		}, 500);
	}

	function chargeSuccess () {
		$state.go('score.availpoints');
	}

	$scope.$on('$destroy', function () {
    if (angular.isDefined(close)) {
      $timeout.cancel(close);
      close = undefined;
    }
  });

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
