return ['$scope', '$stateParams', '$state', 'webservice', 'dialogService', 'globals', 'checkMobileVerifyCodeService', 
	function ($scope, $stateParams, $state, webservice, dialogService, globals, checkMobileVerifyCodeService) {

	var verifyCodeChecked = checkMobileVerifyCodeService.get();
	if (!verifyCodeChecked) {
		$state.go('register');
		return;
	}

	checkMobileVerifyCodeService.set(false);

	var mobile = $stateParams.mobile;

	$scope.registerSubmit = function () {
		if ($scope.registerForm.username.$invalid) {
			if ($scope.registerForm.username.$error.required) {
				var tip = '用户名不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.registerForm.username.$error.minlength) {
				var tip = '用户名长度不能少于6个字符';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.registerForm.username.$error.maxlength) {
				var tip = '用户名长度不能超过16个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		if ($scope.registerForm.password.$invalid) {
			if ($scope.registerForm.password.$error.required) {
				var tip = '密码不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.registerForm.password.$error.minlength) {
				var tip = '密码长度不能少于6个字符';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.registerForm.password.$error.maxlength) {
				var tip = '密码长度不能超过16个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		var username = $scope.username;
		var password = $scope.password;

		$scope.$emit("BUSY");
		webservice.register(mobile, username, password).then(function (res) {
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
