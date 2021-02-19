require('usergroupListService');

var list = require('./list/list');
var add = require('./add/add');
var edit = require('./edit/edit');

angular.module('eduApp.main.auth.user', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/main/auth/user', '/main/auth/user/list');

  $stateProvider
    .state('main.auth.user.list', list)
    .state('main.auth.user.add', add)
    .state('main.auth.user.edit', edit);
}]);

module.exports = {
  url: '/user',
  template: __inline('./user.html')
};
