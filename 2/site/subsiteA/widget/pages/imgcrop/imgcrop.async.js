return ['$rootScope', '$scope', '$stateParams', '$state', 'imgService', 'webservice', 'globals', 
	function ($rootScope, $scope, $stateParams, $state, imgService, webservice, globals) {

	$rootScope.pageTitle = '留存美好的瞬间';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	var from = $stateParams.from;
	if (!from) {
		window.history.back();
		return;
	}

	var source = $stateParams.source;

	var imgFile = imgService.get();

	var filename = imgFile.filename;

	$scope.myImage = imgFile.file;

	imgService.reset();

	$scope.myCroppedImage = '';

	$scope.back = function () {
		$state.go(from, {from: $state.current.name, source: source});
	};

	$scope.save = function () {
		if (!$scope.myCroppedImage) {
			var tip = '图片裁剪失败，请重试';
			$scope.$emit('TOAST', {msg: tip});

	    return;
		}

		var blob = dataURItoBlob($scope.myCroppedImage);
		// var file = new File([blob], filename, {type: blob.type});

		$scope.$emit('BUSY');
		webservice.uploadPic(blob, globals.HEAD_IMAGE, 1, filename).then(function (res) {
			$scope.$emit('NOTBUSY');
			var status = res.status;
			var tip = res.message;
			if (globals.STATUS_OK === status) {
				var pic = res.data && res.data.url;
				imgService.set(filename, pic);
				$state.go(from, {from: $state.current.name, source: source});
			} else {
				$scope.$emit('TOAST', {msg: tip});
			}
		}, function (res) {
			$scope.$emit('NOTBUSY');
			$scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
			var res = res;
		});
	};

	function dataURItoBlob (dataURI) {
		var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    	byteString = atob(dataURI.split(',')[1]);
    } else {
    	byteString = unescape(dataURI.split(',')[1]);
    }

    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
	}

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
