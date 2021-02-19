return ['$scope', '$state', 'webservice', 'dialogService', 'globals', 
	function ($scope, $state, webservice, dialogService, globals) {

	$scope.addWordCategorySubmit = function () {
		if ($scope.addWordCategoryForm.english.$invalid) {
			if ($scope.addWordCategoryForm.english.$error.required) {
				var tip = '单词不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.addWordCategoryForm.english.$error.maxlength) {
				var tip = '单词长度不能超过30个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		if ($scope.addWordCategoryForm.chinese.$invalid) {
			if ($scope.addWordCategoryForm.chinese.$error.required) {
				var tip = '单词翻译不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.addWordCategoryForm.chinese.$error.maxlength) {
				var tip = '单词翻译长度不能超过30个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		var english = $scope.word.english;
    var chinese = $scope.word.chinese;

    var info = {
    	english: english,
    	chinese: chinese
    };
    info = angular.toJson(info);

    var infoData = {
      info: info
    };

    $scope.$emit('BUSY');
    webservice.createWordCategoryRow(infoData).then(function (res) {
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

	function goWordCategoryList () {
		$state.go('main.english.type.list');
	}

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
