return ['$rootScope', '$scope', '$stateParams', 'webservice', 'globals', 'shareService', 
	function ($rootScope, $scope, $stateParams, webservice, globals, shareService) {

	var word_id = $stateParams.word_id || '';

	$scope.word = {};

	$scope.loading = true;
  $scope.failing = false;
  $scope.empty = false;
	webservice.getWordRow(word_id).then(function (res) {
		$scope.loading = false;
		var status = res.status;
		if (globals.STATUS_OK === status) {
			$scope.word = res.data;
			$scope.word_url = webservice.getAudio($scope.word.english);
			var items = [];
    	items.push($scope.word_url);
    	$scope.items = items;
			$scope.sentence_url = webservice.getAudio($scope.word.example_en);
			var arr = [];
    	arr.push($scope.sentence_url);
    	$scope.arr = arr;
    	$rootScope.pageTitle = $scope.word.english;
    	$rootScope.pageImage = $scope.word.pic;
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

	$scope.getAudio = function (type) {
		var audioElement;

		if (1 === type) {
			audioElement = document.getElementById('audio1');
		} else if (2 === type) {
			audioElement = document.getElementById('audio2');
		}

		if (!audioElement) {
			var tip = '加载音频失败';
			$scope.$emit('TOAST', {msg: tip});
			return;
		}

		audioElement.pause();
		audioElement.play();
	};

	$scope.share = function () {
		shareService.open($scope.word.example_en, $scope.word.example_cn);
	};

	$scope.$on('$destroy', function () {
  	$scope.items = [];
  	$scope.arr = [];
  });

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
