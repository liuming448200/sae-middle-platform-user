return ['$scope', '$stateParams', '$state', 'webservice', 'dialogService', 'globals', 
	function ($scope, $stateParams, $state, webservice, dialogService, globals) {

	var category_id = $stateParams.category_id || '';

	$scope.loading = true;
  $scope.failing = false;
  $scope.empty = false;
  webservice.getWordCategoryRow(category_id).then(function (res) {
		$scope.loading = false;
    var status = res.status;
    if (globals.STATUS_OK === status) {
    	$scope.word = res.data;
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

	$scope.editWordCategorySubmit = function () {
		var english = $scope.word.english;
    var chinese = $scope.word.chinese;

    if (!english) {
      var tip = '单词不能为空';
      $scope.$emit('TOAST', {msg: tip});
      return;
    } else if (english.length > 30) {
      var tip = '单词长度不能超过30个字符';
      $scope.$emit('TOAST', {msg: tip});
      return;
    }

    if (!chinese) {
      var tip = '单词翻译不能为空';
      $scope.$emit('TOAST', {msg: tip});
      return;
    } else if (chinese.length > 30) {
      var tip = '单词翻译长度不能超过30个字符';
      $scope.$emit('TOAST', {msg: tip});
      return;
    }

    var info = {
    	english: english,
    	chinese: chinese
    };
    info = angular.toJson(info);

    var infoData = {
    	category_id: category_id,
      info: info
    };

    $scope.$emit('BUSY');
    webservice.updateWordCategoryRow(infoData).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      var tip = res.message;
      if (globals.STATUS_OK === status) {
        dialogService.dialog(tip, goWordCategoryList, true);
      } else {
        $scope.$emit('TOAST', {msg: tip});
      }
    }, function (res) {
      $scope.$emit('NOTBUSY');
      $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
      var res = res;
    });
	};

	$scope.deleteWordCategory = function () {
		var english = $scope.word.english || '';
    var tip = '确定删除' + english + '吗？';
    dialogService.dialog(tip, delWordCategory);
	};

	function goWordCategoryList () {
		$state.go('main.english.type.list');
	}

	function delWordCategory () {
		$scope.$emit('BUSY');
    webservice.deleteWordCategoryRow(category_id).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      if (globals.STATUS_OK === status) {
        $state.go('main.english.type.list');
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
