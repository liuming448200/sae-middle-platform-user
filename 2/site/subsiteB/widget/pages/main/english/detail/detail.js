require('wordTypeService');
require('wordDetailService');

var list = require('./list/list');
var add = require('./add/add');
var edit = require('./edit/edit');
var preview = require('./preview/preview');

angular.module('eduApp.main.english.detail', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/main/english/detail', '/main/english/detail/list');

  $stateProvider
    .state('main.english.detail.list', list)
    .state('main.english.detail.add', add)
    .state('main.english.detail.edit', edit)
    .state('main.english.detail.preview', preview);
}]);

module.exports = {
	url: '/detail',
	template: __inline('./detail.html')
};
