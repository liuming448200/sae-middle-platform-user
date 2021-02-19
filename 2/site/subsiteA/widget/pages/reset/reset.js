var first = require('./first/first');
var second = require('./second/second');
var third = require('./third/third');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/reset', '/reset/first');

  $stateProvider
    .state('reset.first', first)
    .state('reset.second', second)
    .state('reset.third', third);
}]);

module.exports = {
  url: '/reset',
  template: __inline('./reset.html'),
  controller: ['$rootScope', 'globals', function ($rootScope, globals) {
  	$rootScope.pageTitle = '重置密码';
    $rootScope.pageImage = globals.LOGO_IMAGE;
  }]
};
