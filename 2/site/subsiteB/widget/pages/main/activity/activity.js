require('activityService');

var list = require('./list/list');
var add = require('./add/add');
var edit = require('./edit/edit');
var preview = require('./preview/preview');

angular.module('eduApp.main.activity', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/main/activity', '/main/activity/list');

  $stateProvider
    .state('main.activity.list', list)
    .state('main.activity.add', add)
    .state('main.activity.edit', edit)
    .state('main.activity.preview', preview);
}]);

module.exports = {
	url: '/activity',
	template: __inline('./activity.html')
};
