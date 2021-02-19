var dashboard = require('./dashboard/dashboard');
var story = require('./story/story');
var english = require('./english/english');
var song = require('./song/song');
var auth = require('./auth/auth');
var base = require('./base/base');
var course = require('./course/course');
var activity = require('./activity/activity');

angular.module('eduApp.main', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/main', '/main/');

  $stateProvider
    .state('main.index', dashboard)
    .state('main.story', story)
    .state('main.english', english)
    .state('main.song', song)
    .state('main.auth', auth)
    .state('main.base', base)
    .state('main.course', course)
    .state('main.activity', activity);
}]);

module.exports = {
	url: '/main',
	template: __inline('./main.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
    require.async('main.async.js', function(ctrl) {
      $injector.invoke(ctrl, this, {'$scope': $scope});
    });
  }]
};
