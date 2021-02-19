angular.module('eduApp').factory('storyService', function () {

	var story = {};

	var methods = {};

	methods.set = function (obj) {
		story = obj;
	};

	methods.get = function () {
		return story;
	};

	return methods;
});
