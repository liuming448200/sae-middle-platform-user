angular.module('eduApp').factory('userInterceptor', ['$rootScope', 'globals', function ($rootScope, globals) {
	var userInterceptor = {};

	userInterceptor.response = function (res) {
		var status = res.data.status;
		if (globals.UNLOGIN === status) {
			$rootScope.user = undefined;
			$rootScope.$emit('userIntercepted');
		}

		return res;
	};

	return userInterceptor;
}]);
