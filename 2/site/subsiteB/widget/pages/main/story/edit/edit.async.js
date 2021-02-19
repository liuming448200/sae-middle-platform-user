return ['$scope', '$stateParams', '$state', 'webservice', 'storyService', 'uploadFileService', 'globals', 
	function ($scope, $stateParams, $state, webservice, storyService, uploadFileService, globals) {

	var story_id = $stateParams.story_id || '';

	var back = $stateParams.back || '';
	if (!!back) {
		$scope.story = storyService.get();
	} else {
		$scope.story = {};
	}

	$scope.hasChangePic = false;
	$scope.hasUploadPic = false;

	if (!$scope.story.story_id) {
		$scope.loading = true;
	  $scope.failing = false;
	  $scope.empty = false;
		webservice.getStoryRow(story_id).then(function (res) {
			$scope.loading = false;
	    var status = res.status;
	    if (globals.STATUS_OK === status) {
	    	$scope.story = res.data;
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
			$scope.story.picname = $scope.myPic.name;
			$scope.story.pic = res;
			$scope.hasChangePic = true;
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

	$scope.editStoryPreview = function () {
		var storyName = $scope.story.name;
		var storyContent = $scope.story.content;
		var storyImplication = $scope.story.implication;
		var storyPic = $scope.story.pic;

		if (!storyName) {
			var tip = '故事名称不能为空';
			$scope.$emit('TOAST', {msg: tip});
			return;
		} else if (storyName.length > 20) {
			var tip = '故事名称长度不能超过20个字符';
			$scope.$emit('TOAST', {msg: tip});
			return;
		}

		if (!storyContent) {
			var tip = '故事内容不能为空';
			$scope.$emit('TOAST', {msg: tip});
			return;
		} else if (storyContent.length > 3000) {
			var tip = '故事内容长度不能超过3000个字符';
			$scope.$emit('TOAST', {msg: tip});
			return;
		}

		if (!storyImplication) {
			var tip = '故事寓意不能为空';
			$scope.$emit('TOAST', {msg: tip});
			return;
		} else if (storyImplication.length > 1000) {
			var tip = '故事寓意长度不能超过1000个字符';
			$scope.$emit('TOAST', {msg: tip});
			return;
		}

		if (!storyPic) {
			var tip = '请选择需要上传的故事图片';
			$scope.$emit('TOAST', {msg: tip});

			return;
		}

		if ($scope.hasChangePic) {
			if (!$scope.hasUploadPic) {
				var tip = '请上传选择的故事图片';
				$scope.$emit('TOAST', {msg: tip});

				return;
			}
		}

		storyService.set($scope.story);

		$state.go('main.story.preview', {
			story_id: story_id
		});
	};

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
