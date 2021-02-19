var week = require('./week/week');
var month = require('./month/month');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/course', '/course/week');

  $stateProvider
    .state('course.week', week)
    .state('course.month', month);
}]);

module.exports = {
  url: '/course',
  template: __inline('./course.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('course.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
