require('menuListService');

var list = require('./list/list');
var add = require('./add/add');
var edit = require('./edit/edit');

angular.module('eduApp.main.auth.action', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/main/auth/action', '/main/auth/action/list');

  $stateProvider
    .state('main.auth.action.list', list)
    .state('main.auth.action.add', add)
    .state('main.auth.action.edit', edit);
}]);

module.exports = {
  url: '/action',
  template: __inline('./action.html')
};
