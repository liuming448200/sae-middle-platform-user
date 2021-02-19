return ['$rootScope', '$scope', '$state', 'globals', 'UAdetect', 'dialogService', 
	function ($rootScope, $scope, $state, globals, UAdetect, dialogService) {

	$rootScope.pageTitle = '课程订单详情';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	var from = 'instmore.product';

	if ($rootScope.weixinFlag) {
		$scope.selectWeixin = true;
		$scope.selectAlipay = false;
		$scope.upHasWeixin = true;
		$scope.upHasAlipay = false;
		$scope.downHasWeixin = false;
		$scope.downHasAlipay = true;
	} else {
		$scope.selectWeixin = false;
		$scope.selectAlipay = true;
		$scope.upHasWeixin = false;
		$scope.upHasAlipay = true;
		$scope.downHasWeixin = true;
		$scope.downHasAlipay = false;
	}

	var isPC = UAdetect.isPC();
	if (isPC) {
		$scope.showMore = true;
	} else {
		$scope.showMore = false;
	}

	$scope.goPay = function () {
		if ($scope.selectWeixin) {
			if ($rootScope.weixinFlag) {
				$state.go('pay.success', {from:from});
				//微信内支付
			} else {
				$state.go('pay.success', {from:from});
				//微信扫码支付
			}
		} else if ($scope.selectAlipay) {
			if (isPC) {
				$state.go('pay.success', {from:from});
				//支付宝电脑网站支付
			} else {
				$state.go('pay.success', {from:from});
				//支付宝手机网站支付
			}
		} else {
			var tip = '暂不支持其他支付方式';
			$scope.$emit('TOAST', {msg: tip});
		}
	};

	$scope.weixinPay = function () {
		$scope.selectWeixin = true;
		$scope.selectAlipay = false;
	};

	$scope.Alipay = function () {
		$scope.selectWeixin = false;
		$scope.selectAlipay = true;
	};

	$scope.cancel = function () {
		var tip = '确定取消订单吗？';
		dialogService.dialog(tip, goList);
	};

	function goList () {
		$state.go('myorder.course.list');
	}

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
