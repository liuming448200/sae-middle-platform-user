return ['$rootScope', '$scope', '$uibModal', 'globals', 'dialogService', function ($rootScope, $scope, $uibModal, globals, dialogService) {

	$rootScope.pageTitle = '查看孩子的活动';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	getReserve();

	$scope.cancel = function (activity) {
		var uibModalInstance = $uibModal.open({
			templateUrl: 'preorder.html',
			controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

				$scope.title = '确定取消活动预约吗？';
				$scope.date = activity.activity_date;
				$scope.startTime = activity.activity_time_start;
				$scope.stopTime = activity.activity_time_stop;
				$scope.address = activity.activity_address;

				$scope.confirm = function () {
					$uibModalInstance.close();
					cancelSuccess(activity);
				};

				$scope.cancel = function () {
					$uibModalInstance.dismiss('cancel');
				};
			}],
			size: 'md'
		});
	};

	function cancelSuccess (activity) {
		activity.reserve_activity_status = 3;
		for (var i = 0, len = $scope.reserveActivities.length; i < len; i++) {
			var one = $scope.reserveActivities[i];
			if (activity.reserve_activity_id === one.reserve_activity_id) {
				$scope.reserveActivities.splice(i, 1);
				break;
			}
		}
		var tip = '取消成功';
		dialogService.dialog(tip);
	}

	function cancelFailure () {
		var tip = '取消失败，请稍后重试';
		dialogService.dialog(tip);
	}

	function getReserve () {
		$scope.reserveActivities = [{
			reserve_activity_id: 1,
			reserve_activity_status: 1, //0:没有记录 1:预约 3:取消 4:参加 5:未参加
			activity_id: 1,
			activity_name: '风度小骑士',
			activity_date: 1502380800000,
			activity_time_start: '14:00',
			activity_time_stop: '17:00',
			activity_address: '北京市顺义区意大利农场',
			activity_status: 1 //0:未知或全部 1:有效 2:无效
		}];
	}

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
