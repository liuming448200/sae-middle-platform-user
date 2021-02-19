return ['$scope', '$stateParams', '$state', 'webservice', 'wordDetailService', 'wordTypeService', 'uploadFileService', 'globals', 
	function ($scope, $stateParams, $state, webservice, wordDetailService, wordTypeService, uploadFileService, globals) {

	var word_id = $stateParams.word_id || '';

	var back = $stateParams.back || '';
	if (!!back) {
		$scope.word = wordDetailService.get();
		if ($scope.word.categories && 0 === $scope.word.categories.length) {
			$scope.lazy = true;
		}
	} else {
		$scope.word = {};
	}

	$scope.hasChangePic = false;
	$scope.hasUploadPic = false;

	if (!$scope.word.word_id) {
		$scope.loading = true;
	  $scope.failing = false;
	  $scope.empty = false;
		webservice.getWordRow(word_id).then(function (res) {
			$scope.loading = false;
	    var status = res.status;
	    if (globals.STATUS_OK === status) {
	    	$scope.word = res.data;
	    	$scope.word.categories = wordTypeService.get();
	    	if (0 === $scope.word.categories.length) {
					$scope.lazy = true;
				}
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
	}

	$scope.getPic = function (pic) {

		$scope.myPic = pic;

		uploadFileService.readAsDataUrl($scope.myPic, $scope).then(function (res) {
			$scope.word.picname = $scope.myPic.name;
			$scope.word.pic = res;
			$scope.hasChangePic = true;
		}, function (res) {
			var tip = '单词图片预览失败，请重新选择';
			$scope.$emit('TOAST', {msg: tip});
			var res = res;
		});
	};

	$scope.uploadPic = function () {
		if (!$scope.myPic) {
			var tip = '请选择需要上传的单词图片';
			$scope.$emit('TOAST', {msg: tip});

	    return;
		}

		$scope.$emit('BUSY');
		webservice.uploadPic($scope.myPic, globals.ENGLISH).then(function (res) {
			$scope.$emit('NOTBUSY');
			var status = res.status;
			var tip = res.message;
			if (globals.STATUS_OK === status) {
				$scope.word.picname = res.data && res.data.name;
				$scope.word.pic = res.data && res.data.url;
				$scope.hasUploadPic = true;
			}
			$scope.$emit('TOAST', {msg: tip});
		}, function (res) {
			$scope.$emit('NOTBUSY');
			$scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
			var res = res;
		});
	};

	$scope.editWordPreview = function () {
		var category_id = $scope.word.category_id;
		var english = $scope.word.english;
		var chinese = $scope.word.chinese;
		var example_en = $scope.word.example_en;
		var example_cn = $scope.word.example_cn;
		var pic = $scope.word.pic;

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
			var tip = '单词释义不能为空';
			$scope.$emit('TOAST', {msg: tip});
			return;
		} else if (chinese.length > 30) {
			var tip = '单词释义长度不能超过30个字符';
			$scope.$emit('TOAST', {msg: tip});
			return;
		}

		if ($scope.lazy) {
      var tip = '单词分类列表不能为空';
      $scope.$emit('TOAST', {msg: tip});
      return;
    }

		if (!category_id) {
			var tip = '单词分类不能为空';
			$scope.$emit('TOAST', {msg: tip});
			return;
		}

		if (!example_en) {
			var tip = '例句不能为空';
			$scope.$emit('TOAST', {msg: tip});
			return;
		} else if (example_en.length > 500) {
			var tip = '例句长度不能超过500个字符';
			$scope.$emit('TOAST', {msg: tip});
			return;
		}

		if (!example_cn) {
			var tip = '例句翻译不能为空';
			$scope.$emit('TOAST', {msg: tip});
			return;
		} else if (example_cn.length > 500) {
			var tip = '例句翻译长度不能超过500个字符';
			$scope.$emit('TOAST', {msg: tip});
			return;
		}

		if (!pic) {
			var tip = '请选择需要上传的单词图片';
			$scope.$emit('TOAST', {msg: tip});

			return;
		}

		if ($scope.hasChangePic) {
			if (!$scope.hasUploadPic) {
				var tip = '请上传选择的单词图片';
				$scope.$emit('TOAST', {msg: tip});

				return;
			}
		}

		wordDetailService.set($scope.word);

		$state.go('main.english.detail.preview', {
			word_id: word_id
		});
	};

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
