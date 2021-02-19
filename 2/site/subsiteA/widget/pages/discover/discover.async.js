return ['$scope', '$stateParams', '$state', 'shareService', function ($scope, $stateParams, $state, shareService) {

	var from = $stateParams.from;

	$scope.back = function () {
		if ('main.teach.english.detail' === from) {
			$state.go('main.teach.english.type');
		} else {
			$state.go(from && 'discover' !== from ? from : 'main');
		}
	};

	$scope.share = function () {
		shareService.open();
	};

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
