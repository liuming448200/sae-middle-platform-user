return ['$scope', 'shareService', function ($scope, shareService) {

 	$scope.share = function () {
		shareService.open();
	};

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
