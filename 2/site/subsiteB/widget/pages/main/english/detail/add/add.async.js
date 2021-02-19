return ['$scope', '$stateParams', '$state', 'webservice', 'wordDetailService', 'wordTypeService', 'uploadFileService', 'globals', 
	function ($scope, $stateParams, $state, webservice, wordDetailService, wordTypeService, uploadFileService, globals) {

	var back = $stateParams.back || '';
	if (!!back) {
		$scope.word = wordDetailService.get();
	} else {
		$scope.word = {};
	}

	if ($scope.word.picname) {
		$scope.hasUploadPic = true;
	} else {
		$scope.hasUploadPic = false;
	}

	if (!$scope.word.categories) {
		$scope.word.categories = wordTypeService.get();
	}

	if (0 === $scope.word.categories.length) {
		$scope.lazy = true;
	}

	$scope.getPic = function () {
		uploadFileService.readAsDataUrl($scope.myPic, $scope).then(function (res) {
			$scope.word.picname = $scope.myPic.name;
			$scope.word.pic = res;
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

	$scope.addWordPreview = function () {
		if ($scope.addWordForm.english.$invalid) {
			if ($scope.addWordForm.english.$error.required) {
				var tip = '单词不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.addWordForm.english.$error.maxlength) {
				var tip = '单词长度不能超过30个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		if ($scope.addWordForm.chinese.$invalid) {
			if ($scope.addWordForm.chinese.$error.required) {
				var tip = '单词释义不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.addWordForm.chinese.$error.maxlength) {
				var tip = '单词释义长度不能超过30个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		if ($scope.addWordForm.category.$invalid) {
			if ($scope.addWordForm.category.$error.required) {
				var tip = '单词分类不能为空';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		if ($scope.addWordForm.example_en.$invalid) {
			if ($scope.addWordForm.example_en.$error.required) {
				var tip = '例句不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.addWordForm.example_en.$error.maxlength) {
				var tip = '例句长度不能超过500个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		if ($scope.addWordForm.example_cn.$invalid) {
			if ($scope.addWordForm.example_cn.$error.required) {
				var tip = '例句翻译不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.addWordForm.example_cn.$error.maxlength) {
				var tip = '例句翻译长度不能超过500个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		if (!$scope.word.pic) {
			var tip = '请选择需要上传的单词图片';
			$scope.$emit('TOAST', {msg: tip});

			return;
		}

		if (!$scope.hasUploadPic) {
			var tip = '请上传单词图片';
			$scope.$emit('TOAST', {msg: tip});

			return;
		}

		wordDetailService.set($scope.word);

		$state.go('main.english.detail.preview');
	};

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
