var list = require('./list/list');
var add = require('./add/add');
var edit = require('./edit/edit');

angular.module('eduApp.main.base.content', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/main/base/content', '/main/base/content/list');

  $stateProvider
    .state('main.base.content.list', list)
    .state('main.base.content.add', add)
    .state('main.base.content.edit', edit);
}]);

module.exports = {
  url: '/content',
  template: __inline('./content.html')
};
