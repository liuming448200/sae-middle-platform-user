var list = require('./list/list');
var detail = require('./detail/detail');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/instmore/course?from', '/instmore/course/list?from');

  $stateProvider
    .state('instmore.course.list', list)
    .state('instmore.course.detail', detail);
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
