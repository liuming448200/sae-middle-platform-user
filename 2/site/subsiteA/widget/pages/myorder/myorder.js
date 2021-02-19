var course = require('./course/course');
var activity = require('./activity/activity');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/myorder', '/myorder/activity');

  $stateProvider
    .state('myorder.course', course)
    .state('myorder.activity', activity);
}]);

module.exports = {
	url: '/myorder',
	template: __inline('./myorder.html')
};
