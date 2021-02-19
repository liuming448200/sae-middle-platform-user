var list = require('./list/list');
var detail = require('./detail/detail');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/instmore/news?from', '/instmore/news/list?from');

  $stateProvider
    .state('instmore.news.list', list)
    .state('instmore.news.detail', detail);
}]);

module.exports = {
  url: '/news',
  template: __inline('./news.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('news.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
