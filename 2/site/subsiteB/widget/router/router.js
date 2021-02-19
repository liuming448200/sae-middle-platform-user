var login = require('../pages/login/login');
var reset = require('../pages/reset/reset');
var main = require('../pages/main/main');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	// For unmatched routes
  $urlRouterProvider.otherwise('/');

  // Application routes
  $stateProvider
    .state('login', login)
    .state('reset', reset)
    .state('main', main);
}]);
