return ['$rootScope', '$scope', '$stateParams', '$state', 'globals', 
	function ($rootScope, $scope, $stateParams, $state, globals) {

	$rootScope.pageTitle = '附近的学校都在这里';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	var city = $stateParams.city;
	if (!city) {
		$scope.cityName = '北京';
	} else {
		$scope.cityName = $stateParams.cityName;
	}

	$scope.search = function () {
		$state.go('search', {from: $state.current.name});
	};

	$scope.$on('$destroy', function () {
		$scope.scrollDisabled = true;
	});

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
