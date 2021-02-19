return ['$scope', '$stateParams', '$state', 'webservice', 'storyService', 'uploadFileService', 'globals', 
	function ($scope, $stateParams, $state, webservice, storyService, uploadFileService, globals) {

	var back = $stateParams.back || '';
	if (!!back) {
		$scope.story = storyService.get();
	} else {
		$scope.story = {};
	}

	if ($scope.story.picname) {
		$scope.hasUploadPic = true;
	} else {
		$scope.hasUploadPic = false;
	}

	$scope.getPic = function () {
		uploadFileService.readAsDataUrl($scope.myPic, $scope).then(function (res) {
			$scope.story.picname = $scope.myPic.name;
			$scope.story.pic = res;
		}, function (res) {
			var tip = '故事图片预览失败，请重新选择';
			$scope.$emit('TOAST', {msg: tip});
			var res = res;
		});
	};

	$scope.uploadPic = function () {
		if (!$scope.myPic) {
			var tip = '请选择需要上传的故事图片';
			$scope.$emit('TOAST', {msg: tip});

	    return;
		}

		$scope.$emit('BUSY');
		webservice.uploadPic($scope.myPic, globals.STORY).then(function (res) {
			$scope.$emit('NOTBUSY');
			var status = res.status;
			var tip = res.message;
			if (globals.STATUS_OK === status) {
				$scope.story.picname = res.data && res.data.name;
				$scope.story.pic = res.data && res.data.url;
				$scope.hasUploadPic = true;
			}
			$scope.$emit('TOAST', {msg: tip});
		}, function (res) {
			$scope.$emit('NOTBUSY');
			$scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
			var res = res;
		});
	};

	$scope.addStoryPreview = function () {
		if ($scope.addStoryForm.name.$invalid) {
			if ($scope.addStoryForm.name.$error.required) {
				var tip = '故事名称不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.addStoryForm.name.$error.maxlength) {
				var tip = '故事名称长度不能超过20个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		if ($scope.addStoryForm.content.$invalid) {
			if ($scope.addStoryForm.content.$error.required) {
				var tip = '故事内容不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.addStoryForm.content.$error.maxlength) {
				var tip = '故事内容长度不能超过3000个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		if ($scope.addStoryForm.implication.$invalid) {
			if ($scope.addStoryForm.implication.$error.required) {
				var tip = '故事寓意内容不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.addStoryForm.implication.$error.maxlength) {
				var tip = '故事寓意长度不能超过1000个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		if (!$scope.story.pic) {
			var tip = '请选择需要上传的故事图片';
			$scope.$emit('TOAST', {msg: tip});

			return;
		}

		if (!$scope.hasUploadPic) {
			var tip = '请上传故事图片';
			$scope.$emit('TOAST', {msg: tip});

			return;
		}

		storyService.set($scope.story);

		$state.go('main.story.preview');
	};

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
