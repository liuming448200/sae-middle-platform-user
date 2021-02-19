return ['$rootScope', '$scope', '$stateParams', '$state', 'webservice', 'globals', 'shareService', 
	function ($rootScope, $scope, $stateParams, $state, webservice, globals, shareService) {

	var song_id = $stateParams.song_id || '';
	var language = $stateParams.language || '';

	$scope.song = {};

	$scope.loading = true;
  $scope.failing = false;
  $scope.empty = false;
  webservice.getSongRow(language, song_id).then(function (res) {
		$scope.loading = false;
		var status = res.status;
		if (globals.STATUS_OK === status) {
			$scope.song = res.data;
			var items = [];
    	items.push($scope.song.song);
    	$scope.items = items;
    	$rootScope.pageTitle = $scope.song.name;
    	$rootScope.pageImage = $scope.song.pic;
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

	$scope.back = function () {
		if ('chinese' === language) {
			$state.go('main.teach.song.chinese');
		} else if ('english' === language) {
			$state.go('main.teach.song.english');
		}
	};

	$scope.share = function () {
		shareService.open($scope.song.content);
	};

	$scope.$on('$destroy', function () {
  	$scope.items = [];
  });

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
