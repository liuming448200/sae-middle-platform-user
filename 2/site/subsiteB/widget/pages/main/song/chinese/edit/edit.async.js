return ['$scope', '$stateParams', '$state', 'webservice', 'songService', 'uploadFileService', 'globals', 
	function ($scope, $stateParams, $state, webservice, songService, uploadFileService, globals) {

	var song_id = $stateParams.song_id || '';

	var back = $stateParams.back || '';
	if (!!back) {
		$scope.song = songService.get();
	} else {
		$scope.song = {};
	}

	var language = 'chinese';

	$scope.hasChangeFile = false;
	$scope.hasUploadFile = false;

	$scope.hasChangePic = false;
	$scope.hasUploadPic = false;

	if (!$scope.song.song_id) {
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

	$scope.getFile = function (file) {

		$scope.myFile = file;

		uploadFileService.readAsDataUrl($scope.myFile, $scope).then(function (res) {
			$scope.song.filename = $scope.myFile.name;
			$scope.song.song = res;
			var items = [];
    	items.push($scope.song.song);
    	$scope.items = items;
    	$scope.hasChangeFile = true;
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

	$scope.getPic = function (pic) {

		$scope.myPic = pic;

		uploadFileService.readAsDataUrl($scope.myPic, $scope).then(function (res) {
			$scope.song.picname = $scope.myPic.name;
			$scope.song.pic = res;
			$scope.hasChangePic = true;
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

	$scope.editSongPreview = function () {
		var songName = $scope.song.name;
		var songContent = $scope.song.content;
		var songSong = $scope.song.song;
		var songPic = $scope.song.pic;

		if (!songName) {
			var tip = '儿歌名称不能为空';
			$scope.$emit('TOAST', {msg: tip});
			return;
		} else if (songName.length > 50) {
			var tip = '儿歌名称长度不能超过50个字符';
			$scope.$emit('TOAST', {msg: tip});
			return;
		}

		if (!songContent) {
			var tip = '儿歌歌词不能为空';
			$scope.$emit('TOAST', {msg: tip});
			return;
		} else if (songContent.length > 4000) {
			var tip = '儿歌歌词长度不能超过4000个字符';
			$scope.$emit('TOAST', {msg: tip});
			return;
		}

		if (!songSong) {
			var tip = '请选择需要上传的儿歌歌曲';
			$scope.$emit('TOAST', {msg: tip});

			return;
		}

		if ($scope.hasChangeFile) {
			if (!$scope.hasUploadFile) {
				var tip = '请上传选择的儿歌歌曲';
				$scope.$emit('TOAST', {msg: tip});

				return;
			}
		}

		if (!songPic) {
			var tip = '请选择需要上传的儿歌图片';
			$scope.$emit('TOAST', {msg: tip});

			return;
		}

		if ($scope.hasChangePic) {
			if (!$scope.hasUploadPic) {
				var tip = '请上传选择的儿歌图片';
				$scope.$emit('TOAST', {msg: tip});

				return;
			}
		}

		songService.set($scope.song);

		$state.go('main.song.chinese.preview', {
			song_id: song_id
		});
	};

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
