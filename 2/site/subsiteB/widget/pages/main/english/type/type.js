var list = require('./list/list');
var add = require('./add/add');
var edit = require('./edit/edit');

angular.module('eduApp.main.english.type', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/main/english/type', '/main/english/type/list');

  $stateProvider
    .state('main.english.type.list', list)
    .state('main.english.type.add', add)
    .state('main.english.type.edit', edit);
}]);

module.exports = {
	url: '/type',
	template: __inline('./type.html')
};
