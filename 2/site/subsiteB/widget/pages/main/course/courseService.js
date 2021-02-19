angular.module('eduApp').factory('courseService', function () {

	var course = {};

	var methods = {};

	methods.set = function (obj) {
		course = obj;
	};

	methods.get = function () {
		return course;
	};

	return methods;
});
