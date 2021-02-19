var success = require('./success/success');
var failure = require('./failure/failure');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('pay.success', success)
    .state('pay.failure', failure);
}]);

module.exports = {
	url: '/pay?from',
	template: __inline('./pay.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('pay.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
