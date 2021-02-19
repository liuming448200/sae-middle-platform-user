angular.module('eduApp').factory('userListService', function () {

	var users = [];

	var methods = {};

	methods.set = function (obj) {
		users = obj;
	};

	methods.get = function () {
		return users;
	};

	return methods;
});
