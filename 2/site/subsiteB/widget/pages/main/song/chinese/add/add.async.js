return ['$scope', '$stateParams', '$state', 'webservice', 'songService', 'uploadFileService', 'globals', 
	function ($scope, $stateParams, $state, webservice, songService, uploadFileService, globals) {

	var back = $stateParams.back || '';
	if (!!back) {
		$scope.song = songService.get();
	} else {
		$scope.song = {};
	}

	if ($scope.song.filename) {
		$scope.hasUploadFile = true;
	} else {
		$scope.hasUploadFile = false;
	}

	if ($scope.song.picname) {
		$scope.hasUploadPic = true;
	} else {
		$scope.hasUploadPic = false;
	}

	$scope.getFile = function () {
		uploadFileService.readAsDataUrl($scope.myFile, $scope).then(function (res) {
			$scope.song.filename = $scope.myFile.name;
			$scope.song.song = res;
			var items = [];
    	items.push($scope.song.song);
    	$scope.items = items;
		}, function (res) {
			var tip = '儿歌歌曲预览失败，请重新选择';
			$scope.$emit('TOAST', {msg: tip});
			var res = res;
		});
	};

	$scope.uploadFile = function () {
		if (!$scope.myFile) {
			var tip = '请选择需要上传的儿歌歌曲';
			$scope.$emit('TOAST', {msg: tip});

	    return;
		}

		$scope.$emit('BUSY');
		webservice.uploadFile($scope.myFile, globals.SONG).then(function (res) {
			$scope.$emit('NOTBUSY');
			var status = res.status;
			var tip = res.message;
			if (globals.STATUS_OK === status) {
				$scope.song.filename = res.data && res.data.name;
				$scope.song.song = res.data && res.data.url;
				var items = [];
	    	items.push($scope.song.song);
	    	$scope.items = items;
				$scope.hasUploadFile = true;
			}
			$scope.$emit('TOAST', {msg: tip});
		}, function (res) {
			$scope.$emit('NOTBUSY');
			$scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
			var res = res;
		});
	};

	$scope.getPic = function () {
		uploadFileService.readAsDataUrl($scope.myPic, $scope).then(function (res) {
			$scope.song.picname = $scope.myPic.name;
			$scope.song.pic = res;
		}, function (res) {
			var tip = '儿歌图片预览失败，请重新选择';
			$scope.$emit('TOAST', {msg: tip});
			var res = res;
		});
	};

	$scope.uploadPic = function () {
		if (!$scope.myPic) {
			var tip = '请选择需要上传的儿歌图片';
			$scope.$emit('TOAST', {msg: tip});

	    return;
		}

		$scope.$emit('BUSY');
		webservice.uploadPic($scope.myPic, globals.SONG).then(function (res) {
			$scope.$emit('NOTBUSY');
			var status = res.status;
			var tip = res.message;
			if (globals.STATUS_OK === status) {
				$scope.song.picname = res.data && res.data.name;
				$scope.song.pic = res.data && res.data.url;
				$scope.hasUploadPic = true;
			}
			$scope.$emit('TOAST', {msg: tip});
		}, function (res) {
			$scope.$emit('NOTBUSY');
			$scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
			var res = res;
		});
	};

	$scope.addSongPreview = function () {
		if ($scope.addSongForm.name.$invalid) {
			if ($scope.addSongForm.name.$error.required) {
				var tip = '儿歌名称不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.addSongForm.name.$error.maxlength) {
				var tip = '儿歌名称长度不能超过50个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		if ($scope.addSongForm.content.$invalid) {
			if ($scope.addSongForm.content.$error.required) {
				var tip = '儿歌歌词不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.addSongForm.content.$error.maxlength) {
				var tip = '儿歌歌词长度不能超过4000个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		if (!$scope.song.song) {
			var tip = '请选择需要上传的儿歌歌曲';
			$scope.$emit('TOAST', {msg: tip});

			return;
		}

		if (!$scope.hasUploadFile) {
			var tip = '请上传儿歌歌曲';
			$scope.$emit('TOAST', {msg: tip});

			return;
		}

		if (!$scope.song.pic) {
			var tip = '请选择需要上传的儿歌图片';
			$scope.$emit('TOAST', {msg: tip});

			return;
		}

		if (!$scope.hasUploadPic) {
			var tip = '请上传儿歌图片';
			$scope.$emit('TOAST', {msg: tip});

			return;
		}

		songService.set($scope.song);

		$state.go('main.song.chinese.preview');
	};

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
