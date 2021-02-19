return ['$scope', '$stateParams', '$state', 'shareService', function ($scope, $stateParams, $state, shareService) {

	var from = $stateParams.from;

	$scope.back = function () {
		$state.go(from && 'instmore.course' !== from ? from : 'institution');
	};

	$scope.share = function () {
		shareService.open();
	};

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
