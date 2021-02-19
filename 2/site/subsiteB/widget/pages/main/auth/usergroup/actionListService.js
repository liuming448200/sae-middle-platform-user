angular.module('eduApp').factory('actionListService', function () {

	var actions = [];

	var methods = {};

	methods.set = function (obj) {
		actions = obj;
	};

	methods.get = function () {
		return actions;
	};

	return methods;
});
