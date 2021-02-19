var overview = require('./overview/overview');
var review = require('./review/review');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.when('/mycourse', '/mycourse/overview');

  $stateProvider
    .state('mycourse.overview', overview)
    .state('mycourse.review', review);
}]);

module.exports = {
  url: '/mycourse',
  template: __inline('./mycourse.html')
};
