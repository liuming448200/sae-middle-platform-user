var course = require('./course/course');
var activity = require('./activity/activity');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/institution', '/institution/course');

  $stateProvider
    .state('institution.course', course)
    .state('institution.activity', activity);
}]);

module.exports = {
  url: '/institution',
  template: __inline('./institution.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('institution.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
