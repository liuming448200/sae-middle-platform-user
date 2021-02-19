require('courseService');

var list = require('./list/list');
var add = require('./add/add');
var edit = require('./edit/edit');
var preview = require('./preview/preview');

angular.module('eduApp.main.course', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.when('/main/course', '/main/course/list');
	
  $stateProvider
    .state('main.course.list', list)
    .state('main.course.add', add)
    .state('main.course.edit', edit)
    .state('main.course.preview', preview);
}]);

module.exports = {
  url: '/course',
  template: __inline('./course.html')
};
