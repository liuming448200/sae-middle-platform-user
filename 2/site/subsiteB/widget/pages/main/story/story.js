require('storyService');

var list = require('./list/list');
var add = require('./add/add');
var edit = require('./edit/edit');
var preview = require('./preview/preview');

angular.module('eduApp.main.story', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/main/story', '/main/story/list');

  $stateProvider
    .state('main.story.list', list)
    .state('main.story.add', add)
    .state('main.story.edit', edit)
    .state('main.story.preview', preview);
}]);

module.exports = {
	url: '/story',
	template: __inline('./story.html')
};
