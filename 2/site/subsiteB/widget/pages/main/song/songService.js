angular.module('eduApp').factory('songService', function () {

	var song = {};

	var methods = {};

	methods.set = function (obj) {
		song = obj;
	};

	methods.get = function () {
		return song;
	};

	return methods;
});
