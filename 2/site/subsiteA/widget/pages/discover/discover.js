var list = require('./list/list');
var detail = require('./detail/detail');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/discover?from', '/discover/list?from');

  $stateProvider
    .state('discover.list', list)
    .state('discover.detail', detail);
}]);

module.exports = {
  url: '/discover?from',
  template: __inline('./discover.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('discover.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
