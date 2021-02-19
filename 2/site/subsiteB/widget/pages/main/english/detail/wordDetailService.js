angular.module('eduApp').factory('wordDetailService', function () {

	var word = {};

	var methods = {};

	methods.set = function (obj) {
		word = obj;
	};

	methods.get = function () {
		return word;
	};

	return methods;
});
