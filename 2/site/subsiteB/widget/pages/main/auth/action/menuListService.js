angular.module('eduApp').factory('menuListService', function () {

	var menus = [];

	var methods = {};

	methods.set = function (obj) {
		menus = obj;
	};

	methods.get = function () {
		return menus;
	};

	return methods;
});
