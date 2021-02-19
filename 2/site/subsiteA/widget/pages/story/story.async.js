return ['$rootScope', '$scope', '$stateParams', 'webservice', 'globals', 'shareService', 
	function ($rootScope, $scope, $stateParams, webservice, globals, shareService) {

	var story_id = $stateParams.story_id || '';

	$scope.story = {};

	$scope.loading = true;
  $scope.failing = false;
  $scope.empty = false;
	webservice.getStoryRow(story_id).then(function (res) {
		$scope.loading = false;
		var status = res.status;
		if (globals.STATUS_OK === status) {
			$scope.story = res.data;
			$rootScope.pageTitle = $scope.story.name;
			$rootScope.pageImage = $scope.story.pic;
		} else if (globals.SPECIFIC_ERROR === status) {
			$scope.empty = true;
		} else {
			$scope.failing = true;
		}
	}, function (res) {
		$scope.loading = false;
    $scope.failing = true;
		var res = res;
	});

	$scope.share = function () {
		shareService.open($scope.story.content);
	};

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
