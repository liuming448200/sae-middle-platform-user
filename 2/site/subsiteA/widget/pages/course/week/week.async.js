return ['$rootScope', '$scope', '$uibModal', 'globals', 'dialogService', 
	function ($rootScope, $scope, $uibModal, globals, dialogService) {

	$rootScope.pageTitle = '按周查看课程表';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	$scope.date = new Date();
	var year = $scope.date.getFullYear();
	var month = $scope.date.getMonth();
	var date = $scope.date.getDate();
	var day = $scope.date.getDay();

	$scope.calendar = getCalendar(year, month, date, day);

	$scope.startDate = $scope.calendar[0].date;
	$scope.stopDate = $scope.calendar[6].date;

	getSchedule();

	getReserve();

	$scope.currentDay = getCurrent();

	$scope.preorder = function (course) {
		var uibModalInstance = $uibModal.open({
			templateUrl: 'preorder.html',
			controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

				$scope.title = '确定预约课程吗？';
				$scope.date = course.schedule_course_date;
				$scope.startTime = course.schedule_course_time_start;
				$scope.stopTime = course.schedule_course_time_stop;
				$scope.address = course.schedule_course_classroom;

				$scope.confirm = function () {
					$uibModalInstance.close();
					preorderSuccess(course);
				};

				$scope.cancel = function () {
					$uibModalInstance.dismiss('cancel');
				};
			}],
			size: 'md'
		});
	};

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

	$scope.prevWeek = function () {
		$scope.date = new Date(year, month, date - 7);
		year = $scope.date.getFullYear();
		month = $scope.date.getMonth();
		date = $scope.date.getDate();
		day = $scope.date.getDay();

		$scope.calendar = getCalendar(year, month, date, day);

		$scope.startDate = $scope.calendar[0].date;
		$scope.stopDate = $scope.calendar[6].date;

		getSchedule();

		getReserve();

		$scope.currentDay = getCurrent();
	};

	$scope.nextWeek = function () {
		$scope.date = new Date(year, month, date + 7);
		year = $scope.date.getFullYear();
		month = $scope.date.getMonth();
		date = $scope.date.getDate();
		day = $scope.date.getDay();

		$scope.calendar = getCalendar(year, month, date, day);

		$scope.startDate = $scope.calendar[0].date;
		$scope.stopDate = $scope.calendar[6].date;

		getSchedule();

		getReserve();

		$scope.currentDay = getCurrent();
	};

	$scope.getCurrent = function (single) {
		$scope.currentDay = getCurrent(single);
	};

	$scope.getToday = function () {
		$scope.date = new Date();
		year = $scope.date.getFullYear();
		month = $scope.date.getMonth();
		date = $scope.date.getDate();
		day = $scope.date.getDay();

		$scope.calendar = getCalendar(year, month, date, day);

		$scope.startDate = $scope.calendar[0].date;
		$scope.stopDate = $scope.calendar[6].date;

		getSchedule();

		getReserve();

		var today;
		for (var i = 0, len = $scope.calendar.length; i < len; i++) {
			var one = $scope.calendar[i];
			if (one.todayFlag) {
				today = one;
				break;
			}
		}

		$scope.currentDay = getCurrent(today);
	};

	function preorderSuccess (course) {
		course.reserve_course_status = 1;
		var tip = '预约成功';
		dialogService.dialog(tip);
	}

	function preorderFailure () {
		var tip = '预约失败，请稍后重试';
		dialogService.dialog(tip);
	}

	function cancelSuccess (course) {
		course.reserve_course_status = 3;
		var tip = '取消成功';
		dialogService.dialog(tip);
	}

	function cancelFailure () {
		var tip = '取消失败，请稍后重试';
		dialogService.dialog(tip);
	}

	function getCalendar (year, month, date, day) {
		var ret = [];

		day = 0 === day ? 7 : day;
		for (var i = 1; i < 8; i++) {
			var d = new Date(year, month, date - day + i);
			var oneDay = {
				date: d.getTime(),
				week: d.getDay(),
				day: d.getDate()
			};
			var today = new Date();
			var todayYear = today.getFullYear();
			var todayMonth = today.getMonth();
			var todayDate = today.getDate();
			if (todayDate === oneDay.day) {
				if (todayYear === d.getFullYear() && todayMonth === d.getMonth()) {
					oneDay.todayFlag = true;
					oneDay.sameDayFlag = false;
				} else {
					oneDay.todayFlag = false;
					oneDay.sameDayFlag = true;
				}
			} else {
				oneDay.todayFlag = false;
				oneDay.sameDayFlag = false;
			}
			if ((0 === oneDay.week) || (6 === oneDay.week)) {
				oneDay.weekEndFlag = true;
			} else {
				oneDay.weekEndFlag = false;
			}
			oneDay.scheduleCourses = [];
			oneDay.scheduleCourseFlag = false;
			oneDay.reserveCourseFlag = false;
			oneDay.currentFlag = false;
			ret.push(oneDay);
		}

		return ret;
	}

	function getSchedule () {
		var scheduleCourses = [{
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
		}, {
			schedule_course_id: 2,
			schedule_course_date: 1502380800000,
			schedule_course_time_start: '8:00',
			schedule_course_time_stop: '8:45',
			schedule_course_classroom: '小运动课教室',
			schedule_course_status: 2,
			course_id: 2,
			course_name: '运动课',
			course_age_start: 6,
			course_age_stop: 12,
			course_teacher: '王老师',
			course_assistant: '李老师'
		}, {
			schedule_course_id: 3,
			schedule_course_date: 1502380800000,
			schedule_course_time_start: '8:00',
			schedule_course_time_stop: '8:45',
			schedule_course_classroom: '小运动课教室',
			schedule_course_status: 1,
			course_id: 3,
			course_name: '运动课',
			course_age_start: 6,
			course_age_stop: 12,
			course_teacher: '王老师',
			course_assistant: '李老师'
		}, {
			schedule_course_id: 4,
			schedule_course_date: 1502380800000,
			schedule_course_time_start: '8:00',
			schedule_course_time_stop: '8:45',
			schedule_course_classroom: '小运动课教室',
			schedule_course_status: 1,
			course_id: 4,
			course_name: '运动课',
			course_age_start: 6,
			course_age_stop: 12,
			course_teacher: '王老师',
			course_assistant: '李老师'
		}, {
			schedule_course_id: 5,
			schedule_course_date: 1502380800000,
			schedule_course_time_start: '8:00',
			schedule_course_time_stop: '8:45',
			schedule_course_classroom: '小运动课教室',
			schedule_course_status: 1,
			course_id: 5,
			course_name: '运动课',
			course_age_start: 6,
			course_age_stop: 12,
			course_teacher: '王老师',
			course_assistant: '李老师'
		}, {
			schedule_course_id: 6,
			schedule_course_date: 1502380800000,
			schedule_course_time_start: '8:00',
			schedule_course_time_stop: '8:45',
			schedule_course_classroom: '小运动课教室',
			schedule_course_status: 1,
			course_id: 6,
			course_name: '运动课',
			course_age_start: 6,
			course_age_stop: 12,
			course_teacher: '王老师',
			course_assistant: '李老师'
		}, {
			schedule_course_id: 7,
			schedule_course_date: 1502380800000,
			schedule_course_time_start: '8:00',
			schedule_course_time_stop: '8:45',
			schedule_course_classroom: '小运动课教室',
			schedule_course_status: 1,
			course_id: 7,
			course_name: '运动课',
			course_age_start: 6,
			course_age_stop: 12,
			course_teacher: '王老师',
			course_assistant: '李老师'
		}, {
			schedule_course_id: 8,
			schedule_course_date: 1502380800000,
			schedule_course_time_start: '8:00',
			schedule_course_time_stop: '8:45',
			schedule_course_classroom: '小运动课教室',
			schedule_course_status: 1,
			course_id: 8,
			course_name: '运动课',
			course_age_start: 6,
			course_age_stop: 12,
			course_teacher: '王老师',
			course_assistant: '李老师'
		}, {
			schedule_course_id: 9,
			schedule_course_date: 1502380800000,
			schedule_course_time_start: '8:00',
			schedule_course_time_stop: '8:45',
			schedule_course_classroom: '小运动课教室',
			schedule_course_status: 1,
			course_id: 9,
			course_name: '运动课',
			course_age_start: 6,
			course_age_stop: 12,
			course_teacher: '王老师',
			course_assistant: '李老师'
		}];

		angular.forEach(scheduleCourses, function (course) {
			for (var i = 0, len = $scope.calendar.length; i < len; i++) {
				var oneDay = $scope.calendar[i];
				if (course.schedule_course_date === oneDay.date) {
					oneDay.scheduleCourses.push(course);
					oneDay.scheduleCourseFlag = true;
					break;
				}
			}
		});
	}

	function getReserve () {
		var reserveCourses = [{
			reserve_course_id: 1,
			reserve_course_date: 1502380800000,
			schedule_course_id: 1,
			reserve_course_status: 0, //0:没有记录 1:预约 2:试听 3:取消 4:上课 5:补课 6:旷课 7:请假
			reserve_course_left_num: 8
		}, {
			reserve_course_id: 2,
			reserve_course_date: 1502380800000,
			schedule_course_id: 2,
			reserve_course_status: 0,
			reserve_course_left_num: 8
		}, {
			reserve_course_id: 3,
			reserve_course_date: 1502380800000,
			schedule_course_id: 3,
			reserve_course_status: 1,
			reserve_course_left_num: 8
		}, {
			reserve_course_id: 4,
			reserve_course_date: 1502380800000,
			schedule_course_id: 4,
			reserve_course_status: 2,
			reserve_course_left_num: 8
		}, {
			reserve_course_id: 5,
			reserve_course_date: 1502380800000,
			schedule_course_id: 5,
			reserve_course_status: 3,
			reserve_course_left_num: 8
		}, {
			reserve_course_id: 6,
			reserve_course_date: 1502380800000,
			schedule_course_id: 6,
			reserve_course_status: 4,
			reserve_course_left_num: 8
		}, {
			reserve_course_id: 7,
			reserve_course_date: 1502380800000,
			schedule_course_id: 7,
			reserve_course_status: 5,
			reserve_course_left_num: 8
		}, {
			reserve_course_id: 8,
			reserve_course_date: 1502380800000,
			schedule_course_id: 8,
			reserve_course_status: 6,
			reserve_course_left_num: 8
		}, {
			reserve_course_id: 9,
			reserve_course_date: 1502380800000,
			schedule_course_id: 9,
			reserve_course_status: 7,
			reserve_course_left_num: 8
		}];

		angular.forEach(reserveCourses, function (course) {
			for (var i = 0, len = $scope.calendar.length; i < len; i++) {
				var oneDay = $scope.calendar[i];
				if (course.reserve_course_date === oneDay.date) {
					for (var j = 0, l = oneDay.scheduleCourses.length; j < l; j++) {
						var oneCourse = oneDay.scheduleCourses[j];
						if (course.schedule_course_id === oneCourse.schedule_course_id) {
							for (var key in course) {
								oneCourse[key] = course[key];
							}
							break;
						}
					}
					oneDay.reserveCourseFlag = true;
					break;
				}
			}
		});
	}

	function getCurrent (single) {
		var currentDay;

		if (!single) {
			for (var i = 0, len = $scope.calendar.length; i < len; i++) {
				var oneDay = $scope.calendar[i];
				if (oneDay.reserveCourseFlag) {
					currentDay = oneDay;
					break;
				} else if (oneDay.scheduleCourseFlag) {
					currentDay = oneDay;
					break;
				} else if (oneDay.todayFlag) {
					currentDay = oneDay;
					break;
				}
			}

			if (!currentDay) {
				currentDay = $scope.calendar[0];
			}
		} else {
			currentDay = single;
		}

		for (var i = 0, len = $scope.calendar.length; i < len; i++) {
			var oneDay = $scope.calendar[i];
			oneDay.currentFlag = false;
		}
		currentDay.currentFlag = true;

		return currentDay;
	}

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
