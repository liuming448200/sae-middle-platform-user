return ['$scope', '$state', '$interval', 'webservice', 'dialogService', 'globals', 
	function ($scope, $state, $interval, webservice, dialogService, globals) {

	$scope.second = false;

	$scope.countdown = 60;

	var stop;

	$scope.sendVerifyCode = function () {
		if ($scope.checkPhoneForm.mobile.$invalid) {
			if ($scope.checkPhoneForm.mobile.$error.required) {
				var tip = '手机号码不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.checkPhoneForm.mobile.$error.minlength) {
				var tip = '手机号码长度不能少于11个字符';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.checkPhoneForm.mobile.$error.maxlength) {
				var tip = '手机号码长度不能超过11个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		var mobile = $scope.mobile;

		webservice.mobileCheckExist(mobile).then(function (res) {
			var status = res.status;
			var tip = res.message;
			if (globals.STATUS_OK === status) {
				webservice.sendSMS(mobile).then(function (res) {
					var status = res.status;
					var tip = res.message;
					if (globals.STATUS_OK === status) {
						$scope.sendDisabled = true;

						stop = $interval(function () {
							$scope.countdown--;
							if (0 === $scope.countdown) {
								reset();
							}
						}, 1000, 60);
					} else {
						$scope.$emit('TOAST', {msg: tip});
					}
				}, function (res) {
					$scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
					var res = res;
				});
			} else {
				$scope.$emit('TOAST', {msg: tip});
			}
		}, function (res) {
			$scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
			var res = res;
		});
	};

	$scope.checkPhoneSubmit = function () {
		if ($scope.checkPhoneForm.mobile.$invalid) {
			if ($scope.checkPhoneForm.mobile.$error.required) {
				var tip = '手机号码不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.checkPhoneForm.mobile.$error.minlength) {
				var tip = '手机号码长度不能少于11个字符';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.checkPhoneForm.mobile.$error.maxlength) {
				var tip = '手机号码长度不能超过11个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		if ($scope.checkPhoneForm.verifyCode.$invalid) {
			if ($scope.checkPhoneForm.verifyCode.$error.required) {
				var tip = '手机验证码不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.checkPhoneForm.verifyCode.$error.minlength) {
				var tip = '手机验证码长度不能少于6个字符';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.checkPhoneForm.verifyCode.$error.maxlength) {
				var tip = '手机验证码长度不能超过6个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		var mobile = $scope.mobile;
		var verifyCode = $scope.verifyCode;

		$scope.$emit("BUSY");
		webservice.verifySMS(mobile, verifyCode).then(function (res) {
			$scope.$emit('NOTBUSY');
			var status = res.status;
			var tip = res.message;
			if (globals.STATUS_OK === status) {
				$scope.second = true;
			} else {
				$scope.$emit('TOAST', {msg: tip});
			}
		}, function (res) {
			$scope.$emit('NOTBUSY');
			$scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
			var res = res;
		});
	};

	$scope.changePasswordSubmit = function () {
		if ($scope.changePasswordForm.password.$invalid) {
			if ($scope.changePasswordForm.password.$error.required) {
				var tip = '登录密码不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.changePasswordForm.password.$error.maxlength) {
				var tip = '登录密码不能超过20个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		if ($scope.changePasswordForm.newpassword.$invalid) {
			if ($scope.changePasswordForm.newpassword.$error.required) {
				var tip = '确认密码不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.changePasswordForm.newpassword.$error.maxlength) {
				var tip = '确认密码不能超过20个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		if ($scope.password !== $scope.newpassword) {
			var tip = '两次输入的密码不一致，请重新输入';
			$scope.$emit('TOAST', {msg: tip});

			return;
		}

		var mobile = $scope.mobile;
		var password = $scope.password;

		$scope.$emit("BUSY");
		webservice.resetPassword(mobile, password).then(function (res) {
			$scope.$emit('NOTBUSY');
			var status = res.status;
			var tip = res.message;
			if (globals.STATUS_OK === status) {
				dialogService.dialog(tip, goLogin, true);
			} else {
				$scope.$emit('TOAST', {msg: tip});
			}
		}, function (res) {
			$scope.$emit('NOTBUSY');
			$scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
			var res = res;
		});
	};

  $scope.$on('$destroy', function () {
		stopFunc();
	});

  function reset () {
  	$scope.sendDisabled = false;
		$scope.countdown = 60;
		stopFunc();
  };

  function stopFunc () {
    if (angular.isDefined(stop)) {
      $interval.cancel(stop);
      stop = undefined;
    }
  };

  function goLogin () {
  	$scope.second = false;
		$state.go('login');
  }

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
