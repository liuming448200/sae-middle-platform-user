require('actionListService');
require('userListService');

var list = require('./list/list');
var add = require('./add/add');
var edit = require('./edit/edit');

angular.module('eduApp.main.auth.usergroup', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/main/auth/usergroup', '/main/auth/usergroup/list');

  $stateProvider
    .state('main.auth.usergroup.list', list)
    .state('main.auth.usergroup.add', add)
    .state('main.auth.usergroup.edit', edit);
}]);

module.exports = {
  url: '/usergroup',
  template: __inline('./usergroup.html')
};
