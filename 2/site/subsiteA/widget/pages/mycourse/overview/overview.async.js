return ['$rootScope', '$scope', '$uibModal', 'globals', 'dialogService', function ($rootScope, $scope, $uibModal, globals, dialogService) {

	$rootScope.pageTitle = '查看孩子的课程';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	getReserve();

	$scope.cancel = function (course) {
		var uibModalInstance = $uibModal.open({
			templateUrl: 'preorder.html',
			controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

				$scope.title = '确定取消课程预约吗？';
				$scope.date = course.schedule_course_date;
				$scope.startTime = course.schedule_course_time_start;
				$scope.stopTime = course.schedule_course_time_stop;
				$scope.address = course.schedule_course_classroom;

				$scope.confirm = function () {
					$uibModalInstance.close();
					cancelSuccess(course);
				};

				$scope.cancel = function () {
					$uibModalInstance.dismiss('cancel');
				};
			}],
			size: 'md'
		});
	};

	function cancelSuccess (course) {
		course.reserve_course_status = 3;
		for (var i = 0, len = $scope.reserveCourses.length; i < len; i++) {
			var one = $scope.reserveCourses[i];
			if (course.reserve_course_id === one.reserve_course_id) {
				$scope.reserveCourses.splice(i, 1);
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
		$scope.reserveCourses = [{
			reserve_course_id: 1,
			reserve_course_date: 1502380800000,
			reserve_course_status: 1, //0:没有记录 1:预约 2:试听 3:取消 4:上课 5:补课 6:旷课 7:请假
			schedule_course_id: 1,
			schedule_course_date: 1502380800000,
			schedule_course_time_start: '8:00',
			schedule_course_time_stop: '8:45',
			schedule_course_classroom: '小运动课教室',
			schedule_course_status: 1, //0:未知或全部 1:有效 2:无效
			course_id: 1,
			course_name: '运动课',
			course_age_start: 6,
			course_age_stop: 12,
			course_teacher: '王老师',
			course_assistant: '李老师'
		}];
	}

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
