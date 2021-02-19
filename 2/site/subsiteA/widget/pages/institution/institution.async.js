return ['$scope', function ($scope) {

	$scope.closeModal = function () {
		$('#menuModal').modal('hide');
	};

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
