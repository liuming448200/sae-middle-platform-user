return ['$scope', '$stateParams', '$state', 'webservice', 'wordDetailService', 'dialogService', 'globals', 
	function ($scope, $stateParams, $state, webservice, wordDetailService, dialogService, globals) {

	$scope.word_id = $stateParams.word_id || '';

	$scope.word = wordDetailService.get();

	$scope.submit = function () {
		var category_id = $scope.word.category_id;
		var english = $scope.word.english;
		var chinese = $scope.word.chinese;
		var example_en = $scope.word.example_en;
		var example_cn = $scope.word.example_cn;
		var pic = $scope.word.pic;

		var info = {
			category_id: category_id,
			english: english,
			chinese: chinese,
			example_en: example_en,
			example_cn: example_cn,
			pic: pic
		};
		info = angular.toJson(info);

		if ($scope.word_id) {
			var infoData = {
        word_id: $scope.word_id,
        info: info
      };

      $scope.$emit('BUSY');
      webservice.updateWordRow(infoData).then(function (res) {
        $scope.$emit('NOTBUSY');
        var status = res.status;
        var tip = res.message;
        if (globals.STATUS_OK === status) {
          dialogService.dialog(tip, goWordList, true);
        } else {
          $scope.$emit('TOAST', {msg: tip});
        }
      }, function (res) {
        $scope.$emit('NOTBUSY');
        $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
        var res = res;
      });
		} else {
			var infoData = {
        info: info
      };

      $scope.$emit('BUSY');
      webservice.createWordRow(infoData).then(function (res) {
        $scope.$emit('NOTBUSY');
        var status = res.status;
        var tip = res.message;
        if (globals.STATUS_OK === status) {
          dialogService.dialog(tip, goWordList, true);
        } else {
          $scope.$emit('TOAST', {msg: tip});
        }
      }, function (res) {
        $scope.$emit('NOTBUSY');
        $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
        var res = res;
      });
		}
	};

	$scope.deleteWord = function () {
		var english = $scope.word.english || '';
    var tip = '确定删除' + english + '吗？';
    dialogService.dialog(tip, delWord);
	};

	$scope.back = function () {
    if ($scope.word_id) {
      $state.go('main.english.detail.edit', {
        word_id: $scope.word_id,
        back: 1
      });
    } else {
      $state.go('main.english.detail.add', {
        back: 1
      });
    }
  };

  function goWordList () {
  	$state.go('main.english.detail.list');
  }

  function delWord () {
  	$scope.$emit('BUSY');
    webservice.deleteWordRow($scope.word_id).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      if (globals.STATUS_OK === status) {
        $state.go('main.english.detail.list');
      } else {
        var tip = res.message;
        $scope.$emit('TOAST', {msg: tip});
      }
    }, function (res) {
      $scope.$emit('NOTBUSY');
      $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
      var res = res;
    });
  }

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
