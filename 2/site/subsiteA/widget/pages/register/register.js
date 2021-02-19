var first = require('./first/first');
var second = require('./second/second');
var third = require('./third/third');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/register', '/register/first');

  $stateProvider
    .state('register.first', first)
    .state('register.second', second)
    .state('register.third', third);
}]);

module.exports = {
  url: '/register',
  template: __inline('./register.html'),
  controller: ['$rootScope', 'globals', function ($rootScope, globals) {
  	$rootScope.pageTitle = '用户注册';
    $rootScope.pageImage = globals.LOGO_IMAGE;
  }]
};
