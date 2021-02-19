return ['$rootScope', '$scope', '$stateParams', '$state', 'globals', 'shareService', 
	function ($rootScope, $scope, $stateParams, $state, globals, shareService) {

	$rootScope.pageTitle = '教学团队';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	var from = $stateParams.from;

	$scope.back = function () {
		$state.go(from && 'instmore.teachers' !== from ? from : 'institution');
	};

	$scope.share = function () {
		shareService.open();
	};

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
