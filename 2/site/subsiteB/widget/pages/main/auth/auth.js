var user = require('./user/user');
var usergroup = require('./usergroup/usergroup');
var action = require('./action/action');
var menu = require('./menu/menu');

angular.module('eduApp.main.auth', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('main.auth.user', user)
    .state('main.auth.usergroup', usergroup)
    .state('main.auth.action', action)
    .state('main.auth.menu', menu);
}]);

module.exports = {
  url: '/auth',
  template: __inline('./auth.html')
};
