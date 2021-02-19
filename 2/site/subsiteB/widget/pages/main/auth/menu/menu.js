require('contentTypeService');

var list = require('./list/list');
var add = require('./add/add');
var edit = require('./edit/edit');

angular.module('eduApp.main.auth.menu', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/main/auth/menu', '/main/auth/menu/list');

  $stateProvider
    .state('main.auth.menu.list', list)
    .state('main.auth.menu.add', add)
    .state('main.auth.menu.edit', edit);
}]);

module.exports = {
  url: '/menu',
  template: __inline('./menu.html')
};
