return ['$scope', '$state', 'webservice', 'globals', 'checkMobileService', 
	function ($scope, $state, webservice, globals, checkMobileService) {

	var identity;

	// sendImageVerifyCodeFunc();

	$scope.sendVerifyCode = function () {
		sendImageVerifyCodeFunc();
	};

	$scope.checkMobileSubmit = function () {
		if ($scope.checkMobileForm.mobile.$invalid) {
			if ($scope.checkMobileForm.mobile.$error.required) {
				var tip = '手机号码不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.checkMobileForm.mobile.$error.minlength) {
				var tip = '手机号码长度不能少于11个字符';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.checkMobileForm.mobile.$error.maxlength) {
				var tip = '手机号码长度不能超过11个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		// if ($scope.checkMobileForm.verifyCode.$invalid) {
		// 	if ($scope.checkMobileForm.verifyCode.$error.required) {
		// 		var tip = '图形验证码不能为空';
		// 		$scope.$emit('TOAST', {msg: tip});
		// 	} else if ($scope.checkMobileForm.verifyCode.$error.minlength) {
		// 		var tip = '图形验证码长度不能少于5个字符';
		// 		$scope.$emit('TOAST', {msg: tip});
		// 	} else if ($scope.checkMobileForm.verifyCode.$error.maxlength) {
		// 		var tip = '图形验证码长度不能超过5个字符';
		// 		$scope.$emit('TOAST', {msg: tip});
		// 	}

		// 	return;
		// }

		// var verifyCode = $scope.verifyCode;

		var mobile = $scope.mobile;

		$scope.$emit("BUSY");
		webservice.mobileCheckExist(mobile).then(function (res) {
			$scope.$emit('NOTBUSY');
			var status = res.status;
			var tip = res.message;
			if (globals.USER_MOBILE_EXIST === status) {
				checkMobileService.set(false);
				$state.go('reset.second', {
					mobile: mobile
				});
			} else if (globals.STATUS_OK === status) {
				tip = '手机号没有注册';
				$scope.$emit('TOAST', {msg: tip});
			} else {
				$scope.$emit('TOAST', {msg: tip});
			}
		}, function (res) {
			$scope.$emit('NOTBUSY');
			$scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
			var res = res;
		});

		// $scope.$emit("BUSY");
		// webservice.checkImageVerifyCode(identity, verifyCode).then(function (res) {
		// 	$scope.$emit('NOTBUSY');
		// 	var status = res.status;
		// 	var tip = res.message;
		// 	if (globals.STATUS_OK === status) {
		// 		var mobile = $scope.mobile;

		// 		webservice.mobileCheckExist(mobile).then(function (res) {
		// 			var status = res.status;
		// 			var tip = res.message;
		// 			if (globals.STATUS_OK === status) {
		// 				tip = '手机号没有注册';
		// 				$scope.$emit('TOAST', {msg: tip});
		// 			} else {
		// 				checkMobileService.set(false);
		// 				$state.go('reset.second', {
		// 					mobile: mobile
		// 				});
		// 			}
		// 		}, function (res) {
		// 			$scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
		// 			var res = res;
		// 		});
		// 	} else {
		// 		$scope.$emit('TOAST', {msg: tip});
		// 	}
		// }, function (res) {
		// 	$scope.$emit('NOTBUSY');
		// 	$scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
		// 	var res = res;
		// });
	};

	function sendImageVerifyCodeFunc () {
		identity = (new Date()).getTime();
		$scope.vcodeUrl = webservice.sendImageVerifyCode(identity);
	}

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
