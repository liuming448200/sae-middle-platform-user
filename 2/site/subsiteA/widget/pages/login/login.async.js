return ['$rootScope', '$scope', '$stateParams', '$state', 'webservice', 'globals', 
	function ($rootScope, $scope, $stateParams, $state, webservice, globals) {

	$rootScope.pageTitle = '用户登录';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	var from = $stateParams.from;

	if ($rootScope.user) {
		$state.go(from && "login" !== from ? from : 'main');
		return;
	}

	$scope.loginSubmit = function () {
		if ($scope.loginForm.username.$invalid) {
			if ($scope.loginForm.username.$error.required) {
				var tip = '用户名不能为空';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		if ($scope.loginForm.password.$invalid) {
			if ($scope.loginForm.password.$error.required) {
				var tip = '登录密码不能为空';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.loginForm.password.$error.minlength) {
				var tip = '登录密码长度不能少于6个字符';
				$scope.$emit('TOAST', {msg: tip});
			} else if ($scope.loginForm.password.$error.maxlength) {
				var tip = '登录密码长度不能超过16个字符';
				$scope.$emit('TOAST', {msg: tip});
			}

			return;
		}

		var loginData = {
			username: $scope.username,
			password: $scope.password
		};

		$scope.$emit("BUSY");
		webservice.login(loginData).then(function (res) {
			$scope.$emit('NOTBUSY');
			var status = res.status;
			var tip = res.message;
			if (globals.STATUS_OK === status) {
				$rootScope.user = res.data;
				if (!$rootScope.user.extra) {
          $rootScope.user.extra = {};
        }
        if (!$rootScope.user.child) {
          $rootScope.user.child = {};
        }
				$state.go(from && "login" !== from ? from : 'main');
			} else {
				$scope.$emit('TOAST', {msg: tip});
			}
		}, function (res) {
			$scope.$emit('NOTBUSY');
			$scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
			var res = res;
		});
	};

	$scope.back = function () {
		if ($rootScope.user) {
			$state.go(from && "login" !== from ? from : 'main');
		} else {
			$state.go('main.user');
		}
	};

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
