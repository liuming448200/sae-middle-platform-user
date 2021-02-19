return ['$scope', '$stateParams', '$state', '$interval', 'webservice', 'globals', 'checkMobileService', 'checkMobileVerifyCodeService', 
	function ($scope, $stateParams, $state, $interval, webservice, globals, checkMobileService, checkMobileVerifyCodeService) {

	var mobileExist = checkMobileService.get();
	if (!!mobileExist) {
		$state.go('reset');
		return;
	}

	checkMobileService.set(true);

	$scope.mobile = $stateParams.mobile;

	$scope.countdown = 60;

	var stop;

	sendSMSFunc();

	$scope.sendVerifyCode = function () {
		sendSMSFunc();
	};

	$scope.checkVerifyCodeSubmit = function () {
		if ($scope.checkVerifyCodeForm.verifyCode.$invalid) {
			if ($scope.checkVerifyCodeForm.verifyCode.$error.required) {
				var tip = '手机验证码不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.checkVerifyCodeForm.verifyCode.$error.minlength) {
				var tip = '手机验证码长度不能少于6个字符';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.checkVerifyCodeForm.verifyCode.$error.maxlength) {
				var tip = '手机验证码长度不能超过6个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		var verifyCode = $scope.verifyCode;

		$scope.$emit("BUSY");
		webservice.verifySMS($scope.mobile, verifyCode).then(function (res) {
			$scope.$emit('NOTBUSY');
			var status = res.status;
			var tip = res.message;
			if (globals.STATUS_OK === status) {
				checkMobileVerifyCodeService.set(true);
				$state.go('reset.third', {
					mobile: $scope.mobile
				});
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

  function sendSMSFunc () {
  	webservice.sendSMS($scope.mobile).then(function (res) {
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
  }

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
