var overview = require('./overview/overview');
var review = require('./review/review');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.when('/myactivity', '/myactivity/overview');

  $stateProvider
    .state('myactivity.overview', overview)
    .state('myactivity.review', review);
}]);

module.exports = {
  url: '/myactivity',
  template: __inline('./myactivity.html')
};
