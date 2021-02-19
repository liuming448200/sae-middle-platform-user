angular.module('eduApp').factory('activityService', function () {

	var activity = {};

	var methods = {};

	methods.set = function (obj) {
		activity = obj;
	};

	methods.get = function () {
		return activity;
	};

	return methods;
});
