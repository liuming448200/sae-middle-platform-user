return ['$scope', '$stateParams', '$state', function ($scope, $stateParams, $state) {

	$scope.urlParams = {
		from : $stateParams.from
	};

	$scope.back = function () {
		if ('instmore.product' === $scope.urlParams.from) {
			$state.go('institution.course');
		} else if ('activity' === $scope.urlParams.from) {
			$state.go('institution.activity');
		}
	};

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
