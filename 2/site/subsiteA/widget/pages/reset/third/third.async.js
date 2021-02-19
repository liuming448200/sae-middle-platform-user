return ['$scope', '$stateParams', '$state', 'webservice', 'dialogService', 'globals', 'checkMobileVerifyCodeService', 
	function ($scope, $stateParams, $state, webservice, dialogService, globals, checkMobileVerifyCodeService) {

	var verifyCodeChecked = checkMobileVerifyCodeService.get();
	if (!verifyCodeChecked) {
		$state.go('reset');
		return;
	}

	checkMobileVerifyCodeService.set(false);

	var mobile = $stateParams.mobile;

	$scope.resetPasswordSubmit = function () {
		if ($scope.resetPasswordForm.password.$invalid) {
			if ($scope.resetPasswordForm.password.$error.required) {
				var tip = '密码不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.resetPasswordForm.password.$error.minlength) {
				var tip = '密码长度不能少于6个字符';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.resetPasswordForm.password.$error.maxlength) {
				var tip = '密码长度不能超过16个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

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

	function goLogin () {
		$state.go('login');
	}

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
